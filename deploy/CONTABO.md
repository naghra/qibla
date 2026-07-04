# Contabo VPS — دليل النشر

نشر المشروع على سيرفر Contabo الخاص بك (Ubuntu/Debian) بدون Vercel.

## المتطلبات على السيرفر

- Ubuntu 22.04+ أو Debian 12+
- Node.js 20+ (`curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt install -y nodejs`)
- Nginx
- Certbot (Let's Encrypt) للـ SSL
- Git

```bash
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx git rsync
```

## 1) إعداد المشروع

```bash
sudo mkdir -p /var/www/qibla
sudo chown -R $USER:$USER /var/www/qibla
git clone https://github.com/naghra/qibla.git /var/www/qibla
cd /var/www/qibla
cp .env.example .env
nano .env
```

عدّل `.env`:

```env
VITE_SITE_ORIGIN=https://yourdomain.com
VITE_ADMIN_PASSWORD=كلمة-مرور-قوية
PORT=3000
HOST=127.0.0.1
```

> `VITE_*` تُقرأ وقت **البناء** — بعد أي تغيير في `.env` شغّل `npm run build` من جديد.

## 2) البناء والتشغيل

```bash
npm ci
npm run build
npm start
```

الموقع يعمل على `http://127.0.0.1:3000` ويقدّم:
- ملفات React الثابتة من `dist/`
- واجهة `/api/geo` لكشف دولة الهاتف من IP

## 3) systemd (تشغيل دائم)

```bash
sudo cp deploy/qibla.service /etc/systemd/system/qibla.service
sudo systemctl daemon-reload
sudo systemctl enable --now qibla
sudo systemctl status qibla
```

## 4) Nginx + SSL

```bash
sudo cp deploy/nginx.conf.example /etc/nginx/sites-available/qibla
sudo nano /etc/nginx/sites-available/qibla
# استبدل example.com بدومينك
sudo ln -s /etc/nginx/sites-available/qibla /etc/nginx/sites-enabled/
sudo nginx -t
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
sudo systemctl reload nginx
```

## 5) بديل Docker (اختياري)

```bash
cp .env.example .env
# عدّل VITE_SITE_ORIGIN و VITE_ADMIN_PASSWORD
docker compose up -d --build
```

ثم وجّه Nginx إلى `127.0.0.1:3000` كما في `nginx.conf.example`.

## 6) التحديث بعد تعديل الكود

```bash
cd /var/www/qibla
git pull origin main
chmod +x deploy/deploy.sh
./deploy/deploy.sh /var/www/qibla
sudo systemctl restart qibla
```

أو يدوياً:

```bash
npm ci
npm run build
sudo systemctl restart qibla
```

## التطوير المحلي

```bash
npm install
npm run dev
# http://localhost:3000
```

## ملاحظات

- **لا حاجة لـ Vercel** — السيرفر Node + Nginx يكفيان.
- **Admin:** `/admin` — كلمة المرور من `VITE_ADMIN_PASSWORD`.
- **Firewall:** افتح 80 و 443: `sudo ufw allow OpenSSH && sudo ufw allow 'Nginx Full' && sudo ufw enable`
- الطلبات تُحفظ في `localStorage` بالمتصفح (لا قاعدة بيانات على السيرفر).
