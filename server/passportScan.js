import { mergePassportData, normalizeCountryCode, normalizeName, normalizePassportNumber, parseTd3Mrz } from './passportMrz.js';

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/jpg']);

const PASSPORT_SCHEMA = {
  name: 'passport_extraction',
  strict: true,
  schema: {
    type: 'object',
    additionalProperties: false,
    properties: {
      mrzLine1: { type: 'string', description: 'First MRZ line exactly 44 chars (P<...) or empty' },
      mrzLine2: { type: 'string', description: 'Second MRZ line exactly 44 chars or empty' },
      firstName: { type: 'string', description: 'Given name(s) in Latin as on passport' },
      lastName: { type: 'string', description: 'Surname in Latin' },
      passportNumber: { type: 'string', description: 'Passport document number' },
      nationality: { type: 'string', description: 'ISO 3166-1 alpha-2 or alpha-3 nationality code' },
      passportCountry: { type: 'string', description: 'ISO issuing country code' },
      dateOfBirth: { type: 'string', description: 'YYYY-MM-DD' },
      passportIssueDate: { type: 'string', description: 'YYYY-MM-DD or empty string' },
      passportExpiryDate: { type: 'string', description: 'YYYY-MM-DD' },
      gender: { type: 'string', enum: ['male', 'female', 'other'] },
      confidence: { type: 'string', enum: ['high', 'medium', 'low'] },
    },
    required: [
      'mrzLine1',
      'mrzLine2',
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

const SYSTEM_PROMPT = `You extract passport biodata for official travel forms. Accuracy is critical.

STEP 1 — MRZ (highest priority):
- Locate the TWO machine-readable lines at the bottom (monospace, 44 characters each).
- Copy them EXACTLY into mrzLine1 and mrzLine2: uppercase A-Z, digits, and < fillers only.
- Do NOT guess MRZ characters. If a character is unclear, use <.
- TD3 line 1 format: P<COUNTRY<SURNAME<<GIVEN<NAMES...
- TD3 line 2 format: PASSNO<CHECK<NATIONALITY<DOB<CHECK<SEX<EXPIRY<CHECK...

STEP 2 — Visual zone (supports MRZ):
- Cross-check name, dates, passport number, nationality from the printed fields.
- Names: Latin characters as printed. firstName = given names, lastName = surname.
- nationality & passportCountry: ISO 3166-1 alpha-2 (EG, SA, US, GB, FR, DE, NL…).
- Dates: convert to YYYY-MM-DD.
- Gender: M/male → male, F/female → female.
- passportIssueDate: from issue field if visible, else empty string "".
- passportNumber: no spaces.

Set confidence:
- high: MRZ lines are clear AND match visual zone
- medium: MRZ partial or minor visual mismatch
- low: mostly guessing`;

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

function normalizeGender(value) {
  const v = String(value ?? '').trim().toLowerCase();
  if (v === 'male' || v === 'm') return 'male';
  if (v === 'female' || v === 'f') return 'female';
  return 'other';
}

function normalizeDate(value) {
  if (!value || typeof value !== 'string') return '';
  const trimmed = value.trim();
  if (!trimmed) return '';
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

function mapVisionFields(raw) {
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

function extractPassportData(raw) {
  const vision = mapVisionFields(raw);
  const mrz = parseTd3Mrz(raw.mrzLine1, raw.mrzLine2);
  const merged = mergePassportData(vision, mrz);
  if (!merged.passportCountry && merged.nationality) {
    merged.passportCountry = merged.nationality;
  }
  return merged;
}

function hasUsefulData(data) {
  return Boolean(
    data.firstName ||
      data.lastName ||
      data.passportNumber ||
      data.dateOfBirth ||
      data.passportExpiryDate ||
      data.nationality
  );
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

function needsRetry(data) {
  const missing = validateResult(data);
  return missing.length >= 3;
}

async function callOpenAiVision(base64, mimeType, { retry = false } = {}) {
  const { getOpenAiCredentials } = await import('./settings.js');
  const { apiKey, visionModel } = await getOpenAiCredentials();
  if (!apiKey) {
    const err = new Error('openai_not_configured');
    err.code = 'openai_not_configured';
    throw err;
  }

  // gpt-4o is significantly better for document OCR; upgrade mini automatically
  let model = visionModel || 'gpt-4o';
  if (model.includes('mini')) model = 'gpt-4o';

  const userText = retry
    ? 'Retry: focus ONLY on the MRZ lines at the bottom. Transcribe mrzLine1 and mrzLine2 exactly (44 chars each). Then fill all other fields from MRZ + visual zone.'
    : 'Extract passport biodata. Transcribe both MRZ lines exactly first, then fill all fields.';

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      temperature: 0,
      max_tokens: 1200,
      response_format: {
        type: 'json_schema',
        json_schema: PASSPORT_SCHEMA,
      },
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: [
            { type: 'text', text: userText },
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
    signal: AbortSignal.timeout(90000),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    console.error('OpenAI vision error:', res.status, errText.slice(0, 400));
    const err = new Error('openai_request_failed');
    err.code = 'openai_request_failed';
    err.status = res.status;
    throw err;
  }

  const payload = await res.json();
  const content = payload.choices?.[0]?.message?.content;
  if (!content) throw new Error('openai_empty_response');
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

    let raw = await callOpenAiVision(base64, mimeType);
    let data = extractPassportData(raw);

    if (needsRetry(data)) {
      try {
        raw = await callOpenAiVision(base64, mimeType, { retry: true });
        data = extractPassportData(raw);
      } catch (retryErr) {
        console.warn('Passport scan retry failed:', retryErr.message);
      }
    }

    const missing = validateResult(data);

    if (!hasUsefulData(data)) {
      sendJson(res, 422, { error: 'extraction_incomplete', missing, data });
      return true;
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
