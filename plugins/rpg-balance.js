let handler = async (m, {usedPrefix}) => {	
let who
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
else who = m.sender
let name = conn.getName(who) 
let d = `╭━〔 🔖 *الماسك* 〕━⬣
┃ *معلوماتك*
┃ ${name}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ *${global.db.data.users[who].limit} الماس* 💎
╰━━━━〔 *𓃠 ${vs}* 〕━━━⬣\n
*الشراء مقابل اكسبي📜*
${usedPrefix}buy *شراء*
${usedPrefix}buyall *قريبا*

*COMPRAR DIAMANTES CON GATACOINS*
${usedPrefix}buy2 *cantidad*
${usedPrefix}buyall2 *cantidad*`
conn.sendButton(m.chat, d, wm, null, [
['قائمه الاوامر⚡', '.اوامر'],
['لفلك💫', '.لفل']
], null, null, m)
/*await conn.sendHydrated(m.chat, d, wm, null, md, '𝙂𝙖𝙩𝙖𝘽𝙤𝙩-𝙈𝘿', null, null, [
['قائمه الاوامر⚡', '.اوامر'],
['لفلك💫', '.لفل']
], m,)*/
}
handler.help = ['bal']
handler.tags = ['xp']
handler.command = ['bal', 'diamantes', 'الماسي', 'الماس'] 
export default handler
