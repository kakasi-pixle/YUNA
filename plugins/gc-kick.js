let handler = async (m, { conn, participants, usedPrefix, command }) => {
let kickte = `[⚡]~ ما تنسي المنشن`
  
if (!m.mentionedJid[0] && !m.quoted) return m.reply(kickte, m.chat, { mentions: conn.parseMention(kickte)}) 
let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
let owr = m.chat.split`-`[0]
await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
m.reply(`تم الطرد بنجاح`) 
}

handler.help = ['S H A D O W']
handler.tags = ['S H A D O W']
handler.command = ['طرد'] 
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler