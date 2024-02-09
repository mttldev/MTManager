import click
import webview
import sys

@click.command()
@click.option("--host", "-h", required=True)
@click.option("--port", "-p", required=True)
def main(host, port):
    webview.create_window("MTManager", url=f"http://{host}:{port}")
    webview.start(http_server=False, debug=True, private_mode=False)

if __name__ == "__main__":
    print("Starting frontend...")
    main()
