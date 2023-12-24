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
    const json = await fetch_result.json()
    if (json.error) {
        throw new Error(json.error)
    }
    return json.value
}
