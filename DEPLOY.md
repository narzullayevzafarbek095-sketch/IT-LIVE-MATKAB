# 🌐 IT LIVE Platformasini Deploy Qilish Bo'yicha To'liq Qo'llanma

Ushbu qo'llanmada **IT LIVE** platformasini internetga (jonli serverga) muvaffaqiyatli joylashtirish (deploy) uchun 3 xil eng qulay va ishonchli usul keltirilgan.

Loyiha arxitekturasi **Docker** va **FastAPI + React SPA** birlashtirilgan yagona konteyner shaklida sozlangan, shuning uchun siz ortiqcha server sozlamalarisiz 1 ta xizmat orqali butun platformani (Frontend + Backend + Ma'lumotlar bazasi) ishga tushirishingiz mumkin.

---

## 🚀 1-BOSQICH: Loyihani GitHub ga yuklash (Push qilish)

Har qanday bepul yoki pullik platformaga deploy qilishdan oldin, barcha yangilangan fayllarni GitHub omboringizga yuklang:

```bash
# 1. Barcha o'zgarishlarni qo'shish
git add .

# 2. Commit qilish
git commit -m "feat: configure full production deployment (Docker, Render, Railway, Vercel)"

# 3. GitHub ga push qilish
git push origin main
```

---

## 🌟 2-BOSQICH: Serverga Deploy Qilish Usullari

---

### 🔥 1-USUL: Render.com orqali Deploy (Eng tavsiya etiladigan va Bepul)

[Render.com](https://render.com) — zamonaviy web-ilovalarni bepul va avtomatik HTTPS sertifikati bilan joylashtirish uchun eng yaxshi platforma.

1. **[Render.com](https://render.com)** saytiga kiring va ro'yxatdan o'ting (GitHub orqali kirish tavsiya etiladi).
2. Dashboardda yuqori o'ng burchakdagi **"New +"** tugmasini bosing va **"Web Service"** ni tanlang.
3. GitHub hisobingizdan `IT-LIVE-MATKAB` (yoki loyiha nomingiz) omborini tanlang va **"Connect"** ni bosing.
4. Quyidagi parametrlarni kiriting:
   - **Name**: `itlive-platform` (yoki xohlagan nom)
   - **Region**: `Frankfurt (EU Central)` (O'zbekistonga eng yaqin va tez)
   - **Branch**: `main`
   - **Runtime**: **Docker** (loyihadagi `Dockerfile` ni avtomatik aniqlaydi!)
   - **Instance Type**: **Free** ($0 / oy)
5. **"Advanced"** bo'limida Environment Variables (Ixtiyoriy):
   - `PORT`: `10000` (Render buni o'zi avtomatik ham qo'yadi)
   - `SECRET_KEY`: `itlive_super_secret_key_2026`
6. **"Deploy Web Service"** tugmasini bosing!

🎉 **Natija**: Render avtomatik ravishda Docker orqali React frontendni quradi, Python backendni o'rnatadi, dastlabki bazani seed qiladi va sizga bepul havola beradi (masalan: `https://itlive-platform.onrender.com`).

---

### 🚂 2-USUL: Railway.app orqali Deploy

[Railway.app](https://railway.app) ham Dockerfile asosida 1 daqiqada ishga tushiradi:

1. **[Railway.app](https://railway.app)** ga kiring (GitHub orqali).
2. **"New Project"** -> **"Deploy from GitHub repo"** ni tanlang.
3. `IT-LIVE-MATKAB` omboringizni tanlang.
4. Loyiha sozlamalarida **"Generate Domain"** tugmasini bosing.
5. Railway loyihadagi `railway.json` va `Dockerfile` ni o'qib, avtomatik deploy qiladi!

---

### 🖥 3-USUL: VPS Serverda Deploy (Ubuntu / Debian / Docker)

Agar sizda shaxsiy VPS server (masalan, DigitalOcean, Hetzner, Vultr yoki Timeweb) bo'lsa:

1. Serveringizga SSH orqali kiring:
   ```bash
   ssh root@SERVERINGIZ_IP
   ```

2. Docker va Git o'rnatilganligini tekshiring (bo'lmasa: `apt update && apt install -y docker.io docker-compose-plugin git`).

3. Loyihani yuklab oling:
   ```bash
   git clone https://github.com/narzullayevzafarbek095-sketch/IT-LIVE-MATKAB.git
   cd IT-LIVE-MATKAB
   ```

4. Docker Compose orqali fonga ishga tushiring:
   ```bash
   docker compose up -d --build
   ```

5. Serveringizning `http://SERVER_IP:8000` manzilida IT LIVE platformasi to'liq ishga tushadi!

---

### ⚡ 4-USUL: Frontend (Vercel) + Backend (Render / Railway)

Agar siz Frontend ni Vercel CDN da, Backend ni esa Render da alohida saqlamoqchi bo'lsangiz:

1. **Backend** ni Render ga deploy qiling (masalan, `https://itlive-backend.onrender.com`).
2. **Frontend** ni Vercel ga ulaganda:
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Environment Variable:
     - `VITE_API_BASE_URL` = `https://itlive-backend.onrender.com/api`

---

## 🔑 ADMIN VA TALABA HISOBI

Deploy qilingandan so'ng dastlabki ma'lumotlar bilan to'ldirilgan hisoblar:

- **Admin Boshqaruvchi**:
  - Email: `admin@itlive.uz`
  - Parol: `admin123`
- **Demo Talaba**:
  - Email: `student@itlive.uz`
  - Parol: `student123`

Har qanday savol yoki yordam kerak bo'lsa murojaat qiling!

