import { xpRange } from '../lib/levelling.js'

let handler = async (m, { conn, usedPrefix, command, args, text }) => {
  let user = global.db.data.users[m.sender]
  if (!user) {
    user = {
      exp: 0,
      level: 0,
      money: 0,
      joincount: 0,
      inventory: {
        swords: 0,
        coins: 0,
        diamonds: 0,
        boxes: 0,
        ducks: 0,
        animals: 0,
        chickens: 0,
        eggs: 0,
        health: 0,
        drinks: 0,
        armors: 0
      }
    }
    global.db.data.users[m.sender] = user
  }
  
  let { exp, level } = user
  let { min, xp, max } = xpRange(level, global.multiplier)
  
  let d = new Date(new Date() + 3600000)
  let locale = 'en'
  let week = d.toLocaleDateString(locale, { weekday: 'long' })
  let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
  let time = d.toLocaleTimeString(locale, { hour: 'numeric', minute: 'numeric', second: 'numeric' })
  
  let inv = user.inventory
  
  let textMessage = `
╭━━〔 *بنكك* 〕━━⬣
┃ ✪ *المستوى:* ${level}
┃ ✪ *الخبرة:* ${exp - min}/${xp}
┃ ✪ *العملات:* ${inv.coins}
┃ ✪ *سيوف:* ${inv.swords}
┃ ✪ *ألماس:* ${inv.diamonds}
┃ ✪ *صناديق:* ${inv.boxes}
┃ ✪ *بط:* ${inv.ducks}
┃ ✪ *حيوانات:* ${inv.animals}
┃ ✪ *فراخ:* ${inv.chickens}
┃ ✪ *بيض:* ${inv.eggs}
┃ ✪ *صحة:* ${inv.health}
┃ ✪ *مشروبات:* ${inv.drinks}
┃ ✪ *دروع:* ${inv.armors}
┃ ✪ *تاريخ:* ${week}, ${date}
┃ ✪ *وقت:* ${time}
╰━━━━━━━〔 *YUNA* 〕━━━━━━━⬣
`.trim()
  
  await conn.reply(m.chat, textMessage, m)
}

handler.help = ['bank']
handler.tags = ['xp','bank']
handler.command = /^(bank|بنك)$/i
handler.exp = 10

export default handler
