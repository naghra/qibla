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

## Step 2 — Add key in Contabo panel

1. Open https://new.contabo.com (or https://my.contabo.com)
2. Go to **VPS** → your server (`vmi3343242`)
3. Open **Add And Store Public SSH-Key** (or **Secret Management** → **SSH Keys**)
4. Click **Add SSH Key**
5. Paste the public key above
6. Save / confirm
7. If prompted, **assign the key to this VPS** (or reinstall/apply key to server)

> After saving, wait 1–2 minutes for Contabo to apply the key to the server.

---

## Step 3 — Tell the agent to deploy

Reply in chat: **"المفتاح أُضيف — انشر الآن"**

The agent will connect with:

```bash
ssh -i deploy-keys/qibla-deploy root@185.214.135.141
```

---

## Alternative — add key manually via VNC

If the panel option is not available, in **VNC Console**:

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
