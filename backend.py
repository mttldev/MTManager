import click
import sys
import sanic
from sanic import response, Request

import mtmanger

app = sanic.Sanic(__name__)

mtmanger.setup(app)

@app.route("/")
async def index(_: Request):
    return await response.file("src/index.html")

@app.route("/<path>")
async def path_files(_: Request, path: str):
    return await response.file(f"src/{path}")

@app.post("/close")
async def close(_: Request):
    app.stop()
    return response.text("OK")

@click.command()
@click.option("--host", "-h", required=True)
@click.option("--port", "-p", required=True, type=int)
def main(host, port):
    app.run(host=host, port=port)

if __name__ == "__main__":
    print("Starting backend...")
    main()
