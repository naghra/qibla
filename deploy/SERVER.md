# Known Contabo server (codform.shop)

| Field | Value |
|-------|-------|
| **IP** | `185.214.135.141` |
| **Hostname** | `vmi3343242.contaboserver.net` |
| **Provider** | Contabo GmbH (AS51167) |
| **Location** | Lauterbourg, France |
| **Web server** | nginx/1.24.0 (Ubuntu) |
| **Existing site** | https://codform.shop |

Use this server for **qibla** / **travelsmarttravelfast.com** as a second nginx site on port `3000`.

## SSH

```bash
ssh root@185.214.135.141
```

## One-shot install (run on server)

```bash
curl -fsSL https://raw.githubusercontent.com/naghra/qibla/cursor/contabo-deploy-8af4/deploy/install-on-server.sh | sudo bash -s -- \
  --domain travelsmarttravelfast.com \
  --admin-password 'YOUR_SECURE_PASSWORD' \
  --email support@travelsmarttravelfast.com
```

Then point DNS for `travelsmarttravelfast.com` → `185.214.135.141` (A record).

## Coexistence with codform.shop

- `codform.shop` — existing nginx site (unchanged)
- `travelsmarttravelfast.com` — new nginx server block → `127.0.0.1:3000` (qibla Node app)
- App files: `/var/www/qibla`
- systemd service: `qibla`
