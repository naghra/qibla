export function verifyAdminPassword(req) {
  const expected = process.env.ADMIN_PASSWORD?.trim();
  if (!expected) return false;

  const header = req.headers['x-admin-password'];
  if (typeof header === 'string' && header === expected) return true;

  const auth = req.headers.authorization;
  if (typeof auth === 'string' && auth.startsWith('Bearer ')) {
    return auth.slice(7) === expected;
  }

  return false;
}

export function sendUnauthorized(res) {
  res.writeHead(401, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify({ error: 'unauthorized' }));
}
