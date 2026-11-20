import datetime
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey, Float
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    full_name = Column(String(255), nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(String(50), default="student")  # 'admin' or 'student'
    phone = Column(String(50), nullable=True)
    avatar = Column(String(500), nullable=True)
    bio = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    enrollments = relationship("StudentEnrollment", back_populates="student", cascade="all, delete-orphan")
    assignments = relationship("StudentAssignment", back_populates="student", cascade="all, delete-orphan")
    certificates = relationship("Certificate", back_populates="student", cascade="all, delete-orphan")


class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    description = Column(Text, nullable=False)
    full_description = Column(Text, nullable=True)
    duration = Column(String(100), nullable=False)  # e.g., "7 oy", "5 oy"
    level = Column(String(100), nullable=False)     # "Boshlang'ich", "O'rta", "Katta"
    category = Column(String(100), default="Dasturlash") # "Dasturlash", "Dizayn", "Sun'iy intellekt"
    price = Column(String(100), default="Kelishilgan holda")
    image = Column(String(500), nullable=True)
    rating = Column(Float, default=4.9)
    mentor_name = Column(String(255), nullable=True)
    syllabus_json = Column(Text, nullable=True)     # JSON string of modules & lessons
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    enrollments = relationship("StudentEnrollment", back_populates="course")
    schedules = relationship("LessonSchedule", back_populates="course", cascade="all, delete-orphan")
    assignments = relationship("Assignment", back_populates="course", cascade="all, delete-orphan")


class Mentor(Base):
    __tablename__ = "mentors"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(255), nullable=False)
    specialty = Column(String(255), nullable=False)
    experience = Column(String(100), nullable=False)  # e.g., "5+ yil tajriba"
    bio = Column(Text, nullable=True)
    avatar = Column(String(500), nullable=True)
    telegram = Column(String(255), nullable=True)
    github = Column(String(255), nullable=True)
    linkedin = Column(String(255), nullable=True)
    rating = Column(Float, default=4.9)
    students_count = Column(Integer, default=150)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    author_name = Column(String(255), nullable=False)
    course_name = Column(String(255), nullable=False)
    image = Column(String(500), nullable=True)
    demo_url = Column(String(500), nullable=True)
    github_url = Column(String(500), nullable=True)
    tech_stack = Column(String(255), nullable=False)  # e.g., "React, Tailwind, Node.js"
    created_at = Column(DateTime, default=datetime.datetime.utcnow)


class Registration(Base):
    __tablename__ = "registrations"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=False)
    age = Column(Integer, nullable=True)
    course_id = Column(Integer, nullable=True)
    course_title = Column(String(255), nullable=False)
    comment = Column(Text, nullable=True)
    status = Column(String(50), default="Yangi")  # "Yangi", "Bog'lanildi", "Qabul qilindi", "Bekor qilindi"
    created_at = Column(DateTime, default=datetime.datetime.utcnow)


class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    phone_or_email = Column(String(255), nullable=False)
    subject = Column(String(255), default="Umumiy murojaat")
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)


class AcademyStats(Base):
    __tablename__ = "academy_stats"

    id = Column(Integer, primary_key=True, index=True)
    students_count = Column(String(50), default="3,200+")
    mentors_count = Column(String(50), default="25+")
    courses_count = Column(String(50), default="12+")
    projects_count = Column(String(50), default="180+")
    employment_rate = Column(String(50), default="96%")
    updated_at = Column(DateTime, default=datetime.datetime.utcnow)


class StudentEnrollment(Base):
    __tablename__ = "student_enrollments"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("users.id"))
    course_id = Column(Integer, ForeignKey("courses.id"))
    progress = Column(Integer, default=25)  # 0 to 100%
    status = Column(String(50), default="Faol")  # "Faol", "Tugallangan"
    enrolled_at = Column(DateTime, default=datetime.datetime.utcnow)

    student = relationship("User", back_populates="enrollments")
    course = relationship("Course", back_populates="enrollments")


class LessonSchedule(Base):
    __tablename__ = "lesson_schedules"

    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("courses.id"))
    title = Column(String(255), nullable=False)
    day_of_week = Column(String(100), nullable=False)  # e.g., "Dushanba / Chorshanba / Juma"
    time_slot = Column(String(100), nullable=False)    # e.g., "18:00 - 20:00"
    mentor_name = Column(String(255), nullable=True)
    room_or_link = Column(String(255), default="Lab-1 / Online Zoom")

    course = relationship("Course", back_populates="schedules")


class Assignment(Base):
    __tablename__ = "assignments"

    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("courses.id"))
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    deadline = Column(String(100), nullable=False)
    max_score = Column(Integer, default=100)

    course = relationship("Course", back_populates="assignments")
    submissions = relationship("StudentAssignment", back_populates="assignment")


class StudentAssignment(Base):
    __tablename__ = "student_assignments"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("users.id"))
    assignment_id = Column(Integer, ForeignKey("assignments.id"))
    submission_text = Column(Text, nullable=True)
    score = Column(Integer, nullable=True)
    status = Column(String(50), default="Topshirildi")  # "Kutilmoqda", "Topshirildi", "Tekshirildi"
    submitted_at = Column(DateTime, default=datetime.datetime.utcnow)

    student = relationship("User", back_populates="assignments")
    assignment = relationship("Assignment", back_populates="submissions")


class Certificate(Base):
    __tablename__ = "certificates"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("users.id"))
    course_name = Column(String(255), nullable=False)
    certificate_code = Column(String(100), unique=True, nullable=False)
    issue_date = Column(String(100), nullable=False)
    grade = Column(String(50), default="A+")

    student = relationship("User", back_populates="certificates")

