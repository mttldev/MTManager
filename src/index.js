import {
    invoke,
    openDirectoryDialog
} from "./invoke.js";

const init = async () => {
    const game = await invoke("get_game", { path: localStorage.getItem("gamepath") });
    document.getElementById("gametitle").innerHTML = game.title;
    document.getElementById("gameversion").innerHTML = game.version;
    document.getElementById("start-game").onclick = startGame;
    document.getElementById("remove-cache").onclick = removeCache;
    document.getElementById("change-game").onclick = changeGame;
    document.getElementById("change-sdk").onclick = changeSdk;
    document.getElementById("app").classList.remove("hidden");
}

window.onload = async () => {
    if (localStorage.getItem("renpysdk") === null) {
        changeSdk()
    }
    if (localStorage.getItem("gamepath") === null) {
        changeGame();
    }
    await init();
}

const changeSdk = async () => {
    while (true) {
        const sdk = await openDirectoryDialog("Ren'Py SDKのパスを指定してください。");
        const result = await invoke("fileexists", { path: sdk });
        console.log(result)
        if (result) {
            localStorage.setItem("renpysdk", sdk);
            alert("SDKを変更しました。");
            break;
        } else {
            alert("指定されたパスにRen'Py SDKが見つかりませんでした。");
        }
    }
}

const changeGame = async () => {
    while (true) {
        const gamepath = await openDirectoryDialog("ゲームのパスを指定してください。");
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
        alert("ゲームを変更しました。");
        break;
    }
}

const removeCache = async () => {
    try {
        await invoke("remove_cache", { path: localStorage.getItem("gamepath") });
        alert("キャッシュを削除しました。");
    } catch (e) {
        alert("キャッシュの削除に失敗しました。\n" + e.message);
    }
}

const startGame = async () => {
    try {
        await invoke("start_game", { sdk: localStorage.getItem("renpysdk"), path: localStorage.getItem("gamepath") });
    } catch (e) {
        alert("ゲームの起動に失敗しました。\n" + e.message);
    }
}
