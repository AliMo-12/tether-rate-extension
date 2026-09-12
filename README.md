# tether-rate-extension
Chrome extension that shows the live USDT (Tether) to Toman price in the browser toolbar
# نرخ تتر | Tether Rate Extension

اکستنشن گوگل کروم برای نمایش لحظه‌ای قیمت تتر (USDT) به تومان، مستقیم توی نوار ابزار مرورگر.

## ویژگی‌ها

- نمایش قیمت لحظه‌ای تتر روی آیکون اکستنشن (Badge)
- اتصال زنده به وب‌سوکت ArzDigital برای دریافت قیمت بدون تأخیر
- بروزرسانی خودکار و اتصال مجدد در صورت قطعی
- رابط کاربری ساده و مینیمال

## نصب

این اکستنشن فعلاً روی Chrome Web Store منتشر نشده. برای نصب دستی:

1. این ریپازیتوری رو دانلود یا clone کن:
```bash
   git clone https://github.com/AliMo-12/tether-rate-extension.git
```
2. به آدرس `chrome://extensions` برو.
3. گزینه‌ی **Developer mode** رو (بالا سمت راست) روشن کن.
4. روی **Load unpacked** کلیک کن و پوشه‌ی پروژه رو انتخاب کن.
5. آیکون اکستنشن به نوار ابزار اضافه میشه.

## ساختار پروژه

| فایل | توضیح |
|---|---|
| `manifest.json` | تنظیمات و مجوزهای اکستنشن |
| `background.js` | اتصال به وب‌سوکت و مدیریت قیمت در پس‌زمینه |
| `popup.html` / `popup.js` | رابط کاربری پاپ‌آپ |

## منبع داده

قیمت از [ArzDigital](https://arzdigital.com) دریافت می‌شود.

## حمایت

اگه این پروژه به دردت خورد و خواستی حمایت کنی:



## لایسنس

این پروژه تحت [لایسنس MIT](LICENSE) منتشر شده است.
