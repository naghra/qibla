# النشر على Contabo (dacgateway.com)

## موقع سفر تايلاند (الإنتاج الحالي)

موقع **Travel Smart Travel Fast** — React SPA لطلب وثائق السفر (TDAC تايلاند).

```bash
cp deploy/.env.example deploy/.env
# عدّل VITE_ADMIN_PASSWORD
chmod +x deploy/deploy-thailand.sh
./deploy/deploy-thailand.sh
```

| البند | القيمة |
|-------|--------|
| الدومين الأساسي | https://dacgateway.com |
| دومين ثانوي (تحويل) | https://ksashort.shop → dacgateway.com |
| المسار | `/var/www/qibla` |
| البناء | `npm run build` → `dist/` |

---

# مشروع Qibla (مكتشف القبلة)

تطبيق وеб **ثابت** (HTML + JavaScript) لتحديد اتجاه القبلة.  
**لا يحتاج** قاعدة بيانات ولا Supabase ولا Codform.

## 1. المتطلبات

| البند | القيمة |
|-------|--------|
| السيرفر | Contabo VPS — `185.214.135.141` |
| المستخدم | `root` |
| مجلد النشر | `/var/www/qibla` |
| الملف الوحيد | `qibla-finder/index.html` |
| الدومين | **`ksashort.shop`** (الجذر + www) |

## 2. DNS — قبل النشر

في لوحة الدومين (Namecheap أو غيره) أضف:

| النوع | Host | القيمة | TTL |
|-------|------|--------|-----|
| A | `@` | `185.214.135.141` | 300 |
| A | `www` | `185.214.135.141` | 300 |

```bash
chmod +x deploy/verify-dns.sh
./deploy/verify-dns.sh ksashort.shop
# يجب أن يظهر: OK ksashort.shop -> 185.214.135.141
```

> **ملاحظة:** حالياً `ksashort.shop` مُعدّ على السيرفر لكنه يعرض CodForm. بعد النشر سيُعرض تطبيق القبلة من `/var/www/qibla`.

## 3. مفتاح SSH

```bash
ssh-keygen -t ed25519 -f ~/.ssh/qibla_deploy_ed25519 -N ""
cat ~/.ssh/qibla_deploy_ed25519.pub
```

أضف المفتاح العام في `/root/.ssh/authorized_keys` على السيرفر.

مفتاح النشر الجاهز في المستودع: `deploy/qibla-deploy.pub`

```bash
ssh -i ~/.ssh/qibla_deploy_ed25519 root@185.214.135.141 "echo OK"
```

## 4. إعداد محلي

```bash
cp deploy/.env.example deploy/.env
# القيم الافتراضية جاهزة لـ ksashort.shop — عدّل CERTBOT_EMAIL إن لزم
```

## 5. النشر

```bash
chmod +x deploy/deploy.sh
./deploy/deploy.sh
```

يقوم السكربت بـ:
- رفع `index.html` إلى `/var/www/qibla/`
- تثبيت `qibla-standalone.conf` في nginx
- طلب SSL من Let's Encrypt
- إعادة تحميل nginx

## 6. إعادة النشر

```bash
./deploy/deploy.sh
```

## 7. الفصل عن codform.shop

| | codform.shop | qibla (مستقل) |
|---|-------------|---------------|
| المسار | `/var/www/saqr/dist` | `/var/www/qibla` |
| Backend | Supabase + API | static فقط |
| nginx | `codform.conf` | `qibla-standalone.conf` |

إزالة الرابط القديم `qibla.codform.shop`:

```bash
ssh root@185.214.135.141
rm -f /etc/nginx/sites-enabled/qibla.conf
nginx -t && systemctl reload nginx
```

## 8. هيكل المشروع

```
qibla-finder/
├── index.html              ← ملف الإنتاج (Vanilla JS + Tailwind CDN)
deploy/
├── .env.example
├── deploy.sh
├── nginx.conf.template
└── qibla-deploy.pub
DEPLOY.md
```

## 9. استكشاف الأخطاء

| المشكلة | الحل |
|---------|------|
| Permission denied (publickey) | أضف المفتاح العام في `authorized_keys` |
| SSL cert missing | تحقق من DNS قبل النشر |
| صفحة بيضاء | تأكد من وجود `index.html` في `/var/www/qibla/` |
| البوصلة لا تعمل | يحتاج HTTPS + إذن الموقع على الجوال |

## 10. معلومات السيرفر

```
Host:     185.214.135.141
User:     root
Web root: /var/www/qibla
Nginx:    /etc/nginx/sites-available/qibla-standalone.conf
Logs:     /var/log/nginx/error.log
```

**لا تشارك** مفاتيح SSH أو كلمات مرور root في المستودع.

## 11. ربط ksashort.shop (بدون SSH — عبر VNC)

إذا فشل SSH، افتح **Contabo VNC Console** والصق:

```bash
curl -fsSL https://raw.githubusercontent.com/naghra/qibla/cursor/ksashort-domain-8af4/deploy/setup-ksashort-vnc.sh | bash
```

أو انسخ `deploy/setup-ksashort-vnc.sh` يدوياً وشغّله على السيرفر. السكربت يقوم بـ:
- إضافة مفتاح النشر في `authorized_keys`
- نسخ تطبيق القبلة إلى `/var/www/qibla`
- إعداد nginx لـ `ksashort.shop`
- إزالة الدومين من إعداد CodForm
- طلب شهادة SSL

## الحالة الحالية

| الدومين | الحالة |
|---------|--------|
| https://dacgateway.com | **موقع سفر تايلاند** (الدومين الأساسي) |
| https://ksashort.shop | يُحوّل تلقائياً → dacgateway.com |
| https://qibla.codform.shop | تطبيق القبلة (نسخة احتياطية) |
