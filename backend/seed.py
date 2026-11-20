import json
from database import SessionLocal, engine, Base
import models
from auth import hash_password

def seed_database():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # Check if already seeded
    if db.query(models.User).filter(models.User.email == "admin@itlive.uz").first():
        print("Baza allaqachon ma'lumotlar bilan to'ldirilgan.")
        db.close()
        return

    print("Baza dastlabki ma'lumotlar bilan to'ldirilmoqda...")

    # 1. Admin User
    admin = models.User(
        email="admin@itlive.uz",
        full_name="IT LIVE Administrator",
        hashed_password=hash_password("admin123"),
        role="admin",
        phone="+998 90 123 45 67",
        avatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
        bio="IT LIVE Akademiya boshqaruvchisi va bosh koordinatori."
    )
    db.add(admin)

    # 2. Student Demo User
    student = models.User(
        email="student@itlive.uz",
        full_name="Jasur Alimov",
        hashed_password=hash_password("student123"),
        role="student",
        phone="+998 99 876 54 32",
        avatar="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80",
        bio="IT LIVE Frontend va AI kurslari faol talabasi."
    )
    db.add(student)
    db.commit()
    db.refresh(student)

    # 3. Academy Stats
    stats = models.AcademyStats(
        students_count="3,200+",
        mentors_count="25+",
        courses_count="12+",
        projects_count="180+",
        employment_rate="96%"
    )
    db.add(stats)

    # 4. Courses (7 core courses)
    courses_data = [
        {
            "title": "Frontend Development",
            "slug": "frontend-development",
            "description": "HTML, CSS, JavaScript, React.js va Tailwind CSS yordamida zamonaviy va interaktiv web-saytlar yaratishni professional darajada o'rganing.",
            "full_description": "Frontend Development kursi orqali siz noldan boshlab murakkab Single Page Applications (SPA), responsive web-interfeyslar, animatsiyalar, state management (Redux/Zustand) va backend API'lar bilan ishlashni amaliy loyihalarda to'liq o'zlashtirasiz. Kurs yakunida xalqaro IT kompaniyalari talablariga mos portfolio yaratasiz.",
            "duration": "7 oy",
            "level": "Boshlang'ichdan Pro gacha",
            "category": "Dasturlash",
            "price": "1,200,000 so'm / oy",
            "image": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
            "rating": 4.95,
            "mentor_name": "Sardorbek Rahimov",
            "syllabus_json": json.dumps([
                {"module": "1-Modul", "title": "Web Asoslari: Semantik HTML5 va Zamonaviy CSS3", "duration": "4 hafta"},
                {"module": "2-Modul", "title": "Tailwind CSS, Responsive Dizayn va Flexbox/Grid", "duration": "3 hafta"},
                {"module": "3-Modul", "title": "JavaScript Chuqur O'rganish (ES6+, DOM, Asinxronlik, Fetch)", "duration": "6 hafta"},
                {"module": "4-Modul", "title": "React.js Framework, Hooks, Routing va Komponentlar", "duration": "7 hafta"},
                {"module": "5-Modul", "title": "State Management, REST API integratsiyasi va Diplom Loyihasi", "duration": "6 hafta"}
            ])
        },
        {
            "title": "Backend Development",
            "slug": "backend-development",
            "description": "Python, Django, FastAPI, RESTful API, PostgreSQL va xavfsiz server arxitekturalarini professional darajada barpo etish.",
            "full_description": "Yuqori yuklamalarga chidamli serverlar, xavfsiz autentifikatsiya (JWT/OAuth), ma'lumotlar bazasi optimallashuvi (PostgreSQL, Redis), Docker konteynerlashtirish va bulutli platformalarga deploy qilish bo'yicha keng qamrovli amaliy dastur.",
            "duration": "7 oy",
            "level": "O'rta va Kuchli",
            "category": "Dasturlash",
            "price": "1,300,000 so'm / oy",
            "image": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
            "rating": 4.92,
            "mentor_name": "Bobur Mirzayev",
            "syllabus_json": json.dumps([
                {"module": "1-Modul", "title": "Python Asoslari, Algoritmlar va OOP", "duration": "4 hafta"},
                {"module": "2-Modul", "title": "PostgreSQL, SQL so'rovlar, Tranzaksiyalar va ORM", "duration": "4 hafta"},
                {"module": "3-Modul", "title": "Django Framework va Django REST Framework (DRF)", "duration": "6 hafta"},
                {"module": "4-Modul", "title": "FastAPI asinxron backend va Mikroxizmatlar", "duration": "5 hafta"},
                {"module": "5-Modul", "title": "Docker, CI/CD, Xavfsizlik va Bulutli Deploy", "duration": "5 hafta"}
            ])
        },
        {
            "title": "Python Programming",
            "slug": "python-programming",
            "description": "Python asoslari, obyektga yo'naltirilgan dasturlash (OOP), algoritmlar va amaliy real loyihalar ustida ishlash.",
            "full_description": "Dasturlash olamiga eng qulay va kuchli til orqali kirib keling. Skriptlar yozish, ma'lumotlarni tahlil qilish, avtomatlashtirish botlari yaratish va mustahkam kompyuter fanlari poydevorini shakllantiring.",
            "duration": "5 oy",
            "level": "Boshlang'ich",
            "category": "Dasturlash",
            "price": "1,000,000 so'm / oy",
            "image": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=80",
            "rating": 4.88,
            "mentor_name": "Bobur Mirzayev",
            "syllabus_json": json.dumps([
                {"module": "1-Modul", "title": "Python Sintaksisi, Ma'lumot turlari va Oqim nazorati", "duration": "4 hafta"},
                {"module": "2-Modul", "title": "Funksional dasturlash va Obyektga yo'naltirilgan dasturlash (OOP)", "duration": "5 hafta"},
                {"module": "3-Modul", "title": "Fayllar, Ma'lumotlar bazasi (SQLite) va Paketlar", "duration": "4 hafta"},
                {"module": "4-Modul", "title": "Telegram Botlar va Avtomatlashtirish Loyihalari", "duration": "5 hafta"}
            ])
        },
        {
            "title": "C++ Programming",
            "slug": "cpp-programming",
            "description": "Algoritmlar, xotira boshqaruvi, murakkab ma'lumotlar tuzilmasi va yuqori tezlikda ishlovchi tizimlar dasturlash.",
            "full_description": "C++ ning zamonaviy standartlari (C++17/20), ko'rsatkichlar (pointers), memory management, STL kutubxonasi, murakkab algoritmlar hamda olimpiada va musobaqa dasturlashi uchun chuqur tayyorgarlik.",
            "duration": "6 oy",
            "level": "Boshlang'ichdan Kuchli gacha",
            "category": "Dasturlash",
            "price": "1,100,000 so'm / oy",
            "image": "https://images.unsplash.com/photo-1516116211227-bbc0ffbfdd46?w=800&auto=format&fit=crop&q=80",
            "rating": 4.86,
            "mentor_name": "Jamshid Toirov",
            "syllabus_json": json.dumps([
                {"module": "1-Modul", "title": "C++ Sintaksis, Massivlar, Satrlar va Ko'rsatkichlar", "duration": "5 hafta"},
                {"module": "2-Modul", "title": "Dinamik xotira va Xotirani boshqarish", "duration": "4 hafta"},
                {"module": "3-Modul", "title": "OOP, Konstruktorlar, Vorislik va Polimorfizm", "duration": "5 hafta"},
                {"module": "4-Modul", "title": "STL (Standard Template Library) va Murakkab Algoritmlar", "duration": "6 hafta"}
            ])
        },
        {
            "title": "UI/UX Design",
            "slug": "ui-ux-design",
            "description": "Figma orqali qulay va zamonaviy foydalanuvchi interfeyslari (UI) hamda tajribasi (UX) yaratish.",
            "full_description": "Foydalanuvchi xatti-harakatlarini tahlil qilish, User Flow, Wireframing, Dizayn tizimlari (Design System), Auto Layout, Interaktiv Prototip yaratish va real startap mahsulotlari dizayni.",
            "duration": "4 oy",
            "level": "Boshlang'ich",
            "category": "Dizayn",
            "price": "1,000,000 so'm / oy",
            "image": "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&auto=format&fit=crop&q=80",
            "rating": 4.94,
            "mentor_name": "Nilufar Karimova",
            "syllabus_json": json.dumps([
                {"module": "1-Modul", "title": "UX Asoslari, Tadqiqot va User Journey Map", "duration": "3 hafta"},
                {"module": "2-Modul", "title": "Figma Masterklass: Auto Layout, Komponentlar, Variantlar", "duration": "4 hafta"},
                {"module": "3-Modul", "title": "Design System, Tipografika va Ranglar nazariyasi", "duration": "3 hafta"},
                {"module": "4-Modul", "title": "Mobil ilova va Web platforma dizayni portfoliyasi", "duration": "4 hafta"}
            ])
        },
        {
            "title": "Artificial Intelligence",
            "slug": "artificial-intelligence",
            "description": "Sun'iy intellekt, Machine Learning, Deep Learning, Neyron tarmoqlari va zamonaviy AI agentlar yaratish.",
            "full_description": "Matematika va statistika asoslari, Scikit-learn, PyTorch, Computer Vision, Tabiiy tilni qayta ishlash (NLP), ChatGPT/Claude API va zamonaviy LLM texnologiyalari bilan ishlaydigan aqlli tizimlar qurish.",
            "duration": "8 oy",
            "level": "O'rta va Kuchli",
            "category": "Sun'iy intellekt",
            "price": "1,600,000 so'm / oy",
            "image": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80",
            "rating": 4.98,
            "mentor_name": "Farrux Qodirov",
            "syllabus_json": json.dumps([
                {"module": "1-Modul", "title": "AI uchun Matematika, Python va Ma'lumotlar tahlili", "duration": "5 hafta"},
                {"module": "2-Modul", "title": "Machine Learning Algoritmlari (Regressiya, Tasniflash)", "duration": "6 hafta"},
                {"module": "3-Modul", "title": "Deep Learning va PyTorch Neyron tarmoqlari", "duration": "6 hafta"},
                {"module": "4-Modul", "title": "NLP, LLM, RAG Tizimlari va AI Agentlar integratsiyasi", "duration": "7 hafta"}
            ])
        },
        {
            "title": "Graphic Design",
            "slug": "graphic-design",
            "description": "Adobe Photoshop, Illustrator va zamonaviy brending dizaynlari orqali vizual san'atni kasbga aylantiring.",
            "full_description": "Brend identifikatsiyasi (Logo & Brand Identity), reklama bannerlari, ijtimoiy tarmoqlar vizuali, bosma mahsulotlar dizayni va kreativ kompozitsiya yaratish qoidalari.",
            "duration": "4 oy",
            "level": "Boshlang'ich",
            "category": "Dizayn",
            "price": "950,000 so'm / oy",
            "image": "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop&q=80",
            "rating": 4.89,
            "mentor_name": "Dilnoza Rahimova",
            "syllabus_json": json.dumps([
                {"module": "1-Modul", "title": "Adobe Photoshop: Retush, Kollaj va Rang korreksiyasi", "duration": "4 hafta"},
                {"module": "2-Modul", "title": "Adobe Illustrator: Vektor grafika, Ikonkalar va Shakllar", "duration": "4 hafta"},
                {"module": "3-Modul", "title": "Brending: Logotip yaratish, Tipografika va Brendbuk", "duration": "4 hafta"},
                {"module": "4-Modul", "title": "SMM dizayn va Portfolio tayyorlash", "duration": "3 hafta"}
            ])
        }
    ]

    saved_courses = []
    for c_data in courses_data:
        course = models.Course(**c_data)
        db.add(course)
        saved_courses.append(course)
    
    db.commit()
    for c in saved_courses:
        db.refresh(c)

    # 5. Mentors
    mentors_data = [
        {
            "full_name": "Sardorbek Rahimov",
            "specialty": "Senior Frontend Developer",
            "experience": "7+ yil tajriba",
            "bio": "Xalqaro IT kompaniyalarda 7 yildan ortiq tajribaga ega. React, TypeScript va Next.js bo'yicha 50 dan ortiq yirik loyihalar me'mori.",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
            "telegram": "https://t.me/itlive_academy",
            "github": "https://github.com",
            "linkedin": "https://linkedin.com",
            "rating": 4.95,
            "students_count": 480
        },
        {
            "full_name": "Bobur Mirzayev",
            "specialty": "Lead Backend & Cloud Architect",
            "experience": "8+ yil tajriba",
            "bio": "Python, Django, FastAPI va High-load arxitekturalar bo'yicha yetakchi mutaxassis. Xalqaro FinTech loyihalar backend yetakchisi.",
            "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
            "telegram": "https://t.me/itlive_academy",
            "github": "https://github.com",
            "linkedin": "https://linkedin.com",
            "rating": 4.92,
            "students_count": 420
        },
        {
            "full_name": "Nilufar Karimova",
            "specialty": "Principal UI/UX Designer",
            "experience": "5+ yil tajriba",
            "bio": "Figma va Design System bo'yicha professional ekspert. 30 dan ortiq mobil ilova va yirik platformalar foydalanuvchi interfeyslari muallifi.",
            "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
            "telegram": "https://t.me/itlive_academy",
            "github": "https://github.com",
            "linkedin": "https://linkedin.com",
            "rating": 4.96,
            "students_count": 390
        },
        {
            "full_name": "Farrux Qodirov",
            "specialty": "AI & Deep Learning Engineer",
            "experience": "6+ yil tajriba",
            "bio": "Sun'iy intellekt, Machine Learning va LLM texnologiyalari tadqiqotchisi. Kompyuter ko'rishi va ovozli tizimlar bo'yicha xalqaro patentlar egasi.",
            "avatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
            "telegram": "https://t.me/itlive_academy",
            "github": "https://github.com",
            "linkedin": "https://linkedin.com",
            "rating": 4.98,
            "students_count": 310
        },
        {
            "full_name": "Jamshid Toirov",
            "specialty": "Senior C++ & Systems Engineer",
            "experience": "9+ yil tajriba",
            "bio": "Murakkab tizimli dasturlash, algoritmlar va xotira optimallashuvi bo'yicha yuqori toifali dasturchi va xalqaro olimpiada sovrindori.",
            "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
            "telegram": "https://t.me/itlive_academy",
            "github": "https://github.com",
            "linkedin": "https://linkedin.com",
            "rating": 4.88,
            "students_count": 280
        },
        {
            "full_name": "Dilnoza Rahimova",
            "specialty": "Creative Art Director & Brand Designer",
            "experience": "5+ yil tajriba",
            "bio": "Brending, vizual marketing va zamonaviy grafika bo'yicha 100 dan ortiq mashhur brendlar bilan hamkorlik qilgan tajribali dizayner.",
            "avatar": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
            "telegram": "https://t.me/itlive_academy",
            "github": "https://github.com",
            "linkedin": "https://linkedin.com",
            "rating": 4.90,
            "students_count": 350
        }
    ]

    for m_data in mentors_data:
        mentor = models.Mentor(**m_data)
        db.add(mentor)

    # 6. Student Projects (All 5 user-requested categories)
    projects_data = [
        {
            "title": "Online Shop",
            "description": "To'liq funksional internet do'kon platformasi. Savatcha, to'lov tizimlari (Payme/Click) integratsiyasi va qulay admin boshqaruv paneli.",
            "author_name": "Azizbek Yusupov",
            "course_name": "Frontend Development",
            "image": "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&auto=format&fit=crop&q=80",
            "demo_url": "https://example.com/online-shop",
            "github_url": "https://github.com",
            "tech_stack": "React.js, Tailwind CSS, Redux Toolkit, Stripe API"
        },
        {
            "title": "AI Assistant",
            "description": "Aqlli sun'iy intellekt yordamchisi. Hujjatlarni tahlil qilish, ovozli savol-javob va biznes jarayonlarini avtomatlashtirish qobiliyatiga ega.",
            "author_name": "Malika Shodiyeva",
            "course_name": "Artificial Intelligence",
            "image": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
            "demo_url": "https://example.com/ai-assistant",
            "github_url": "https://github.com",
            "tech_stack": "Python, FastAPI, OpenAI API, LangChain, React"
        },
        {
            "title": "Education Website",
            "description": "Zamonaviy onlayn ta'lim platformasi. Video darslar, interaktiv testlar, sertifikat berish tizimi va o'quvchilar reytingi.",
            "author_name": "Diyorbek Mahmudov",
            "course_name": "Backend Development",
            "image": "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&auto=format&fit=crop&q=80",
            "demo_url": "https://example.com/education-web",
            "github_url": "https://github.com",
            "tech_stack": "Django REST, PostgreSQL, Docker, Next.js"
        },
        {
            "title": "Portfolio Website",
            "description": "Kreativ 3D interaktiv dasturchi portfoliosi. 3D animatsiyalar, dark cyber tema va mukammal mobil moslashuvchanlik.",
            "author_name": "Shohruh Nazarov",
            "course_name": "Frontend Development",
            "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
            "demo_url": "https://example.com/portfolio",
            "github_url": "https://github.com",
            "tech_stack": "React, Three.js, Tailwind CSS, Framer Motion"
        },
        {
            "title": "Telegram Bot",
            "description": "Kompaniyalar uchun avtomatlashtirilgan ko'p tarmoqli savdo va mijozlarga xizmat ko'rsatuvchi CRM integratsiyali Telegram boti.",
            "author_name": "Rustam Salimov",
            "course_name": "Python Programming",
            "image": "https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=800&auto=format&fit=crop&q=80",
            "demo_url": "https://t.me/example_bot",
            "github_url": "https://github.com",
            "tech_stack": "Python, Aiogram 3, PostgreSQL, Redis, Docker"
        }
    ]

    for p_data in projects_data:
        project = models.Project(**p_data)
        db.add(project)

    # 7. Sample Initial Registrations / Applications
    sample_registrations = [
        models.Registration(
            full_name="Otabek Qobilov",
            phone="+998 90 987 65 43",
            age=21,
            course_id=saved_courses[0].id,
            course_title="Frontend Development",
            comment="Noldan boshlab IT mutaxassisi bo'lmoqchiman.",
            status="Yangi"
        ),
        models.Registration(
            full_name="Shahlo Nurmatova",
            phone="+998 93 111 22 33",
            age=24,
            course_id=saved_courses[4].id,
            course_title="UI/UX Design",
            comment="Grafikadan UI/UX ga o'tmoqchiman.",
            status="Bog'lanildi"
        ),
        models.Registration(
            full_name="Javohir Zokirov",
            phone="+998 97 555 66 77",
            age=19,
            course_id=saved_courses[5].id,
            course_title="Artificial Intelligence",
            comment="Matematik bilimlarim yaxshi, AI sohasida ishlamoqchiman.",
            status="Qabul qilindi"
        )
    ]
    for reg in sample_registrations:
        db.add(reg)

    # 8. Student Enrollment for Demo Student
    frontend_course = saved_courses[0]
    ai_course = saved_courses[5]

    enrollment1 = models.StudentEnrollment(
        student_id=student.id,
        course_id=frontend_course.id,
        progress=68,
        status="Faol"
    )
    enrollment2 = models.StudentEnrollment(
        student_id=student.id,
        course_id=ai_course.id,
        progress=35,
        status="Faol"
    )
    db.add(enrollment1)
    db.add(enrollment2)

    # 9. Schedules for Demo Student's Courses
    schedules = [
        models.LessonSchedule(
            course_id=frontend_course.id,
            title="React Hooks va State Management",
            day_of_week="Dushanba / Chorshanba / Juma",
            time_slot="18:30 - 20:30",
            mentor_name="Sardorbek Rahimov",
            room_or_link="Auditoriya #4 / Online Live Stream"
        ),
        models.LessonSchedule(
            course_id=ai_course.id,
            title="Neyron Tarmoqlari va PyTorch Amaliyoti",
            day_of_week="Seshanba / Payshanba / Shanba",
            time_slot="19:00 - 21:00",
            mentor_name="Farrux Qodirov",
            room_or_link="AI Lab #1 / Zoom Konferensiya"
        )
    ]
    for s in schedules:
        db.add(s)

    # 10. Assignments
    assign1 = models.Assignment(
        course_id=frontend_course.id,
        title="React SPA: Dashboard interfeysi yaratish",
        description="Tailwind CSS va Lucide Icons yordamida responsive admin dashboard sahifasini ishlab chiqing.",
        deadline="2 kun qoldi (22-Noyabr)",
        max_score=100
    )
    assign2 = models.Assignment(
        course_id=frontend_course.id,
        title="JavaScript Fetch API va Async/Await amaliyoti",
        description="JSONPlaceholder API bilan ishlaydigan xabarlar ro'yxati va qidiruv tizimini tuzing.",
        deadline="Bajarilgan",
        max_score=100
    )
    db.add(assign1)
    db.add(assign2)
    db.commit()
    db.refresh(assign1)
    db.refresh(assign2)

    # Student Submissions
    sub1 = models.StudentAssignment(
        student_id=student.id,
        assignment_id=assign2.id,
        submission_text="https://github.com/jasur-alimov/js-api-project",
        score=95,
        status="Tekshirildi"
    )
    sub2 = models.StudentAssignment(
        student_id=student.id,
        assignment_id=assign1.id,
        submission_text="https://github.com/jasur-alimov/react-dashboard-wip",
        score=None,
        status="Topshirildi"
    )
    db.add(sub1)
    db.add(sub2)

    # 11. Certificate
    cert = models.Certificate(
        student_id=student.id,
        course_name="Frontend Development Foundation",
        certificate_code="ITLIVE-2026-FD-8941",
        issue_date="15-Oktyabr, 2026",
        grade="A+ (A'lo)"
    )
    db.add(cert)

    db.commit()
    db.close()
    print("Baza muvaffaqiyatli ma'lumotlar bilan to'ldirildi!")

if __name__ == "__main__":
    seed_database()

