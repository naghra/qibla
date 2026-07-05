# Qibla — مكتشف القبلة

تطبيق ويب ثابت لتحديد اتجاه القبلة (HTML + JavaScript).

**الإنتاج:** `qibla-finder/index.html` — ملف واحد، بدون API أو قاعدة بيانات.

## النشر على Contabo

راجع **[DEPLOY.md](./DEPLOY.md)** للتعليمات الكاملة.

```bash
cp deploy/.env.example deploy/.env
chmod +x deploy/deploy.sh
./deploy/deploy.sh
```

## محلي

افتح `qibla-finder/index.html` في المتصفح (أو serve بـ `python3 -m http.server`).

> مجلد `App.tsx` / Vite في الجذر هو مشروع React منفصل (غير مستخدم في إنتاج القبلة).
