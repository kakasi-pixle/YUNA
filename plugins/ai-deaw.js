import  fetch from 'node-fetch'
let handler = async (m, { conn, args }) => {
  const cc = "> © شاورما ";
  let response = args.join(' ').split('|')
  if (!args[0]) throw 'ضيف نص  او صورة'
  let res = `https://shadowz-api.vercel.app/ai/text2img?text=
${response[0]}`
  conn.sendFile(m.chat, res, 'Shadow.jpg', `${cc}`, m, false)
}
handler.help = ['Shadow']
handler.tags = ['Shadow']
handler.command = /^(رسم|ارسم|ارسمي)$/i
export default handler