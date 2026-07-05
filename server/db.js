import pg from 'pg';

const { Pool } = pg;

let pool = null;

export function getPool() {
  if (!pool) {
    const connectionString =
      process.env.DATABASE_URL ||
      `postgresql://${process.env.DB_USER || 'dacgateway'}:${process.env.DB_PASSWORD || ''}@${process.env.DB_HOST || '127.0.0.1'}:${process.env.DB_PORT || '5432'}/${process.env.DB_NAME || 'dacgateway'}`;
    pool = new Pool({ connectionString });
  }
  return pool;
}

export async function initDatabase() {
  const client = await getPool().connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS applications (
        id TEXT PRIMARY KEY,
        status TEXT NOT NULL DEFAULT 'pending',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        lang TEXT NOT NULL,
        destination_slug TEXT NOT NULL,
        destination_name TEXT NOT NULL,
        service_slug TEXT NOT NULL,
        service_name TEXT NOT NULL,
        plan_id TEXT NOT NULL,
        plan_name TEXT NOT NULL,
        total_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
        data JSONB NOT NULL DEFAULT '{}',
        admin_notes TEXT,
        status_history JSONB NOT NULL DEFAULT '[]'
      );

      CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
      CREATE INDEX IF NOT EXISTS idx_applications_created_at ON applications(created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_applications_destination ON applications(destination_slug);
    `);
    console.log('Database schema ready');
  } finally {
    client.release();
  }
}

function rowToApp(row) {
  return {
    id: row.id,
    status: row.status,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
    lang: row.lang,
    destinationSlug: row.destination_slug,
    destinationName: row.destination_name,
    serviceSlug: row.service_slug,
    serviceName: row.service_name,
    planId: row.plan_id,
    planName: row.plan_name,
    totalAmount: Number(row.total_amount),
    data: row.data,
    adminNotes: row.admin_notes ?? undefined,
    statusHistory: row.status_history ?? [],
  };
}

export async function listApplications() {
  const { rows } = await getPool().query(
    'SELECT * FROM applications ORDER BY created_at DESC'
  );
  return rows.map(rowToApp);
}

export async function getApplicationById(id) {
  const { rows } = await getPool().query('SELECT * FROM applications WHERE id = $1', [id]);
  return rows[0] ? rowToApp(rows[0]) : null;
}

function generateId() {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `APP-${ts}-${rand}`;
}

export async function createApplication(input) {
  const id = generateId();
  const now = new Date();
  const statusHistory = [{ status: 'pending', at: now.toISOString() }];
  const { rows } = await getPool().query(
    `INSERT INTO applications (
      id, status, created_at, updated_at, lang,
      destination_slug, destination_name, service_slug, service_name,
      plan_id, plan_name, total_amount, data, status_history
    ) VALUES ($1,$2,$3,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
    RETURNING *`,
    [
      id,
      'pending',
      now,
      input.lang,
      input.destinationSlug,
      input.destinationName,
      input.serviceSlug,
      input.serviceName,
      input.planId,
      input.planName,
      input.totalAmount,
      JSON.stringify(input.data),
      JSON.stringify(statusHistory),
    ]
  );
  return rowToApp(rows[0]);
}

export async function updateApplicationStatus(id, status, adminNotes) {
  const existing = await getApplicationById(id);
  if (!existing) return null;

  const now = new Date();
  const history = [...(existing.statusHistory ?? [{ status: existing.status, at: existing.createdAt }])];
  if (existing.status !== status) {
    history.push({ status, at: now.toISOString() });
  }

  const { rows } = await getPool().query(
    `UPDATE applications SET
      status = $2, updated_at = $3, admin_notes = COALESCE($4, admin_notes), status_history = $5
    WHERE id = $1 RETURNING *`,
    [id, status, now, adminNotes ?? null, JSON.stringify(history)]
  );
  return rowToApp(rows[0]);
}

export async function deleteApplicationById(id) {
  const { rowCount } = await getPool().query('DELETE FROM applications WHERE id = $1', [id]);
  return rowCount > 0;
}
