import sanic
from sanic import response, Request

import commands

app = sanic.Sanic(__name__)

commands.Commands(app=app)

@app.route("/")
async def index(_: Request):
    return await response.file("src/index.html")

@app.route("/<path>")
async def path_files(_: Request, path: str):
    return await response.file(f"src/{path}")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=35416)
