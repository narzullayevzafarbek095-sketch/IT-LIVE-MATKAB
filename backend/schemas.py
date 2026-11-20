from pydantic import BaseModel
from typing import Optional, List, Any
from datetime import datetime

# Auth Schemas
class UserRegister(BaseModel):
    email: str
    full_name: str
    password: str
    phone: Optional[str] = None

class UserLogin(BaseModel):
    email: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: dict

class UserOut(BaseModel):
    id: int
    email: str
    full_name: str
    role: str
    phone: Optional[str] = None
    avatar: Optional[str] = None
    bio: Optional[str] = None

# Course Schemas
class CourseCreate(BaseModel):
    title: str
    slug: str
    description: str
    full_description: Optional[str] = None
    duration: str
    level: str
    category: Optional[str] = "Dasturlash"
    price: Optional[str] = "Kelishilgan holda"
    image: Optional[str] = None
    rating: Optional[float] = 4.9
    mentor_name: Optional[str] = None
    syllabus_json: Optional[str] = None
    is_active: Optional[bool] = True

class CourseUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    description: Optional[str] = None
    full_description: Optional[str] = None
    duration: Optional[str] = None
    level: Optional[str] = None
    category: Optional[str] = None
    price: Optional[str] = None
    image: Optional[str] = None
    rating: Optional[float] = None
    mentor_name: Optional[str] = None
    syllabus_json: Optional[str] = None
    is_active: Optional[bool] = None

# Mentor Schemas
class MentorCreate(BaseModel):
    full_name: str
    specialty: str
    experience: str
    bio: Optional[str] = None
    avatar: Optional[str] = None
    telegram: Optional[str] = None
    github: Optional[str] = None
    linkedin: Optional[str] = None
    rating: Optional[float] = 4.9
    students_count: Optional[int] = 150
    is_active: Optional[bool] = True

class MentorUpdate(BaseModel):
    full_name: Optional[str] = None
    specialty: Optional[str] = None
    experience: Optional[str] = None
    bio: Optional[str] = None
    avatar: Optional[str] = None
    telegram: Optional[str] = None
    github: Optional[str] = None
    linkedin: Optional[str] = None
    rating: Optional[float] = None
    students_count: Optional[int] = None
    is_active: Optional[bool] = None

# Project Schemas
class ProjectCreate(BaseModel):
    title: str
    description: str
    author_name: str
    course_name: str
    image: Optional[str] = None
    demo_url: Optional[str] = None
    github_url: Optional[str] = None
    tech_stack: str

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    author_name: Optional[str] = None
    course_name: Optional[str] = None
    image: Optional[str] = None
    demo_url: Optional[str] = None
    github_url: Optional[str] = None
    tech_stack: Optional[str] = None

# Registration / Application Schemas
class RegistrationCreate(BaseModel):
    full_name: str
    phone: str
    age: Optional[int] = None
    course_id: Optional[int] = None
    course_title: str
    comment: Optional[str] = None

class RegistrationStatusUpdate(BaseModel):
    status: str

# Contact Message Schemas
class ContactCreate(BaseModel):
    name: str
    phone_or_email: str
    subject: Optional[str] = "Umumiy murojaat"
    message: str

# Academy Stats Schema
class AcademyStatsUpdate(BaseModel):
    students_count: Optional[str] = None
    mentors_count: Optional[str] = None
    courses_count: Optional[str] = None
    projects_count: Optional[str] = None
    employment_rate: Optional[str] = None

# Student Portal Action Schemas
class AssignmentSubmission(BaseModel):
    assignment_id: int
    submission_text: str
