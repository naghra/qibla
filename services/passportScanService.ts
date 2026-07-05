export interface PassportScanData {
  firstName: string;
  lastName: string;
  passportNumber: string;
  nationality: string;
  passportCountry: string;
  dateOfBirth: string;
  passportIssueDate: string;
  passportExpiryDate: string;
  gender: 'male' | 'female' | 'other';
  confidence: 'high' | 'medium' | 'low';
}

export interface PassportScanResponse {
  data: PassportScanData;
  missing: string[];
}

export class PassportScanError extends Error {
  code: string;
  status: number;
  missing?: string[];
  partial?: PassportScanData;

  constructor(message: string, status: number, code: string, extra?: { missing?: string[]; partial?: PassportScanData }) {
    super(message);
    this.name = 'PassportScanError';
    this.status = status;
    this.code = code;
    this.missing = extra?.missing;
    this.partial = extra?.partial;
  }
}

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

function fileToBase64(file: File): Promise<{ base64: string; mimeType: string }> {
  return new Promise((resolve, reject) => {
    if (!ALLOWED_TYPES.has(file.type)) {
      reject(new PassportScanError('Invalid image type', 400, 'invalid_image_type'));
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      reject(new PassportScanError('Image too large', 400, 'image_too_large'));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result ?? '');
      const base64 = result.replace(/^data:[^;]+;base64,/, '');
      resolve({ base64, mimeType: file.type });
    };
    reader.onerror = () => reject(new PassportScanError('Read failed', 400, 'read_failed'));
    reader.readAsDataURL(file);
  });
}

export async function scanPassportImage(file: File): Promise<PassportScanResponse> {
  const { base64, mimeType } = await fileToBase64(file);

  const res = await fetch('/api/passport/scan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image: base64, mimeType }),
  });

  const payload = (await res.json().catch(() => ({}))) as {
    error?: string;
    data?: PassportScanData;
    missing?: string[];
  };

  if (!res.ok) {
    throw new PassportScanError(
      payload.error || 'Scan failed',
      res.status,
      payload.error || 'scan_failed',
      { missing: payload.missing, partial: payload.data }
    );
  }

  return { data: payload.data!, missing: payload.missing ?? [] };
}
