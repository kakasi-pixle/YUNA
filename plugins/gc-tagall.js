let handler = async (m, { conn, text, participants, isAdmin, isOwner, groupMetadata }) => {
  let users = participants.map(u => u.id).filter(v => v !== conn.user.jid)
  m.reply(
    `⋅‏ ┈──── • ◞☆◜ • ────┈ ⋅\n*●🍷 جـروب  : *${groupMetadata.subject}*\n*●🍷 الاعـضـاء  : *${participants.length}*${text ? `\n*●🍷 الـرسـالـه  : ${text}\n` : ''}\n⋅‏ ┈──── • ◞☆◜ • ────┈ ⋅\n**●🍷 الاعـضـاء :⇣*\n⋅‏ ┈──── • ◞☆◜ • ────┈ ⋅\n` +
      users.map(v => '*●🍷 @' + v.replace(/@.+/, '')).join`\n` +
      '\n⋅‏ ┈──── • ◞☆◜ • ────┈ ⋅',
    null,
    {
      mentions: users,
    }
  )
}

handler.help = ['tagall']
handler.tags = ['group']
handler.command = ['منشن']
handler.admin = true
handler.group = true

export default handler