import { invoke } from "./invoke.js";

const init = async () => {
    const game = await invoke("get_game", { path: localStorage.getItem("gamepath") });
    document.getElementById("gametitle").innerHTML = game.title;
    document.getElementById("gameversion").innerHTML = game.version;
    document.getElementById("remove-cache").onclick = remove_cache;
    document.getElementById("start-game").onclick = start_game;
    document.getElementById("app").classList.remove("hidden");
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

const remove_cache = async () => {
    try {
        await invoke("remove_cache", { path: localStorage.getItem("gamepath") });
        alert("キャッシュを削除しました。");
    } catch (e) {
        alert("キャッシュの削除に失敗しました。\n" + e.message);
    }
}

const start_game = async () => {
    try {
        await invoke("start_game", { sdk: localStorage.getItem("renpysdk"), path: localStorage.getItem("gamepath") });
    } catch (e) {
        alert("ゲームの起動に失敗しました。\n" + e.message);
    }
}
