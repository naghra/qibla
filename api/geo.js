async function fetchCountryFromIpWho(req) {
  try {
    const forwarded = req.headers['x-forwarded-for'];
    const ip = typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : null;
    const url = ip ? `https://ipwho.is/${encodeURIComponent(ip)}` : 'https://ipwho.is/';
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.success === false) return null;
    return typeof data.country_code === 'string' ? data.country_code : null;
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'private, no-store');

  const vercelCountry = req.headers['x-vercel-ip-country'];
  let countryCode = typeof vercelCountry === 'string' ? vercelCountry : null;

  if (!countryCode) {
    countryCode = await fetchCountryFromIpWho(req);
  }

  res.status(200).json({
    countryCode: countryCode ? countryCode.toUpperCase() : null,
  });
}
