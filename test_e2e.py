import urllib.request
import json

def test(url, data=None):
    req = urllib.request.Request(
        url,
        data=json.dumps(data).encode('utf-8') if data else None,
        headers={'Content-Type': 'application/json'} if data else {}
    )
    with urllib.request.urlopen(req) as res:
        print(f"{url} -> Status: {res.status}")
        return json.loads(res.read().decode('utf-8'))

print("=== 1. Health check ===")
print(test("http://127.0.0.1:8000/api/health"))

print("\n=== 2. Stats ===")
print(test("http://127.0.0.1:8000/api/stats"))

print("\n=== 3. Courses ===")
courses = test("http://127.0.0.1:8000/api/courses")
print(f"Total courses: {len(courses)}")
for c in courses:
    print(f" - {c['title']} ({c['category']}, {c['duration']})")

print("\n=== 4. Mentors ===")
mentors = test("http://127.0.0.1:8000/api/mentors")
print(f"Total mentors: {len(mentors)}")
for m in mentors:
    print(f" - {m['full_name']} | {m['specialty']}")

print("\n=== 5. Projects ===")
projects = test("http://127.0.0.1:8000/api/projects")
print(f"Total projects: {len(projects)}")
for p in projects:
    print(f" - {p['title']} by {p['author_name']}")

print("\n=== 6. Admin Login ===")
admin_res = test("http://127.0.0.1:8000/api/auth/login", {
    "email": "admin@itlive.uz",
    "password": "admin123"
})
print("Admin Token:", admin_res["access_token"][:30] + "...", "User:", admin_res["user"]["full_name"])

print("\n=== 7. Student Login ===")
student_res = test("http://127.0.0.1:8000/api/auth/login", {
    "email": "student@itlive.uz",
    "password": "student123"
})
print("Student Token:", student_res["access_token"][:30] + "...", "User:", student_res["user"]["full_name"])

print("\n=== 8. Submit Registration ===")
reg_res = test("http://127.0.0.1:8000/api/registrations", {
    "full_name": "Botir Qodirov",
    "phone": "+998 90 999 88 77",
    "age": 22,
    "course_title": "Frontend Development",
    "comment": "Test ariza topshirildi"
})
print("Registration response:", reg_res)

print("\n=== 9. Frontend HTML Delivery ===")
with urllib.request.urlopen("http://127.0.0.1:8000/") as res:
    content = res.read().decode('utf-8')
    print("Frontend Status:", res.status, "HTML Title check:", "IT LIVE" in content)

print("\n>>> ALL TESTS PASSED SUCCESSFULLY! <<<")

