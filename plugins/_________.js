let handler = async (m, { conn }) => {
  if (global.conn.user.jid === conn.user.jid) {
  } else {
    await conn.reply(m.chat, '🚫 *تم فصل البوت الفرعي بنجاح* 🚫', m)
    conn.ws.close()
  }
}

handler.help = ['إيقاف']
handler.tags = ['سيربوت']
handler.command = ['إيقاف', 'إيقاف_البوت', 'إيقاف_البوت_الفرعي']
handler.owner = true

export default handler