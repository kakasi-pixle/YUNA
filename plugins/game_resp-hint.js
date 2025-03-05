let handler = async (m, { conn }) => {
  conn.tebakbendera = conn.tebakbendera ? conn.tebakbendera : {}
  let id = m.chat
  if (!(id in conn.tebakbendera)) throw false
  let json = conn.tebakbendera[id][1]
  conn.reply(m.chat, '```' + json.name.replace(/[AاIيUبEلOaثiىuشeيoصpك]/ig, '_') + '```', m)
}
handler.command = /^تلميح$/i



export default handler