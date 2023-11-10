# MTManager
いわゆるElectronとかTauriみたいな感じで、フロントエンドはいわゆるHTML系で動かして、バックエンドをPythonで動かすっていう暴挙をするために作られたCommandシステムを搭載したRen'Py ゲームマネージャーです。

## Electron要素は虚無のクセにPyctronとでも名づけようか...

適当な例でも載せておきますね

### バックエンド側
```py
import sanic

from ext_invoke import Cog, Invoke, Command

class TestCog(Cog):
    @Command
    async def greet(self, name: str) -> str:
        return Invoke(f"Hello, {name}!")

app = sanic.Sanic(__name__)

TestCog(app)

app.run("0.0.0.0", 8000)
```

### フロントエンド側
```js
import { invoke } from "./invoke.js";

(() => {
    const greet = await invoke("greet", "NattyanTV");
    console.log(greet); // "Hello, NattyanTV!"
})();
```

