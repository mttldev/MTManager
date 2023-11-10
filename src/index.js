import { invoke } from "./invoke.js";

const init = async () => {
    const game = await invoke("get_game", { path: localStorage.getItem("gamepath") });
    document.getElementById("gametitle").innerHTML = game.title;
    document.getElementById("gameversion").innerHTML = game.version;
}

window.onload = async () => {
    if (localStorage.getItem("renpysdk") === null) {
        while (true) {
            const sdk = prompt("Ren'Py SDKのパスを指定してください。");
            const result = await invoke("fileexists", { path: sdk });
            console.log(result)
            if (result) {
                localStorage.setItem("renpysdk", sdk);
                break;
            } else {
                alert("指定されたパスにRen'Py SDKが見つかりませんでした。");
            }
        }
    }
    if (localStorage.getItem("gamepath") === null) {
        while (true) {
            const gamepath = prompt("ゲームのパスを指定してください。");
            try {
                await invoke("get_game", { path: gamepath });
            } catch (e) {
                if (e.message === "Game not found") {
                    alert("指定されたパスにゲームが見つかりませんでした。");
                    continue;
                } else if (e.message === "Game not compiled") {
                    localStorage.setItem("gamepath", gamepath);
                    break
                } else {
                    throw e;
                }
            }
            localStorage.setItem("gamepath", gamepath);
            break;
        }
    }
    await init();
}
