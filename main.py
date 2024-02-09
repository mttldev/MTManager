import requests
import subprocess
import sys

def main():
    HOST = "127.0.0.1"
    PORT = "8000"
    python_path = sys.executable
    backend_process = subprocess.Popen([python_path, "backend.py", "-h", HOST, "-p", PORT])
    frontend_process = subprocess.Popen([python_path, "frontend.py", "-h", HOST, "-p", PORT])

    frontend_process.wait()
    requests.post(f"http://{HOST}:{PORT}/close")
    backend_process.kill()
    if backend_process.poll() is None:
        backend_process.wait()

if __name__ == "__main__":
    main()
