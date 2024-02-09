import os
import json
import glob
import subprocess
import typing
import platform

from bridge import Cog, Command

def get_renpy_cmd(sdk: str) -> list[str]:
    if platform.system() == "Windows":
        return [os.path.join(sdk, "lib/py3-windows-x86_64/python.exe"), os.path.join(sdk, "renpy.py")]
    elif platform.system() == "Linux":
        return ["bash", os.path.join(sdk, "renpy.sh")]
    else:
        raise NotImplementedError(f"Unsupported system: {platform.system()}")

class Commands(Cog):
    @Command
    async def get_game(self, path: str):
        if not os.path.isdir(path):
            raise Exception("Path not found")
        if os.path.isfile(os.path.join(path, "game/saves/navigation.json")):
            game = json.loads(open(os.path.join(path, "game/saves/navigation.json"), "r").read())
            return {"title": game['name'], "version": game['version'], "error": game['error']}
        raise Exception("Game not found")

    @Command
    async def fileexists(self, path: str):
        return os.path.exists(path)

    @Command
    async def remove_cache(self, path: str):
        if os.path.exists(path):
            for file in glob.glob(f"{path}/**/*.rpyc", recursive=True):
                os.remove(file)
            return True
        raise Exception("File not found")

    @Command
    async def start_game(self, sdk: str, path: str):
        if not os.path.isdir(path):
            raise Exception("Path not found")
        if not os.path.isfile(os.path.join(path, "game/saves/navigation.json")):
            raise Exception("Game not found")
        if not os.path.isdir(sdk):
            raise Exception("SDK not found")
        subprocess.Popen(get_renpy_cmd(sdk) + [path])

def setup(app):
    Commands(app)
