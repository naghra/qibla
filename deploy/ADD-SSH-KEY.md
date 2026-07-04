# Contabo — Add And Store Public SSH-Key

Use Contabo's **Add And Store Public SSH-Key** feature so deployment works without a password.

## Server

| | |
|---|---|
| IP | `185.214.135.141` |
| Hostname | `vmi3343242.contaboserver.net` |
| Existing site | `codform.shop` |

---

## Step 1 — Copy this public key

Add **the entire line below** in Contabo (one line, no line breaks):

```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIFUX1vnnR52xysaPMaxaZMevsGrY6/42yq4TuJeLIDri qibla-deploy@travelsmarttravelfast.com
```

---

## Step 2 — Add key in Contabo panel (for future installs)

1. Open https://new.contabo.com (or https://my.contabo.com)
2. Go to **VPS control** → your server (`vmi3343242`)
3. **Manage** → **Add And Store Public SSH-Key**
4. Paste the public key from Step 1 and save

> **Note:** On an **existing running server**, this stores the key in Contabo but does **not** add it to the server automatically. Use Step 2b below.

---

## Step 2b — Enable SSH access (no VNC needed)

If **VNC Console** is not available, use **Reset credentials**:

1. Contabo → **VPS control** → **Manage** (next to your server)
2. Click **Reset credentials** (or **Password reset**)
3. Enter a **new root password** (e.g. `QiblaRoot2026!`) — save it
4. Click **Reset credentials** / **Confirm**
5. Wait 2–5 minutes (server may reboot briefly)
6. Reply in chat: **"كلمة المرور الجديدة: YOUR_PASSWORD"**

The agent will SSH in, add the deploy key, and publish the site.

### Alternative: Rescue System

1. **Manage** → **Rescue System**
2. Set a temporary rescue password → **Start rescue system**
3. Send the rescue password in chat — agent connects, mounts disk, adds SSH key, reboots to normal

---

## Step 3 — Tell the agent to deploy

Reply: **"المفتاح أُضيف — انشر الآن"** or send the new root password after Reset credentials.

```bash
mkdir -p ~/.ssh && chmod 700 ~/.ssh
echo 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIFUX1vnnR52xysaPMaxaZMevsGrY6/42yq4TuJeLIDri qibla-deploy@travelsmarttravelfast.com' >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

---

## GitHub Actions (optional)

Repository → **Settings** → **Secrets and variables** → **Actions**:

| Secret | Value |
|--------|-------|
| `CONTABO_HOST` | `185.214.135.141` |
| `CONTABO_USER` | `root` |
| `CONTABO_SSH_KEY` | private key (keep secret — do not commit) |
| `VITE_ADMIN_PASSWORD` | admin panel password for `/admin` |

Then merge to `main` — workflow `.github/workflows/deploy-contabo.yml` deploys automatically.

---

## DNS after deploy

Point domain to Contabo:

```
A  travelsmarttravelfast.com      →  185.214.135.141
A  www.travelsmarttravelfast.com  →  185.214.135.141
```

Then run certbot on server for HTTPS (install script does this automatically).
