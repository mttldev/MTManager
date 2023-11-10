import os
import json

from ext_invoke import Cog, Invoke, Command

class Commands(Cog):
    @Command
    async def get_game(self, path: str):
        if os.path.isdir(path) == False:
            return Invoke(None, "Game not found")
        if os.path.isfile(os.path.join(path, "game/saves/navigation.json")):
            game = json.loads(open(os.path.join(path, "game/saves/navigation.json"), "r").read())
            return Invoke({"title": game['name'], "version": game['version'], "error": game['error']})
        return Invoke(None, "Game not compiled")

    @Command
    async def fileexists(self, path: str):
        if os.path.exists(path):
            return Invoke(True)
        return Invoke(False)
