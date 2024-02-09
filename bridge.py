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

class Invoke:
    def __init__(self, value, error = None) -> None:
        self.value = value
        self.error = error

    def serialize(self):
        return json({"error": self.error, "value": self.value})

def Command(func):
    async def wrapper(cls: Cog, request: Request, *args, **kwargs):
        req = {}
        if request.json is not None:
            req = request.json
        try:
            result = await func(cls, **req)
            if isinstance(result, Invoke):
                return result.serialize()
            return Invoke(result).serialize()
        except Exception as e:
            return Invoke(None, str(e)).serialize()
    return wrapper
