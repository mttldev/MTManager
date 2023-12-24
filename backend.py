import commands
import sanic
from sanic import response, Request

PORT = 8000

app = sanic.Sanic(__name__)

commands.Commands(app=app)

@app.route("/")
async def index(_: Request):
    return await response.file("src/index.html")

@app.route("/<path>")
async def path_files(_: Request, path: str):
    return await response.file(f"src/{path}")

def main():
    app.run(host="0.0.0.0", port=PORT)

if __name__ == "__main__":
    print("Starting backend...")
    main()
