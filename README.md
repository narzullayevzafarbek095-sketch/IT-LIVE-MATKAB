# 🚀 IT LIVE — PROFESSIONAL IT EDUCATION PLATFORM

"IT LIVE" — zamonaviy, premium qorong'u (Dark Cyber) dizayndagi, to'liq funksional professional IT o'quv akademiyasi web-platformasi.

---

## 🌟 PLATFORMA IMKONIYATLARI VA XUSUSIYATLARI

1. **Zamonaviy Dark Cyber Dizayn**:
   - Deep obsidian/midnight fon, neon ko'k (`#38bdf8`) va neon binafsha (`#8b5cf6`) urg'ulari.
   - Glassmorphism shaffof kartochkalar, 3D interaktiv IDE kod sandboxi.
   - Smooth scrolling, hover animatsiyalar va 100% responsive mobil moslashuvchanlik.

2. **Bosh Sahifa (Landing Page)**:
   - **Navbar**: Sticky shaffof glassmorphism menyusi, jonli navigatsiya va kirish/ro'yxatdan o'tish boshqaruvi.
   - **Hero Section**: *"Kelajagingni IT bilan yarat!"*, kod simulyatori, 3 xil tildagi (React, Python, AI) interaktiv IDE hamda test ishga tushirish imkoniyati.
   - **Biz haqimizda**: IT LIVE akademiyasi missiyasi va jonli statistik kartochkalar (*O‘quvchilar soni*, *Tajribali ustozlar*, *IT kurslari*, *Yaratilgan loyihalar*).
   - **7 ta Professional IT Kurs**:
     1. Frontend Development (HTML, CSS, JS, React.js, Tailwind CSS)
     2. Backend Development (Python, Django, FastAPI, PostgreSQL, Docker)
     3. Python Programming (Python asoslari, OOP, algoritmlar, amaliy loyihalar)
     4. C++ Programming (Algoritmlar, xotira boshqaruvi, olimpiada masalalari)
     5. UI/UX Design (Figma, Design Systems, Prototiplash)
     6. Artificial Intelligence (Machine Learning, PyTorch, LLM & AI agentlar)
     7. Graphic Design (Photoshop, Illustrator, Brending)
   - **Ustozlar**: Senior mentorlarning to'liq profillari, tajribasi, o'quvchilar soni, baholari va ijtimoiy tarmoqlari (Telegram, GitHub, LinkedIn).
   - **O‘quvchilar Loyihalari**: 5 ta asosiy yo'nalishdagi portfolio loyihalari (*Online Shop*, *AI Assistant*, *Education Website*, *Portfolio Website*, *Telegram Bot*).
   - **Ro‘yxatdan o'tish formasi**: Haqiqiy ishlaydigan ariza topshirish tizimi (backend orqali saqlanadi, admin panelda aks etadi).
   - **Aloqa**: Bog'lanish formasi, telefon raqamlar, manzil va interaktiv Google Maps xaritasi.
   - **Footer**: Akademiya brendi, tezkor o'tish havolalari, ijtimoiy tarmoqlar va mualliflik huquqlari.

3. **O‘quvchi Kabineti (Student Portal)**:
   - Shaxsiy profil va avatar
   - Tanlangan kurslar va o'zlashtirish foizi (Progress bar)
   - Haftalik darslar jadvali (kunlar, soatlar, auditoriya/Zoom)
   - Topshiriqlar va uyga vazifalarni tekshiruvga yuborish (GitHub link yoki matn)
   - O'zlashtirish ko'rsatkichlari (GPA, davomat, ko'nikmalar darajasi)
   - Rasmiy QR-kodli Xalqaro Sertifikatni ko'rish va chop etish

4. **Admin Panel (Super Admin Dashboard)**:
   - Akademiya jonli statistikasini saytda real vaqtda tahrirlash (Students count, etc.)
   - Ro'yxatdan o'tgan talabalar arizalarini ko'rish, holatini o'zgartirish (*Yangi*, *Bog'lanildi*, *Qabul qilindi*, *Bekor qilindi*) va o'chirish
   - Yangi kurslar qo'shish, tahrirlash va o'chirish (CRUD)
   - Ustozlarni boshqarish (CRUD)
   - O'quvchilar loyihalarini boshqarish (CRUD)
   - Ro'yxatdan o'tgan foydalanuvchilar ro'yxati
   - Aloqa bo'limidan kelgan barcha murojaatlarni o'qish

---

## 🛠 TEXNOLOGIK STACK

- **Frontend**: React.js 19, Tailwind CSS, Lucide Icons, Framer Motion, Vite.
- **Backend**: Python 3.14, FastAPI, SQLAlchemy ORM, Pydantic, Uvicorn.
- **Xavfsizlik & Auth**: PBKDF2-HMAC-SHA256 parollarni shifrlash, JWT (JSON Web Tokens) autentifikatsiya.
- **Ma'lumotlar Bazasi**: SQLite (zero-config darhol ishlash uchun) hamda PostgreSQL qo'llab-quvvatlovi (`DATABASE_URL` orqali).

---

## ⚡ TEZKOR ISHGA TUSHIRISH

### 1-Usul: Bitta buyruq orqali to'liq platformani ishga tushirish (Tavsiya etiladi)

```powershell
.\backend_venv\Scripts\python.exe run_platform.py
```

Platforma quyidagi manzillarda ochiladi:
- **Web-Platforma**: [http://localhost:8000](http://localhost:8000)
- **Interaktiv API Hujjatlari (Swagger UI)**: [http://localhost:8000/docs](http://localhost:8000/docs)

---

### 2-Usul: Frontend va Backend ni alohida ishlab chiqish rejimida ishga tushirish

#### Backend (Port: 8000):
```powershell
cd backend
..\backend_venv\Scripts\python.exe -m uvicorn main:app --reload --port 8000
```

#### Frontend (Port: 3000):
```powershell
cd frontend
npm.cmd run dev
```

---

## 🔑 TAYYOR TIZIMGA KIRISH HISOB-KITOBLARI

| Rol | Email | Parol | Huquqlar |
|---|---|---|---|
| **Boshqaruvchi (Super Admin)** | `admin@itlive.uz` | `admin123` | To'liq admin panel, statistika, kurslar, ustozlar, arizalar boshqaruvi |
| **Talaba (Demo Student)** | `student@itlive.uz` | `student123` | Shaxsiy kabinet, kurslar, jadval, topshiriqlar, sertifikatlar |

*Saytda "Kirish" tugmasini bosganda ushbu hisoblarga 1 ta tugma orqali avtomatik to'ldirib kirish tugmalari ham mavjud!*

