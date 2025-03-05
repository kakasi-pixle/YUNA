import fetch from 'node-fetch'
let timeout = 80000
let poin = 10000
let handler = async (m, { conn, command, usedPrefix }) => {
    conn.tebakbendera = conn.tebakbendera ? conn.tebakbendera : {}
    let id = m.chat
    if (id in conn.tebakbendera) {
        conn.reply(m.chat, '[❣️] ⌯ هناك اسئلة لم يتم الاجابة عنها', conn.tebakbendera[id][0])
        throw false
    }
    let src = await (await fetch('https://raw.githubusercontent.com/Darkshadow201293/ShadowMedia/main/games/a7zer.json')).json()
  let json = src[Math.floor(Math.random() * src.length)]
    let caption = `
الــوقــت ⟣ ⌊${(timeout / 1000).toFixed(2)}⌉
الــجـائـزه ⟣ ⌊${poin}⌉
> استخدم ${usedPrefix} تلميح للجواب`.trim()
    conn.tebakbendera[id] = [
        await conn.sendFile(m.chat, json.img, 'shadow.jpg', caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.tebakbendera[id]) conn.reply(m.chat, `  الوقت انتهي\n الاجابة: *${json.name}*`, conn.tebakbendera[id][0])
            delete conn.tebakbendera[id]
        }, timeout)
    ]
}
handler.help = ['Shadow']
handler.tags = ['Shadow']
handler.command = /^احزر/i

export default handler