'use strict'

/**
 * バックエンドのコマンドを実行します。
 * @param {string} command 実行するコマンド(エンドポイント)
 * @param {object} args 引数
 */
export const invoke = async (command, args) => {
    const fetch_result = await fetch(`/api/${command}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(args)
    })
    if (fetch_result.status === 404) {
        throw new Error("Command not found")
    }
    const json = await fetch_result.json()
    if (json.error) {
        throw new Error(json.error)
    }
    return json.value
}

/**
 * バックエンドに要求して、ファイル選択ダイアログを開きます。
 * @param {string} title ダイアログのタイトル
 * @param {[string][][]} filetypes ファイルの種類
 * @param {string} initialdir 初期ディレクトリ
 * @returns {string} 選択されたファイルのパス
 */
export const openFileDialog = async (title, filetypes, initialdir) => {
    return await invoke("open_file_dialog", { title, filetypes, initialdir })
}

/**
 * バックエンドに要求して、ディレクトリ選択ダイアログを開きます。
 * @param {string} title ダイアログのタイトル
 * @param {string} initialdir 初期ディレクトリ
 * @param {boolean} mustexist 存在するディレクトリのみを選択可能にするか
 * @returns {string} 選択されたディレクトリのパス
 */
export const openDirectoryDialog = async (title, initialdir, mustexist) => {
    return await invoke("open_directory_dialog", { title, initialdir, mustexist })
}
