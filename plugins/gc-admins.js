let handler = async (m, { conn, participants, groupMetadata, args }) => {
const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './src/avatar_contact.png'
const groupAdmins = participants.filter(p => p.admin)
const listAdmin = groupAdmins.map((v, i) => `@${v.id.split('@')[0]}`).join('\n⌯ ')
const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net'

let text = `
⌯ *${groupMetadata.subject}*

┌━━━ *المشرفين* ✦
⌯ ${listAdmin}
└━━━━⊰⚡⊱━━━━⊰
`.trim()
conn.sendFile(m.chat, pp, 'admin.png', text, m, false, { mentions: [...groupAdmins.map(v => v.id), owner] })
}
handler.help = ['S H A D O W']
handler.tags = ['S H A D O W']
handler.command = ['الادمن', 'المشرفين'] 
handler.group = true
export default handler