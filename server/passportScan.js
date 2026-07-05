const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/jpg']);

const PASSPORT_SCHEMA = {
  name: 'passport_extraction',
  strict: true,
  schema: {
    type: 'object',
    additionalProperties: false,
    properties: {
      firstName: { type: 'string', description: 'Given name(s) as printed on passport' },
      lastName: { type: 'string', description: 'Surname / family name' },
      passportNumber: { type: 'string', description: 'Passport document number' },
      nationality: { type: 'string', description: 'ISO 3166-1 alpha-2 nationality code' },
      passportCountry: { type: 'string', description: 'ISO 3166-1 alpha-2 issuing country code' },
      dateOfBirth: { type: 'string', description: 'YYYY-MM-DD' },
      passportIssueDate: { type: 'string', description: 'YYYY-MM-DD or empty if unknown' },
      passportExpiryDate: { type: 'string', description: 'YYYY-MM-DD' },
      gender: { type: 'string', enum: ['male', 'female', 'other'] },
      confidence: { type: 'string', enum: ['high', 'medium', 'low'] },
    },
    required: [
      'firstName',
      'lastName',
      'passportNumber',
      'nationality',
      'passportCountry',
      'dateOfBirth',
      'passportIssueDate',
      'passportExpiryDate',
      'gender',
      'confidence',
    ],
  },
};

const SYSTEM_PROMPT = `You are an expert passport data extraction system used for travel document applications.
Extract fields exactly as printed on the passport biodata page (the page with the photo).
Rules:
- Read the visual zone AND the MRZ machine-readable zone at the bottom; prefer MRZ when legible.
- Return ISO 3166-1 alpha-2 codes for nationality and passportCountry (e.g. EG, US, GB, FR, SA).
- Names: use Latin characters as printed; split given names into firstName and surname into lastName.
- Dates: convert to YYYY-MM-DD regardless of how they appear on the passport.
- Gender: map M/male/masculin → male, F/female/féminin → female; otherwise other.
- passportIssueDate: use issue date if visible; if only expiry is clear, leave passportIssueDate as empty string.
- passportNumber: no spaces; preserve letters and digits exactly.
- If a field is unreadable, use your best reading and set confidence to medium or low.
- Never invent data not supported by the image.`;

function readJsonBody(req, maxBytes = MAX_IMAGE_BYTES + 512_000) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on('data', (c) => {
      size += c.length;
      if (size > maxBytes) {
        reject(new Error('payload_too_large'));
        req.destroy();
        return;
      }
      chunks.push(c);
    });
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8');
        resolve(raw ? JSON.parse(raw) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data));
}

function normalizeCountryCode(value) {
  if (!value || typeof value !== 'string') return '';
  const code = value.trim().toUpperCase();
  if (/^[A-Z]{2}$/.test(code)) return code;
  return '';
}

function normalizeGender(value) {
  const v = String(value ?? '').trim().toLowerCase();
  if (v === 'male' || v === 'm') return 'male';
  if (v === 'female' || v === 'f') return 'female';
  return 'other';
}

function normalizeDate(value) {
  if (!value || typeof value !== 'string') return '';
  const trimmed = value.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;

  const dmy = trimmed.match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/);
  if (dmy) {
    const [, d, m, y] = dmy;
    return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
  }

  const ymd = trimmed.match(/^(\d{4})[/.-](\d{1,2})[/.-](\d{1,2})$/);
  if (ymd) {
    const [, y, m, d] = ymd;
    return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
  }

  return '';
}

function normalizePassportNumber(value) {
  return String(value ?? '').replace(/\s+/g, '').toUpperCase();
}

function normalizeName(value) {
  return String(value ?? '')
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[^\p{L}\p{M}\s'-]/gu, '');
}

function mapExtracted(raw) {
  return {
    firstName: normalizeName(raw.firstName),
    lastName: normalizeName(raw.lastName),
    passportNumber: normalizePassportNumber(raw.passportNumber),
    nationality: normalizeCountryCode(raw.nationality),
    passportCountry: normalizeCountryCode(raw.passportCountry),
    dateOfBirth: normalizeDate(raw.dateOfBirth),
    passportIssueDate: normalizeDate(raw.passportIssueDate),
    passportExpiryDate: normalizeDate(raw.passportExpiryDate),
    gender: normalizeGender(raw.gender),
    confidence: raw.confidence === 'high' || raw.confidence === 'medium' ? raw.confidence : 'low',
  };
}

function validateResult(data) {
  const missing = [];
  if (!data.firstName) missing.push('firstName');
  if (!data.lastName) missing.push('lastName');
  if (!data.passportNumber) missing.push('passportNumber');
  if (!data.dateOfBirth) missing.push('dateOfBirth');
  if (!data.passportExpiryDate) missing.push('passportExpiryDate');
  if (!data.nationality) missing.push('nationality');
  return missing;
}

async function callOpenAiVision(base64, mimeType) {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    const err = new Error('openai_not_configured');
    err.code = 'openai_not_configured';
    throw err;
  }

  const model = process.env.OPENAI_VISION_MODEL?.trim() || 'gpt-4o';

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      temperature: 0,
      max_tokens: 800,
      response_format: {
        type: 'json_schema',
        json_schema: PASSPORT_SCHEMA,
      },
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Extract all passport biodata fields from this image for a travel application form.',
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:${mimeType};base64,${base64}`,
                detail: 'high',
              },
            },
          ],
        },
      ],
    }),
    signal: AbortSignal.timeout(60000),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    console.error('OpenAI vision error:', res.status, errText.slice(0, 300));
    const err = new Error('openai_request_failed');
    err.code = 'openai_request_failed';
    err.status = res.status;
    throw err;
  }

  const payload = await res.json();
  const content = payload.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error('openai_empty_response');
  }

  return JSON.parse(content);
}

export async function handlePassportScanApi(req, res, urlPath) {
  if (urlPath !== '/api/passport/scan' || req.method !== 'POST') return false;

  try {
    const body = await readJsonBody(req);
    const mimeType = String(body.mimeType ?? 'image/jpeg').toLowerCase();
    const base64 = String(body.image ?? '').replace(/^data:[^;]+;base64,/, '');

    if (!base64) {
      sendJson(res, 400, { error: 'missing_image' });
      return true;
    }

    if (!ALLOWED_MIME.has(mimeType)) {
      sendJson(res, 400, { error: 'invalid_image_type' });
      return true;
    }

    const bytes = Buffer.byteLength(base64, 'base64');
    if (bytes > MAX_IMAGE_BYTES) {
      sendJson(res, 400, { error: 'image_too_large' });
      return true;
    }

    const raw = await callOpenAiVision(base64, mimeType);
    const data = mapExtracted(raw);
    const missing = validateResult(data);

    if (missing.length > 0 && data.confidence === 'low') {
      sendJson(res, 422, { error: 'extraction_incomplete', missing, data });
      return true;
    }

    if (!data.passportCountry && data.nationality) {
      data.passportCountry = data.nationality;
    }

    sendJson(res, 200, { data, missing });
    return true;
  } catch (err) {
    if (err.message === 'payload_too_large') {
      sendJson(res, 413, { error: 'payload_too_large' });
      return true;
    }
    if (err.code === 'openai_not_configured') {
      sendJson(res, 503, { error: 'openai_not_configured' });
      return true;
    }
    if (err.code === 'openai_request_failed') {
      sendJson(res, 502, { error: 'openai_request_failed' });
      return true;
    }
    console.error('Passport scan error:', err);
    sendJson(res, 500, { error: 'scan_failed' });
    return true;
  }
}
