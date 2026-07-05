import {
  listApplications,
  getApplicationById,
  createApplication,
  updateApplicationStatus,
  deleteApplicationById,
} from './db.js';

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
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

export async function handleApplicationsApi(req, res, urlPath) {
  try {
    if (urlPath === '/api/applications' && req.method === 'GET') {
      const apps = await listApplications();
      sendJson(res, 200, apps);
      return true;
    }

    if (urlPath === '/api/applications' && req.method === 'POST') {
      const body = await readJsonBody(req);
      const app = await createApplication(body);
      sendJson(res, 201, app);
      return true;
    }

    const bulkMatch = urlPath === '/api/applications/bulk' && req.method === 'PATCH';
    if (bulkMatch) {
      const body = await readJsonBody(req);
      const { ids, status } = body;
      if (!Array.isArray(ids) || !status) {
        sendJson(res, 400, { error: 'ids and status required' });
        return true;
      }
      let updated = 0;
      for (const id of ids) {
        if (await updateApplicationStatus(id, status)) updated += 1;
      }
      sendJson(res, 200, { updated });
      return true;
    }

    const idMatch = urlPath.match(/^\/api\/applications\/([^/]+)$/);
    if (idMatch) {
      const id = decodeURIComponent(idMatch[1]);

      if (req.method === 'GET') {
        const app = await getApplicationById(id);
        if (!app) {
          sendJson(res, 404, { error: 'Not found' });
          return true;
        }
        sendJson(res, 200, app);
        return true;
      }

      if (req.method === 'PATCH') {
        const body = await readJsonBody(req);
        const app = await updateApplicationStatus(id, body.status, body.adminNotes);
        if (!app) {
          sendJson(res, 404, { error: 'Not found' });
          return true;
        }
        sendJson(res, 200, app);
        return true;
      }

      if (req.method === 'DELETE') {
        const ok = await deleteApplicationById(id);
        sendJson(res, ok ? 204 : 404, ok ? null : { error: 'Not found' });
        if (ok) res.end();
        return true;
      }
    }

    return false;
  } catch (err) {
    console.error('Applications API error:', err);
    sendJson(res, 500, { error: 'Internal server error' });
    return true;
  }
}
