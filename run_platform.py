import os
import sys
import subprocess

def main():
    print("=" * 65)
    print("   IT LIVE — PROFESSIONAL IT EDUCATION PLATFORM")
    print("=" * 65)
    
    base_dir = os.path.dirname(os.path.abspath(__file__))
    backend_dir = os.path.join(base_dir, "backend")
    
    # Python executable in venv
    venv_python = os.path.join(base_dir, "backend_venv", "Scripts", "python.exe")
    if not os.path.exists(venv_python):
        venv_python = sys.executable

    print(f"[+] Python muhiti: {venv_python}")
    print(f"[+] Backend katalogi: {backend_dir}")

    # Seed database
    print("[*] Ma'lumotlar bazasi tekshirilmoqda va to'ldirilmoqda...")
    subprocess.run([venv_python, "seed.py"], cwd=backend_dir)

    print("\n" + "=" * 65)
    print("🚀 IT LIVE PLATFORMASI ISHGA TUSHMOQDA:")
    print("   🌐 Asosiy Web Sahifa: http://localhost:8000")
    print("   📚 API Hujjatlari (Swagger): http://localhost:8000/docs")
    print("   👑 Admin Hisobi: admin@itlive.uz / admin123")
    print("   🎓 Talaba Hisobi: student@itlive.uz / student123")
    print("=" * 65 + "\n")

    # Start uvicorn
    import uvicorn
    sys.path.insert(0, backend_dir)
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=False, app_dir=backend_dir)

if __name__ == "__main__":
    main()

