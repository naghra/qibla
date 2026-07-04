# Travel Smart Travel Fast — Qibla

موقع مساعدة في مستندات السفر (React + Vite).

## التطوير المحلي

```bash
npm install
npm run dev
```

## النشر على سيرفر Contabo (VPS)

**الدليل الكامل:** [deploy/CONTABO.md](deploy/CONTABO.md)

```bash
cp .env.example .env   # عدّل VITE_SITE_ORIGIN و VITE_ADMIN_PASSWORD
npm ci && npm run build
npm start              # أو systemd: deploy/qibla.service
```

Nginx + SSL: `deploy/nginx.conf.example`

## البناء

```bash
npm run build
npm run preview
```

## ملاحظة

خدمة مساعدة خاصة — غير تابعة لأي جهة حكومية.
