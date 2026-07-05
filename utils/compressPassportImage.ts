const MAX_DIMENSION = 2000;
const JPEG_QUALITY = 0.88;

function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('image_load_failed'));
    };
    img.src = url;
  });
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality?: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('blob_failed'))),
      type,
      quality
    );
  });
}

/** Resize/compress passport photos before upload to stay under nginx/API limits. */
export async function compressPassportImage(file: File): Promise<File> {
  if (file.type === 'image/gif' || file.type === 'application/pdf') {
    throw new Error('unsupported_format');
  }

  // Skip tiny files already under ~400 KB
  if (file.size < 400_000 && /^image\/(jpeg|jpg|png|webp)$/i.test(file.type)) {
    return file;
  }

  try {
    const img = await loadImageFromFile(file);
    const scale = Math.min(1, MAX_DIMENSION / Math.max(img.width, img.height));
    const width = Math.max(1, Math.round(img.width * scale));
    const height = Math.max(1, Math.round(img.height * scale));

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return file;

    ctx.drawImage(img, 0, 0, width, height);
    const blob = await canvasToBlob(canvas, 'image/jpeg', JPEG_QUALITY);
    return new File([blob], file.name.replace(/\.\w+$/, '') + '.jpg', { type: 'image/jpeg' });
  } catch {
    return file;
  }
}

function detectMimeType(file: File): string {
  if (file.type && file.type.startsWith('image/')) return file.type.toLowerCase();
  const ext = file.name.split('.').pop()?.toLowerCase();
  if (ext === 'jpg' || ext === 'jpeg') return 'image/jpeg';
  if (ext === 'png') return 'image/png';
  if (ext === 'webp') return 'image/webp';
  if (ext === 'heic' || ext === 'heif') return 'image/heic';
  return 'image/jpeg';
}

export function validatePassportFile(file: File): { ok: true; mimeType: string } | { ok: false; code: string } {
  const mimeType = detectMimeType(file);
  if (mimeType === 'image/heic' || mimeType === 'image/heif') {
    return { ok: false, code: 'heic_not_supported' };
  }
  if (!['image/jpeg', 'image/png', 'image/webp', 'image/jpg'].includes(mimeType)) {
    return { ok: false, code: 'invalid_image_type' };
  }
  if (file.size > 12 * 1024 * 1024) {
    return { ok: false, code: 'image_too_large' };
  }
  return { ok: true, mimeType: mimeType === 'image/jpg' ? 'image/jpeg' : mimeType };
}
