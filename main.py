import frontend
import backend

import multiprocessing

def main():
    backend_process = multiprocessing.Process(target=backend.main)
    frontend_process = multiprocessing.Process(target=frontend.main)

    backend_process.start()
    frontend_process.start()

    frontend_process.join()
    backend_process.kill()

if __name__ == "__main__":
    main()
