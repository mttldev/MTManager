import webview

PORT = 8000

window = webview.create_window("Sample GUI App", url=f"http://localhost:{PORT}")

def main():
    webview.start(http_server=False, debug=True)

if __name__ == "__main__":
    print("Starting frontend...")
    main()
