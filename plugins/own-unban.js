let handler = async (m, { conn, text, usedPrefix, command }) => {
   let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
    else who = m.chat
    let user = global.db.data.users[who]
    if (!who) throw `[❣️]⌯ لا تنسي المنشن`
    let users = global.db.data.users
    users[who].banned = false
    conn.reply(m.chat, `
[❣️]⌯ رفـــــع الــــبـــان

───────────
⌯ @${who.split`@`[0]} تم رفع البان بنجاح`, m, { mentions: [who] })
}
handler.help = ['S H A D O W']
handler.tags = ['S H A D O W']
handler.command = /^انبان|رفع_البان|رفع-البان|رفع-بان$/i
handler.rowner = true

export default handler