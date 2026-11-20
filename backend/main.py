import json
import os
import sys
from fastapi import FastAPI, Depends, HTTPException, status, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional

from database import engine, get_db, Base
import models
import schemas
from auth import (
    hash_password,
    verify_password,
    create_access_token,
    get_current_user,
    get_current_admin
)
from seed import seed_database

# Initialize database tables and run seed if needed
Base.metadata.create_all(bind=engine)
seed_database()

app = FastAPI(
    title="IT LIVE Education Platform API",
    description="Professional IT Education Academy API with Student & Admin Portals",
    version="1.0.0"
)

# Enable CORS for frontend development and production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------- HEALTH & STATS -----------------

@app.get("/api/health")
def health_check():
    return {"status": "ok", "platform": "IT LIVE", "version": "1.0.0"}

@app.get("/api/stats")
def get_stats(db: Session = Depends(get_db)):
    stats = db.query(models.AcademyStats).first()
    if not stats:
        stats = models.AcademyStats()
        db.add(stats)
        db.commit()
        db.refresh(stats)
    return {
        "students_count": stats.students_count,
        "mentors_count": stats.mentors_count,
        "courses_count": stats.courses_count,
        "projects_count": stats.projects_count,
        "employment_rate": stats.employment_rate
    }

# ----------------- AUTHENTICATION -----------------

@app.post("/api/auth/register", response_model=schemas.TokenResponse)
def register(user_in: schemas.UserRegister, db: Session = Depends(get_db)):
    existing = db.query(models.User).filter(models.User.email == user_in.email.lower()).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ushbu email manzil allaqachon ro'yxatdan o'tgan"
        )
    
    new_user = models.User(
        email=user_in.email.lower(),
        full_name=user_in.full_name,
        hashed_password=hash_password(user_in.password),
        role="student",
        phone=user_in.phone,
        avatar=f"https://api.dicebear.com/7.x/bottts/svg?seed={user_in.full_name}"
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Automatically enroll new student in the first available course as starting point
    default_course = db.query(models.Course).first()
    if default_course:
        enrollment = models.StudentEnrollment(
            student_id=new_user.id,
            course_id=default_course.id,
            progress=10,
            status="Faol"
        )
        db.add(enrollment)
        db.commit()

    token = create_access_token({"sub": str(new_user.id), "role": new_user.role})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": new_user.id,
            "email": new_user.email,
            "full_name": new_user.full_name,
            "role": new_user.role,
            "phone": new_user.phone,
            "avatar": new_user.avatar
        }
    }

@app.post("/api/auth/login", response_model=schemas.TokenResponse)
def login(login_data: schemas.UserLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == login_data.email.lower()).first()
    if not user or not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email yoki parol noto'g'ri kiritildi"
        )
    
    token = create_access_token({"sub": str(user.id), "role": user.role})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "full_name": user.full_name,
            "role": user.role,
            "phone": user.phone,
            "avatar": user.avatar
        }
    }

@app.get("/api/auth/me")
def get_me(current_user: models.User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "email": current_user.email,
        "full_name": current_user.full_name,
        "role": current_user.role,
        "phone": current_user.phone,
        "avatar": current_user.avatar,
        "bio": current_user.bio
    }

# ----------------- COURSES -----------------

@app.get("/api/courses")
def get_courses(category: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(models.Course).filter(models.Course.is_active == True)
    if category and category != "Barchasi":
        query = query.filter(models.Course.category == category)
    courses = query.order_by(models.Course.id.asc()).all()
    
    result = []
    for c in courses:
        syllabus = []
        if c.syllabus_json:
            try:
                syllabus = json.loads(c.syllabus_json)
            except:
                syllabus = []
        result.append({
            "id": c.id,
            "title": c.title,
            "slug": c.slug,
            "description": c.description,
            "full_description": c.full_description,
            "duration": c.duration,
            "level": c.level,
            "category": c.category,
            "price": c.price,
            "image": c.image,
            "rating": c.rating,
            "mentor_name": c.mentor_name,
            "syllabus": syllabus
        })
    return result

@app.get("/api/courses/{course_id}")
def get_course_detail(course_id: int, db: Session = Depends(get_db)):
    course = db.query(models.Course).filter(models.Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Kurs topilmadi")
    syllabus = []
    if course.syllabus_json:
        try:
            syllabus = json.loads(course.syllabus_json)
        except:
            syllabus = []
    return {
        "id": course.id,
        "title": course.title,
        "slug": course.slug,
        "description": course.description,
        "full_description": course.full_description,
        "duration": course.duration,
        "level": course.level,
        "category": course.category,
        "price": course.price,
        "image": course.image,
        "rating": course.rating,
        "mentor_name": course.mentor_name,
        "syllabus": syllabus
    }

# ----------------- MENTORS -----------------

@app.get("/api/mentors")
def get_mentors(db: Session = Depends(get_db)):
    mentors = db.query(models.Mentor).filter(models.Mentor.is_active == True).order_by(models.Mentor.id.asc()).all()
    return [
        {
            "id": m.id,
            "full_name": m.full_name,
            "specialty": m.specialty,
            "experience": m.experience,
            "bio": m.bio,
            "avatar": m.avatar,
            "telegram": m.telegram,
            "github": m.github,
            "linkedin": m.linkedin,
            "rating": m.rating,
            "students_count": m.students_count
        }
        for m in mentors
    ]

# ----------------- PROJECTS -----------------

@app.get("/api/projects")
def get_projects(db: Session = Depends(get_db)):
    projects = db.query(models.Project).order_by(models.Project.id.asc()).all()
    return [
        {
            "id": p.id,
            "title": p.title,
            "description": p.description,
            "author_name": p.author_name,
            "course_name": p.course_name,
            "image": p.image,
            "demo_url": p.demo_url,
            "github_url": p.github_url,
            "tech_stack": [t.strip() for t in p.tech_stack.split(",") if t.strip()]
        }
        for p in projects
    ]

# ----------------- REGISTRATION / LEAD ENROLLMENT -----------------

@app.post("/api/registrations")
def create_registration(reg_in: schemas.RegistrationCreate, db: Session = Depends(get_db)):
    new_reg = models.Registration(
        full_name=reg_in.full_name,
        phone=reg_in.phone,
        age=reg_in.age,
        course_id=reg_in.course_id,
        course_title=reg_in.course_title,
        comment=reg_in.comment,
        status="Yangi"
    )
    db.add(new_reg)
    db.commit()
    db.refresh(new_reg)
    return {
        "success": True,
        "message": "Arizangiz muvaffaqiyatli qabul qilindi! Tez orada mutaxassislarimiz siz bilan bog'lanishadi.",
        "registration_id": new_reg.id
    }

# ----------------- CONTACT MESSAGES -----------------

@app.post("/api/contact")
def create_contact_message(msg_in: schemas.ContactCreate, db: Session = Depends(get_db)):
    msg = models.ContactMessage(
        name=msg_in.name,
        phone_or_email=msg_in.phone_or_email,
        subject=msg_in.subject,
        message=msg_in.message
    )
    db.add(msg)
    db.commit()
    return {
        "success": True,
        "message": "Xabaringiz IT LIVE ma'muriyatiga yuborildi. Rahmat!"
    }

# ----------------- STUDENT CABINET -----------------

@app.get("/api/student/dashboard")
def get_student_dashboard(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    enrollments = db.query(models.StudentEnrollment).filter(models.StudentEnrollment.student_id == current_user.id).all()
    enrolled_courses = []
    course_ids = []
    for enr in enrollments:
        course_ids.append(enr.course_id)
        c = enr.course
        enrolled_courses.append({
            "enrollment_id": enr.id,
            "course_id": c.id,
            "title": c.title,
            "category": c.category,
            "mentor_name": c.mentor_name,
            "progress": enr.progress,
            "status": enr.status,
            "image": c.image,
            "duration": c.duration
        })

    # Schedules for student's courses
    schedules = []
    if course_ids:
        sched_items = db.query(models.LessonSchedule).filter(models.LessonSchedule.course_id.in_(course_ids)).all()
        for s in sched_items:
            schedules.append({
                "id": s.id,
                "title": s.title,
                "course_title": s.course.title if s.course else "IT Kurs",
                "day_of_week": s.day_of_week,
                "time_slot": s.time_slot,
                "mentor_name": s.mentor_name,
                "room_or_link": s.room_or_link
            })

    # Assignments
    assignments = []
    if course_ids:
        assign_items = db.query(models.Assignment).filter(models.Assignment.course_id.in_(course_ids)).all()
        for a in assign_items:
            sub = db.query(models.StudentAssignment).filter(
                models.StudentAssignment.student_id == current_user.id,
                models.StudentAssignment.assignment_id == a.id
            ).first()
            assignments.append({
                "id": a.id,
                "title": a.title,
                "description": a.description,
                "course_title": a.course.title if a.course else "",
                "deadline": a.deadline,
                "max_score": a.max_score,
                "status": sub.status if sub else "Kutilmoqda",
                "score": sub.score if sub else None,
                "submission_text": sub.submission_text if sub else None
            })

    # Certificates
    certificates = db.query(models.Certificate).filter(models.Certificate.student_id == current_user.id).all()
    cert_list = [
        {
            "id": cert.id,
            "course_name": cert.course_name,
            "certificate_code": cert.certificate_code,
            "issue_date": cert.issue_date,
            "grade": cert.grade,
            "student_name": current_user.full_name
        }
        for cert in certificates
    ]

    return {
        "student": {
            "id": current_user.id,
            "full_name": current_user.full_name,
            "email": current_user.email,
            "phone": current_user.phone,
            "avatar": current_user.avatar,
            "bio": current_user.bio
        },
        "metrics": {
            "active_courses_count": len(enrolled_courses),
            "completed_assignments": sum(1 for a in assignments if a["status"] in ["Topshirildi", "Tekshirildi"]),
            "average_score": 95 if assignments else 0,
            "attendance_rate": "98%"
        },
        "enrolled_courses": enrolled_courses,
        "schedules": schedules,
        "assignments": assignments,
        "certificates": cert_list
    }

@app.post("/api/student/assignments/submit")
def submit_assignment(
    submission: schemas.AssignmentSubmission,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    existing = db.query(models.StudentAssignment).filter(
        models.StudentAssignment.student_id == current_user.id,
        models.StudentAssignment.assignment_id == submission.assignment_id
    ).first()
    
    if existing:
        existing.submission_text = submission.submission_text
        existing.status = "Topshirildi"
    else:
        new_sub = models.StudentAssignment(
            student_id=current_user.id,
            assignment_id=submission.assignment_id,
            submission_text=submission.submission_text,
            status="Topshirildi"
        )
        db.add(new_sub)
    
    db.commit()
    return {"success": True, "message": "Vazifa ustoz tekshiruviga muvaffaqiyatli topshirildi!"}

@app.post("/api/student/enroll/{course_id}")
def enroll_course(
    course_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    existing = db.query(models.StudentEnrollment).filter(
        models.StudentEnrollment.student_id == current_user.id,
        models.StudentEnrollment.course_id == course_id
    ).first()
    if existing:
        return {"success": True, "message": "Siz bu kursga allaqachon a'zo bo'lgansiz"}
    
    enrollment = models.StudentEnrollment(
        student_id=current_user.id,
        course_id=course_id,
        progress=0,
        status="Faol"
    )
    db.add(enrollment)
    db.commit()
    return {"success": True, "message": "Kurs kabinetingizga qo'shildi!"}

# ----------------- ADMIN DASHBOARD & CRUD -----------------

@app.get("/api/admin/dashboard")
def get_admin_dashboard(admin: models.User = Depends(get_current_admin), db: Session = Depends(get_db)):
    students_count = db.query(models.User).filter(models.User.role == "student").count()
    courses_count = db.query(models.Course).count()
    mentors_count = db.query(models.Mentor).count()
    projects_count = db.query(models.Project).count()
    registrations_count = db.query(models.Registration).count()
    new_registrations = db.query(models.Registration).filter(models.Registration.status == "Yangi").count()
    messages_count = db.query(models.ContactMessage).count()

    stats = db.query(models.AcademyStats).first()

    return {
        "metrics": {
            "students_count": students_count,
            "courses_count": courses_count,
            "mentors_count": mentors_count,
            "projects_count": projects_count,
            "registrations_count": registrations_count,
            "new_registrations": new_registrations,
            "messages_count": messages_count
        },
        "academy_stats": {
            "students_count": stats.students_count if stats else "3,200+",
            "mentors_count": stats.mentors_count if stats else "25+",
            "courses_count": stats.courses_count if stats else "12+",
            "projects_count": stats.projects_count if stats else "180+",
            "employment_rate": stats.employment_rate if stats else "96%"
        }
    }

@app.put("/api/admin/stats")
def update_academy_stats(
    stats_in: schemas.AcademyStatsUpdate,
    admin: models.User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    stats = db.query(models.AcademyStats).first()
    if not stats:
        stats = models.AcademyStats()
        db.add(stats)
    
    if stats_in.students_count is not None:
        stats.students_count = stats_in.students_count
    if stats_in.mentors_count is not None:
        stats.mentors_count = stats_in.mentors_count
    if stats_in.courses_count is not None:
        stats.courses_count = stats_in.courses_count
    if stats_in.projects_count is not None:
        stats.projects_count = stats_in.projects_count
    if stats_in.employment_rate is not None:
        stats.employment_rate = stats_in.employment_rate

    db.commit()
    db.refresh(stats)
    return {"success": True, "message": "Akademiya statistikasi yangilandi", "stats": stats}

# Admin: Registrations
@app.get("/api/admin/registrations")
def get_all_registrations(admin: models.User = Depends(get_current_admin), db: Session = Depends(get_db)):
    regs = db.query(models.Registration).order_by(models.Registration.id.desc()).all()
    return [
        {
            "id": r.id,
            "full_name": r.full_name,
            "phone": r.phone,
            "age": r.age,
            "course_title": r.course_title,
            "comment": r.comment,
            "status": r.status,
            "created_at": r.created_at.strftime("%Y-%m-%d %H:%M") if r.created_at else ""
        }
        for r in regs
    ]

@app.put("/api/admin/registrations/{reg_id}/status")
def update_registration_status(
    reg_id: int,
    status_in: schemas.RegistrationStatusUpdate,
    admin: models.User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    reg = db.query(models.Registration).filter(models.Registration.id == reg_id).first()
    if not reg:
        raise HTTPException(status_code=404, detail="Ariza topilmadi")
    reg.status = status_in.status
    db.commit()
    return {"success": True, "message": "Ariza holati yangilandi"}

@app.delete("/api/admin/registrations/{reg_id}")
def delete_registration(reg_id: int, admin: models.User = Depends(get_current_admin), db: Session = Depends(get_db)):
    reg = db.query(models.Registration).filter(models.Registration.id == reg_id).first()
    if not reg:
        raise HTTPException(status_code=404, detail="Ariza topilmadi")
    db.delete(reg)
    db.commit()
    return {"success": True, "message": "Ariza o'chirildi"}

# Admin: Courses CRUD
@app.post("/api/admin/courses")
def create_course(course_in: schemas.CourseCreate, admin: models.User = Depends(get_current_admin), db: Session = Depends(get_db)):
    new_course = models.Course(**course_in.dict())
    db.add(new_course)
    db.commit()
    db.refresh(new_course)
    return {"success": True, "course": new_course}

@app.put("/api/admin/courses/{course_id}")
def update_course(
    course_id: int,
    course_in: schemas.CourseUpdate,
    admin: models.User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    course = db.query(models.Course).filter(models.Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Kurs topilmadi")
    
    update_data = course_in.dict(exclude_unset=True)
    for field, val in update_data.items():
        setattr(course, field, val)
    
    db.commit()
    db.refresh(course)
    return {"success": True, "course": course}

@app.delete("/api/admin/courses/{course_id}")
def delete_course(course_id: int, admin: models.User = Depends(get_current_admin), db: Session = Depends(get_db)):
    course = db.query(models.Course).filter(models.Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Kurs topilmadi")
    db.delete(course)
    db.commit()
    return {"success": True, "message": "Kurs o'chirildi"}

# Admin: Mentors CRUD
@app.post("/api/admin/mentors")
def create_mentor(mentor_in: schemas.MentorCreate, admin: models.User = Depends(get_current_admin), db: Session = Depends(get_db)):
    new_mentor = models.Mentor(**mentor_in.dict())
    db.add(new_mentor)
    db.commit()
    db.refresh(new_mentor)
    return {"success": True, "mentor": new_mentor}

@app.put("/api/admin/mentors/{mentor_id}")
def update_mentor(
    mentor_id: int,
    mentor_in: schemas.MentorUpdate,
    admin: models.User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    mentor = db.query(models.Mentor).filter(models.Mentor.id == mentor_id).first()
    if not mentor:
        raise HTTPException(status_code=404, detail="Ustoz topilmadi")
    
    update_data = mentor_in.dict(exclude_unset=True)
    for field, val in update_data.items():
        setattr(mentor, field, val)
    
    db.commit()
    db.refresh(mentor)
    return {"success": True, "mentor": mentor}

@app.delete("/api/admin/mentors/{mentor_id}")
def delete_mentor(mentor_id: int, admin: models.User = Depends(get_current_admin), db: Session = Depends(get_db)):
    mentor = db.query(models.Mentor).filter(models.Mentor.id == mentor_id).first()
    if not mentor:
        raise HTTPException(status_code=404, detail="Ustoz topilmadi")
    db.delete(mentor)
    db.commit()
    return {"success": True, "message": "Ustoz o'chirildi"}

# Admin: Projects CRUD
@app.post("/api/admin/projects")
def create_project(proj_in: schemas.ProjectCreate, admin: models.User = Depends(get_current_admin), db: Session = Depends(get_db)):
    new_proj = models.Project(**proj_in.dict())
    db.add(new_proj)
    db.commit()
    db.refresh(new_proj)
    return {"success": True, "project": new_proj}

@app.put("/api/admin/projects/{project_id}")
def update_project(
    project_id: int,
    proj_in: schemas.ProjectUpdate,
    admin: models.User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    proj = db.query(models.Project).filter(models.Project.id == project_id).first()
    if not proj:
        raise HTTPException(status_code=404, detail="Loyiha topilmadi")
    
    update_data = proj_in.dict(exclude_unset=True)
    for field, val in update_data.items():
        setattr(proj, field, val)
    
    db.commit()
    db.refresh(proj)
    return {"success": True, "project": proj}

@app.delete("/api/admin/projects/{project_id}")
def delete_project(project_id: int, admin: models.User = Depends(get_current_admin), db: Session = Depends(get_db)):
    proj = db.query(models.Project).filter(models.Project.id == project_id).first()
    if not proj:
        raise HTTPException(status_code=404, detail="Loyiha topilmadi")
    db.delete(proj)
    db.commit()
    return {"success": True, "message": "Loyiha o'chirildi"}

# Admin: Users & Messages
@app.get("/api/admin/users")
def get_admin_users(admin: models.User = Depends(get_current_admin), db: Session = Depends(get_db)):
    users = db.query(models.User).order_by(models.User.id.desc()).all()
    return [
        {
            "id": u.id,
            "full_name": u.full_name,
            "email": u.email,
            "role": u.role,
            "phone": u.phone,
            "enrolled_courses": [e.course.title for e in u.enrollments if e.course],
            "created_at": u.created_at.strftime("%Y-%m-%d %H:%M") if u.created_at else ""
        }
        for u in users
    ]

@app.get("/api/admin/messages")
def get_contact_messages(admin: models.User = Depends(get_current_admin), db: Session = Depends(get_db)):
    messages = db.query(models.ContactMessage).order_by(models.ContactMessage.id.desc()).all()
    return [
        {
            "id": m.id,
            "name": m.name,
            "phone_or_email": m.phone_or_email,
            "subject": m.subject,
            "message": m.message,
            "is_read": m.is_read,
            "created_at": m.created_at.strftime("%Y-%m-%d %H:%M") if m.created_at else ""
        }
        for m in messages
    ]

# ----------------- SERVE STATIC FRONTEND DIST -----------------
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

frontend_dist = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "frontend", "dist"))
if os.path.exists(frontend_dist):
    assets_dir = os.path.join(frontend_dist, "assets")
    if os.path.exists(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

    @app.get("/{full_path:path}")
    def serve_frontend(full_path: str):
        # Don't intercept API routes or docs
        if full_path.startswith("api") or full_path.startswith("docs") or full_path.startswith("openapi.json"):
            raise HTTPException(status_code=404, detail="API yo'li topilmadi")
        
        file_path = os.path.join(frontend_dist, full_path)
        if os.path.exists(file_path) and os.path.isfile(file_path):
            return FileResponse(file_path)
        return FileResponse(os.path.join(frontend_dist, "index.html"))

