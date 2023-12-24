import sanic
from sanic import Request
from sanic.response import json

class Cog:
    __registed = []

    def __init__(self, app: sanic.Sanic) -> None:
        for command in dir(self):
            if command.startswith("_") or command.endswith("__"):
                continue
            app.add_route(getattr(self, command), f"/api/{command}", methods=["POST"], name=command)
            self.__registed.append(command)

def Invoke(value, error = None):
    return json({"error": error, "value": value})

def Command(func):
    async def wrapper(cls: Cog, request: Request, *args, **kwargs):
        req = {}
        if request.json is not None:
            req = request.json
        return await func(cls, **req)
    return wrapper
