# مشروع Qibla (مكتشف القبلة)

تطبيق ويب **ثابت** (HTML + JavaScript) لتحديد اتجاه القبلة.  
**لا يحتاج** قاعدة بيانات ولا Supabase ولا Codform.

## 1. المتطلبات

| البند | القيمة |
|-------|--------|
| السيرفر | Contabo VPS — `185.214.135.141` |
| المستخدم | `root` |
| مجلد النشر | `/var/www/qibla` |
| الملف الوحيد | `qibla-finder/index.html` |
| الدومين | دومين خاص (مثال: `qibla.your-domain.com`) — **ليس** `codform.shop` |

## 2. DNS — قبل النشر

```
النوع: A
الاسم: qibla
القيمة: 185.214.135.141
TTL: 300
```

```bash
dig +short qibla.your-domain.com
# يجب: 185.214.135.141
```

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
# عدّل QIBLA_DOMAIN و VPS_HOST و SSH_KEY
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

## الحالة الحالية

التطبيق **منشور** على: https://qibla.codform.shop  
بعد النشر على دومين مستقل، أزل `qibla.conf` من nginx كما في القسم 7.
