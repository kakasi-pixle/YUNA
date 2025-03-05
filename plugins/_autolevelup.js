import { canLevelUp, xpRange } from '../lib/levelling.js'
import { levelup } from '../lib/canvas.js'
import '../plugins/_content.js'

let handler = m => m
handler.before = async function (m, { conn, usedPrefix }) {
	
if (!db.data.chats[m.chat].autolevelup) return
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let ppch = await conn.profilePictureUrl(who, 'image').catch(_ => gataMenu)
let mentionedJid = [who]
let username = conn.getName(who)
let userName = m.pushName || 'Anónimo'
	
let user = global.db.data.users[m.sender]
let chat = global.db.data.chats[m.chat]
if (m.chat === "120363336642332098@newsletter") return; 
if (m.fromMe) return
if (!chat.autolevelup) return !0

let level = user.level
let before = user.level * 1
while (canLevelUp(user.level, user.exp, global.multiplier)) 
user.level++
if (before !== user.level) {
let currentRole = Object.entries(roles).sort((a, b) => b[1] - a[1]) .find(([, minLevel]) => level + 1 >= minLevel)[0]
let nextRole = Object.entries(roles).sort((a, b) => a[1] - b[1]) .find(([, minLevel]) => level + 2 < minLevel)[0]

//if (user.role != currentRole && level >= 1) {
if (level >= 1) {
user.role = currentRole
let chtxt = `✨ ¡Felicidades *${userName}*, por tu nuevo rango!\n\n\`Nuevo Rango:\`\n${currentRole}`
if (nextRole) {
chtxt += `\n\n> Próximo rango ${nextRole}, en el *nivel ${roles[nextRole]}*. ¡Sigue así!`
}

//if (conn.user.jid === global.conn.user.jid) {	
await global.conn.sendMessage(ch.ch1, { text: chtxt, contextInfo: {
externalAdReply: {
title: "【 🔔 Notificación General 🔔 】",
body: '😎 ¡Alguien obtuvo un nuevo Rango!',
thumbnailUrl: ppch,
sourceUrl: accountsgb,
mediaType: 1,
showAdAttribution: false,
renderLargerThumbnail: false
}}}, { quoted: null }) 	
}
	
conn.reply(m.chat, `*╭━⊰ ${username} ⊱━დ*
*┃ ${lenguajeGB.smsAutoLv2()} ${before}*
*┃ ${lenguajeGB.smsAutoLv3()} ${user.level}*
*┃ ${lenguajeGB.smsAutoLv4()}* ${user.role}
*┃ ${lenguajeGB.smsAutoLv5()} ${new Date().toLocaleString('id-ID')}*
*╰━⊰ ${lenguajeGB.smsAutoLv1()} ⊱━━დ*

*_${lenguajeGB.smsAutoLv6()}_*`, fkontak, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: gt, body: ' 😻 𝗦𝘂𝗽𝗲𝗿 𝗚𝗮𝘁𝗮𝗕𝗼𝘁-𝗠𝗗 - 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 ', previewType: 0, thumbnail: gataImg, sourceUrl: accountsgb }}})
	 
let especial = ['limit', 'diamond', 'joincount', 'emerald', 'berlian', 'kyubi', 'gold', 'money', 'tiketcoin', 'stamina'].getRandom()
let especial2 = ['potion', 'aqua', 'trash', 'wood', 'rock', 'batu', 'string', 'iron', 'coal', 'botol', 'kaleng', 'kardus'].getRandom()
let especial3 = ['eleksirb', 'emasbatang', 'emasbiasa', 'rubah', 'sampah', 'serigala', 'kayu', 'sword', 'umpan', 'healtmonster', 'emas', 'pancingan', 'pancing'].getRandom()
let especial4 = ['common', 'uncoommon', 'mythic', 'pet', 'gardenboxs', 'legendary'].getRandom()

let especialCant = Math.floor(Math.random() * (9 - 6 + 1)) + 6 // Intervalo: 6 a 9
let especialCant2 = Math.floor(Math.random() * (10 - 6 + 1)) + 6 // Intervalo: 6 a 10
let especialCant3 = Math.floor(Math.random() * (10 - 6 + 1)) + 6 // Intervalo: 6 a 10
let especialCant4 = Math.floor(Math.random() * (3 - 2 + 1)) + 2 // Intervalo: 2 a 3

let normal = ['potion', 'aqua', 'trash', 'wood', 'rock', 'batu', 'string', 'iron', 'coal', 'botol', 'kaleng', 'kardus'].getRandom()
let normal2 = ['petFood', 'makanancentaur', 'makanangriffin', 'makanankyubi', 'makanannaga', 'makananpet', 'makananphonix'  ].getRandom()
let normal3 = ['anggur', 'apel', 'jeruk', 'mangga', 'pisang'].getRandom()

let normalCant = [1, 3, 3, 3, 4, 4, 2, 2, 4, 4, 4, 4, 1].getRandom() 
let normalCant2 = [1, 3, 2, 2, 4, 4, 2, 2, 4, 4, 5, 5, 1].getRandom() 
let normalCant3 = [1, 3, 3, 3, 4, 4, 2, 2, 4, 4, 4, 4, 1].getRandom() 

if (level >= 1) {
let chtxt = `👤 *Usuario:* ${userName}\n🆙 *Nivel anterior:* ${before}\n🆕 *Nivel actual:* ${level + 1}\n👾 *Rango:* ${user.role}\n🐈 *Bot:* ${gt}${(level + 1) % 5 === 0 ? `\n\n💰 *Recompensa por alacanzar el nivel ${level + 1}:*
🎁 *Bono:* \`X${Math.floor(((level + 1) - 5) / 10) + 1}\`
- *${especialCant * (Math.floor(((level + 1) - 5) / 10) + 1)} ${global.rpgshop.emoticon(especial)}*
- *${especialCant2 * (Math.floor(((level + 1) - 5) / 10) + 1)} ${global.rpgshop.emoticon(especial2)}*
- *${especialCant3 * (Math.floor(((level + 1) - 5) / 10) + 1)} ${global.rpgshop.emoticon(especial3)}*
- *${especialCant4 * (Math.floor(((level + 1) - 5) / 10) + 1)} ${global.rpgshop.emoticon(especial4)}*

> 👀 Siguiente recompensa en el *nivel ${level + 6}*` : ''}`.trim()
await global.conn.sendMessage(ch.ch1, { text: chtxt, contextInfo: {
externalAdReply: {
title: "【 🔔 إشعار عام 🔔 】",
body: '⭐ شخص ما ارتفع إلى مستوى!',
thumbnailUrl: ppch,
sourceUrl: accountsgb,
mediaType: 1,
showAdAttribution: false,
renderLargerThumbnail: false
}}}, { quoted: null }) 
}

if (user.level == 5){
conn.reply(m.chat, `*${lenguajeGB.smsAutoLv7()} 5!!* 🏆
𓃠 *${especialCant * 1} ${global.rpgshop.emoticon(especial)}*
𓃠 *${especialCant2 * 1} ${global.rpgshop.emoticon(especial2)}*
𓃠 *${especialCant3 * 1} ${global.rpgshop.emoticon(especial3)}*
𓃠 *${especialCant4 * 1} ${global.rpgshop.emoticon(especial4)}*`, m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: gt, body: ' 😻 𝖘𝖍𝖆𝖜𝖆𝖗𝖒𝖆 𝖇𝖔𝖙𝖘 ', previewType: 0, thumbnail: gataImg, sourceUrl: accountsgb }}}) 
user[especial] += especialCant * 1
user[especial2] += especialCant2 * 1
user[especial3] += especialCant3 * 1
user[especial4] += especialCant4 * 1
  
}else if (user.level == 10){
conn.reply(m.chat, `*${lenguajeGB.smsAutoLv7()} 10!!* 🏆
𓃠 *${especialCant * 1} ${global.rpgshop.emoticon(especial)}*
𓃠 *${especialCant2 * 1} ${global.rpgshop.emoticon(especial2)}*
𓃠 *${especialCant3 * 1} ${global.rpgshop.emoticon(especial3)}*
𓃠 *${especialCant4 * 1} ${global.rpgshop.emoticon(especial4)}*`, m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: gt, body: ' 😻𝖘𝖍𝖆𝖜𝖆𝖗𝖒𝖆 𝖇𝖔𝖙𝖘 ', previewType: 0, thumbnail: gataImg, sourceUrl: accountsgb }}}) 
user[especial] += especialCant * 1
user[especial2] += especialCant2 * 1
user[especial3] += especialCant3 * 1
user[especial4] += especialCant4 * 1
  
}else if (user.level == 15){
conn.reply(m.chat, `*${lenguajeGB.smsAutoLv7()} 15!!* 🏆
𓃠 *${especialCant * 2} ${global.rpgshop.emoticon(especial)}*
𓃠 *${especialCant2 * 2} ${global.rpgshop.emoticon(especial2)}*
𓃠 *${especialCant3 * 2} ${global.rpgshop.emoticon(especial3)}*
𓃠 *${especialCant4 * 2} ${global.rpgshop.emoticon(especial4)}*`, m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: gt, body: ' 𝖘𝖍𝖆𝖜𝖆𝖗𝖒𝖆 𝖇𝖔𝖙𝖘 ', previewType: 0, thumbnail: gataImg, sourceUrl: accountsgb }}}) 
user[especial] += especialCant * 2
user[especial2] += especialCant2 * 2
user[especial3] += especialCant3 * 2
user[especial4] += especialCant4 * 2
  
}else if (user.level == 20){
conn.reply(m.chat, `*${lenguajeGB.smsAutoLv7()} 20!!* 🏆
𓃠 *${especialCant * 2} ${global.rpgshop.emoticon(especial)}*
𓃠 *${especialCant2 * 2} ${global.rpgshop.emoticon(especial2)}*
𓃠 *${especialCant3 * 2} ${global.rpgshop.emoticon(especial3)}*
𓃠 *${especialCant4 * 2} ${global.rpgshop.emoticon(especial4)}*`, m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: gt, body: ' 😻 𝗦𝘂𝗽𝗲𝗿 𝗚𝗮𝘁𝗮𝗕𝗼𝘁-𝗠𝗗 - 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 ', previewType: 0, thumbnail: gataImg, sourceUrl: accountsgb}}}) 
user[especial] += especialCant * 2
user[especial2] += especialCant2 * 2
user[especial3] += especialCant3 * 2
user[especial4] += especialCant4 * 2
  
}else if (user.level == 25){
conn.reply(m.chat, `*${lenguajeGB.smsAutoLv7()} 25!!* 🏆
𓃠 *${especialCant * 3} ${global.rpgshop.emoticon(especial)}*
𓃠 *${especialCant2 * 3} ${global.rpgshop.emoticon(especial2)}*
𓃠 *${especialCant3 * 3} ${global.rpgshop.emoticon(especial3)}*
𓃠 *${especialCant4 * 3} ${global.rpgshop.emoticon(especial4)}*`, m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: gt, body: ' 😻 𝖘𝖍𝖆𝖜𝖆𝖗𝖒𝖆 𝖇𝖔𝖙𝖘 ', previewType: 0, thumbnail: gataImg, sourceUrl: accountsgb }}})
user[especial] += especialCant * 3
user[especial2] += especialCant2 * 3
user[especial3] += especialCant3 * 3
user[especial4] += especialCant4 * 3
	
}else if (user.level == 30){
conn.reply(m.chat, `*${lenguajeGB.smsAutoLv7()} 30!!* 🏆
𓃠 *${especialCant * 3} ${global.rpgshop.emoticon(especial)}*
𓃠 *${especialCant2 * 3} ${global.rpgshop.emoticon(especial2)}*
𓃠 *${especialCant3 * 3} ${global.rpgshop.emoticon(especial3)}*
𓃠 *${especialCant4 * 3} ${global.rpgshop.emoticon(especial4)}*`, m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: gt, body: ' 😻 𝖘𝖍𝖆𝖜𝖆𝖗𝖒𝖆 𝖇𝖔𝖙𝖘 ', previewType: 0, thumbnail: gataImg, sourceUrl: accountsgb }}})
user[especial] += especialCant * 3
user[especial2] += especialCant2 * 3
user[especial3] += especialCant3 * 3
user[especial4] += especialCant4 * 3
	
}else if (user.level == 35){
conn.reply(m.chat, `*${lenguajeGB.smsAutoLv7()} 35!!* 🏆
𓃠 *${especialCant * 4} ${global.rpgshop.emoticon(especial)}*
𓃠 *${especialCant2 * 4} ${global.rpgshop.emoticon(especial2)}*
𓃠 *${especialCant3 * 4} ${global.rpgshop.emoticon(especial3)}*
𓃠 *${especialCant4 * 4} ${global.rpgshop.emoticon(especial4)}*`, m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: gt, body: ' 😻 𝖘𝖍𝖆𝖜𝖆𝖗𝖒𝖆 𝖇𝖔𝖙𝖘 ', previewType: 0, thumbnail: gataImg, sourceUrl: accountsgb }}})
user[especial] += especialCant * 4
user[especial2] += especialCant2 * 4
user[especial3] += especialCant3 * 4
user[especial4] += especialCant4 * 4
	
}else if (user.level == 40){
conn.reply(m.chat, `*${lenguajeGB.smsAutoLv7()} 40!!* 🏆
𓃠 *${especialCant * 4} ${global.rpgshop.emoticon(especial)}*
𓃠 *${especialCant2 * 4} ${global.rpgshop.emoticon(especial2)}*
𓃠 *${especialCant3 * 4} ${global.rpgshop.emoticon(especial3)}*
𓃠 *${especialCant4 * 4} ${global.rpgshop.emoticon(especial4)}*`, m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: gt, body: ' 😻 𝖘𝖍𝖆𝖜𝖆𝖗𝖒𝖆 𝖇𝖔𝖙𝖘 ', previewType: 0, thumbnail: gataImg, sourceUrl: accountsgb }}})
user[especial] += especialCant * 4
user[especial2] += especialCant2 * 4
user[especial3] += especialCant3 * 4
user[especial4] += especialCant4 * 4
	
}else if (user.level == 45){
conn.reply(m.chat, `*${lenguajeGB.smsAutoLv7()} 45!!* 🏆
𓃠 *${especialCant * 5} ${global.rpgshop.emoticon(especial)}*
𓃠 *${especialCant2 * 5} ${global.rpgshop.emoticon(especial2)}*
𓃠 *${especialCant3 * 5} ${global.rpgshop.emoticon(especial3)}*
𓃠 *${especialCant4 * 5} ${global.rpgshop.emoticon(especial4)}*`, m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: gt, body: ' 😻 𝖘𝖍𝖆𝖜𝖆𝖗𝖒𝖆 𝖇𝖔𝖙𝖘 ', previewType: 0, thumbnail: gataImg, sourceUrl: accountsgb }}})
user[especial] += especialCant * 5
user[especial2] += especialCant2 * 5
user[especial3] += especialCant3 * 5
user[especial4] += especialCant4 * 5
	
}else if (user.level == 50){
conn.reply(m.chat, `*${lenguajeGB.smsAutoLv7()} 50!!* 🏆
𓃠 *${especialCant * 5} ${global.rpgshop.emoticon(especial)}*
𓃠 *${especialCant2 * 5} ${global.rpgshop.emoticon(especial2)}*
𓃠 *${especialCant3 * 5} ${global.rpgshop.emoticon(especial3)}*
𓃠 *${especialCant4 * 5} ${global.rpgshop.emoticon(especial4)}*`, m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: gt, body: ' 😻 𝖘𝖍𝖆𝖜𝖆𝖗𝖒𝖆 𝖇𝖔𝖙𝖘 ', previewType: 0, thumbnail: gataImg, sourceUrl: accountsgb }}})
user[especial] += especialCant * 5
user[especial2] += especialCant2 * 5
user[especial3] += especialCant3 * 5
user[especial4] += especialCant4 * 5
	
}else if (user.level == 55){
conn.reply(m.chat, `*${lenguajeGB.smsAutoLv7()} 55!!* 🏆
𓃠 *${especialCant * 6} ${global.rpgshop.emoticon(especial)}*
𓃠 *${especialCant2 * 6} ${global.rpgshop.emoticon(especial2)}*
𓃠 *${especialCant3 * 6} ${global.rpgshop.emoticon(especial3)}*
𓃠 *${especialCant4 * 6} ${global.rpgshop.emoticon(especial4)}*`, m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: gt, body: ' 😻 𝖘𝖍𝖆𝖜𝖆𝖗𝖒𝖆 𝖇𝖔𝖙𝖘 ', previewType: 0, thumbnail: gataImg, sourceUrl: accountsgb }}})
user[especial] += especialCant * 6
user[especial2] += especialCant2 * 6
user[especial3] += especialCant3 * 6
user[especial4] += especialCant4 * 6
	
}else if (user.level == 60){
conn.reply(m.chat, `*${lenguajeGB.smsAutoLv7()} 60!!* 🏆
𓃠 *${especialCant * 6} ${global.rpgshop.emoticon(especial)}*
𓃠 *${especialCant2 * 6} ${global.rpgshop.emoticon(especial2)}*
𓃠 *${especialCant3 * 6} ${global.rpgshop.emoticon(especial3)}*
𓃠 *${especialCant4 * 6} ${global.rpgshop.emoticon(especial4)}*`, m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: gt, body: ' 😻 𝖘𝖍𝖆𝖜𝖆𝖗𝖒𝖆 𝖇𝖔𝖙𝖘 ', previewType: 0, thumbnail: gataImg, sourceUrl: accountsgb }}})
user[especial] += especialCant * 6
user[especial2] += especialCant2 * 6
user[especial3] += especialCant3 * 6
user[especial4] += especialCant4 * 6
	
}else if (user.level == 65){
conn.reply(m.chat, `*${lenguajeGB.smsAutoLv7()} 65!!* 🏆
𓃠 *${especialCant * 7} ${global.rpgshop.emoticon(especial)}*
𓃠 *${especialCant2 * 7} ${global.rpgshop.emoticon(especial2)}*
𓃠 *${especialCant3 * 7} ${global.rpgshop.emoticon(especial3)}*
𓃠 *${especialCant4 * 7} ${global.rpgshop.emoticon(especial4)}*`, m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: gt, body: ' 😻 𝖘𝖍𝖆𝖜𝖆𝖗𝖒𝖆 𝖇𝖔𝖙𝖘 ', previewType: 0, thumbnail: gataImg, sourceUrl: accountsgb }}})
user[especial] += especialCant * 7
user[especial2] += especialCant2 * 7
user[especial3] += especialCant3 * 7
user[especial4] += especialCant4 * 7
	
}else if (user.level == 70){
conn.reply(m.chat, `*${lenguajeGB.smsAutoLv7()} 70!!* 🏆
𓃠 *${especialCant * 7} ${global.rpgshop.emoticon(especial)}*
𓃠 *${especialCant2 * 7} ${global.rpgshop.emoticon(especial2)}*
𓃠 *${especialCant3 * 7} ${global.rpgshop.emoticon(especial3)}*
𓃠 *${especialCant4 * 7} ${global.rpgshop.emoticon(especial4)}*`, m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: gt, body: ' 😻 𝖘𝖍𝖆𝖜𝖆𝖗𝖒𝖆 𝖇𝖔𝖙𝖘 ', previewType: 0, thumbnail: gataImg, sourceUrl: accountsgb }}})
user[especial] += especialCant * 7
user[especial2] += especialCant2 * 7
user[especial3] += especialCant3 * 7
user[especial4] += especialCant4 * 7
	
}else if (user.level == 75){
conn.reply(m.chat, `*${lenguajeGB.smsAutoLv7()} 75!!* 🏆
𓃠 *${especialCant * 8} ${global.rpgshop.emoticon(especial)}*
𓃠 *${especialCant2 * 8} ${global.rpgshop.emoticon(especial2)}*
𓃠 *${especialCant3 * 8} ${global.rpgshop.emoticon(especial3)}*
𓃠 *${especialCant4 * 8} ${global.rpgshop.emoticon(especial4)}*`, m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: gt, body: ' 😻 𝖘𝖍𝖆𝖜𝖆𝖗𝖒𝖆 𝖇𝖔𝖙𝖘 ', previewType: 0, thumbnail: gataImg, sourceUrl: accountsgb }}})
user[especial] += especialCant * 8
user[especial2] += especialCant2 * 8
user[especial3] += especialCant3 * 8
user[especial4] += especialCant4 * 8
	
}else if (user.level == 80){
conn.reply(m.chat, `*${lenguajeGB.smsAutoLv7()} 80!!* 🏆
𓃠 *${especialCant * 8} ${global.rpgshop.emoticon(especial)}*
𓃠 *${especialCant2 * 8} ${global.rpgshop.emoticon(especial2)}*
𓃠 *${especialCant3 * 8} ${global.rpgshop.emoticon(especial3)}*
𓃠 *${especialCant4 * 8} ${global.rpgshop.emoticon(especial4)}*`, m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: gt, body: ' 😻 𝗦𝘂𝗽𝗲𝗿 𝗚𝗮𝘁𝗮𝗕𝗼𝘁-𝗠𝗗 - 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 ', previewType: 0, thumbnail: gataImg, sourceUrl: accountsgb }}})
user[especial] += especialCant * 8
user[especial2] += especialCant2 * 8
user[especial3] += especialCant3 * 8
user[especial4] += especialCant4 * 8
	
}else if (user.level == 85){
conn.reply(m.chat, `*${lenguajeGB.smsAutoLv7()} 85!!* 🏆
𓃠 *${especialCant * 9} ${global.rpgshop.emoticon(especial)}*
𓃠 *${especialCant2 * 9} ${global.rpgshop.emoticon(especial2)}*
𓃠 *${especialCant3 * 9} ${global.rpgshop.emoticon(especial3)}*
𓃠 *${especialCant4 * 9} ${global.rpgshop.emoticon(especial4)}*`, m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: gt, body: ' 😻 𝗦𝘂𝗽𝗲𝗿 𝗚𝗮𝘁𝗮𝗕𝗼𝘁-𝗠𝗗 - 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 ', previewType: 0, thumbnail: gataImg, sourceUrl: accountsgb}}})
user[especial] += especialCant * 9
user[especial2] += especialCant2 * 9
user[especial3] += especialCant3 * 9
user[especial4] += especialCant4 * 9
	
}else if (user.level == 90){
conn.reply(m.chat, `*${lenguajeGB.smsAutoLv7()} 90!!* 🏆
𓃠 *${especialCant * 9} ${global.rpgshop.emoticon(especial)}*
𓃠 *${especialCant2 * 9} ${global.rpgshop.emoticon(especial2)}*
𓃠 *${especialCant3 * 9} ${global.rpgshop.emoticon(especial3)}*
𓃠 *${especialCant4 * 9} ${global.rpgshop.emoticon(especial4)}*`, m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: gt, body: ' 😻 𝗦𝘂𝗽𝗲𝗿 𝗚𝗮𝘁𝗮𝗕𝗼𝘁-𝗠𝗗 - 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 ', previewType: 0, thumbnail: gataImg, sourceUrl: accountsgb }}})
user[especial] += especialCant * 9
user[especial2] += especialCant2 * 9
user[especial3] += especialCant3 * 9
user[especial4] += especialCant4 * 9
	
}else if (user.level == 95){
conn.reply(m.chat, `*${lenguajeGB.smsAutoLv7()} 95!!* 🏆
𓃠 *${especialCant * 10} ${global.rpgshop.emoticon(especial)}*
𓃠 *${especialCant2 * 10} ${global.rpgshop.emoticon(especial2)}*
𓃠 *${especialCant3 * 10} ${global.rpgshop.emoticon(especial3)}*
𓃠 *${especialCant4 * 10} ${global.rpgshop.emoticon(especial4)}*`, m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: gt, body: ' 😻 𝗦𝘂𝗽𝗲𝗿 𝗚𝗮𝘁𝗮𝗕𝗼𝘁-𝗠𝗗 - 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 ', previewType: 0, thumbnail: gataImg, sourceUrl: accountsgb }}})
user[especial] += especialCant * 10
user[especial2] += especialCant2 * 10
user[especial3] += especialCant3 * 10
user[especial4] += especialCant4 * 10
	
}else if (user.level == 100){
conn.reply(m.chat, `*${lenguajeGB.smsAutoLv7()} 100!!* 🏆
𓃠 *${especialCant * 10} ${global.rpgshop.emoticon(especial)}*
𓃠 *${especialCant2 * 10} ${global.rpgshop.emoticon(especial2)}*
𓃠 *${especialCant3 * 10} ${global.rpgshop.emoticon(especial3)}*
𓃠 *${especialCant4 * 10} ${global.rpgshop.emoticon(especial4)}*`, m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: gt, body: ' 😻 𝗦𝘂𝗽𝗲𝗿 𝗚𝗮𝘁𝗮𝗕𝗼𝘁-𝗠𝗗 - 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 ', previewType: 0, thumbnail: gataImg, sourceUrl: accountsgb }}})
user[especial] += especialCant * 10
user[especial2] += especialCant2 * 10
user[especial3] += especialCant3 * 10
user[especial4] += especialCant4 * 10
	
}else{	
	
}
	 
}}		
export default handler

global.roles = {
// Nivel 0-9: Principiantes
global.roles = {
    // مستوى 0-9: مغامرين
    '🌱 *مغامر - مبتدئ V*': 0,
    '🌱 *مغامر - مبتدئ IV*': 2,
    '🌱 *مغامر - مبتدئ III*': 4,
    '🌱 *مغامر - مبتدئ II*': 6,
    '🌱 *مغامر - مبتدئ I*': 8,

    // مستوى 10-19: متعلمين
    '🛠️ *متعلمين الطريق V*': 10,
    '🛠️ *متعلمين الطريق IV*': 12,
    '🛠️ *متعلمين الطريق III*': 14,
    '🛠️ *متعلمين الطريق II*': 16,
    '🛠️ *متعلمين الطريق I*': 18,

    // مستوى 20-29: مستكشفين
    '⚔️ *مستكشف من الوادي V*': 20,
    '⚔️ *مستكشف من الوادي IV*': 22,
    '⚔️ *مستكشف من الوادي III*': 24,
    '⚔️ *مستكشف من الوادي II*': 26,
    '⚔️ *مستكشف من الوادي I*': 28,

    // مستوى 30-39: محاربين
    '🏹 *محارب الفجر V*': 30,
    '🏹 *محارب الفجر IV*': 32,
    '🏹 *محارب الفجر III*': 34,
    '🏹 *محارب الفجر II*': 36,
    '🏹 *محارب الفجر I*': 38,

    // مستوى 40-49: حماة
    '🛡️ *حامي الغابات V*': 40,
    '🛡️ *حامي الغابات IV*': 42,
    '🛡️ *حامي الغابات III*': 44,
    '🛡️ *حامي الغابات II*': 46,
    '🛡️ *حامي الغابات I*': 48,

    // مستوى 50-59: سحرة
    '🔮 *ساحر الشفق V*': 50,
    '🔮 *ساحر الشفق IV*': 52,
    '🔮 *ساحر الشفق III*': 54,
    '🔮 *ساحر الشفق II*': 56,
    '🔮 *ساحر الشفق I*': 58,

    // مستوى 60-79: نخب
    '🏅 *بطل الذهب V*': 60,
    '🏅 *بطل الذهب IV*': 62,
    '🏅 *بطل الذهب III*': 64,
    '🏅 *بطل الذهب II*': 66,
    '🏅 *بطل الذهب I*': 68,
    '💎 *فارس الماس V*': 70,
    '💎 *فارس الماس IV*': 72,
    '💎 *فارس الماس III*': 74,
    '💎 *فارس الماس II*': 76,
    '💎 *فارس الماس I*': 78,

    // مستوى 80-99: معلمين
    '🌌 *معلم النجوم V*': 80,
    '🌌 *معلم النجوم IV*': 85,
    '🌌 *معلم النجوم III*': 90,
    '🌌 *معلم النجوم II*': 95,
    '🌌 *معلم النجوم I*': 99,

    // مستوى 100-149: أساطير
    '🌀 *أسطورة الفجر V*': 100,
    '🌀 *أسطورة الفجر IV*': 110,
    '🌀 *أسطورة الفجر III*': 120,
    '🌀 *أسطورة الفجر II*': 130,
    '🌀 *أسطورة الفجر I*': 140,

    // مستوى 150-199: ملوك/ملكات
    '👑 *ملك/ملكة الكون V*': 150,
    '👑 *ملك/ملكة الكون IV*': 160,
    '👑 *ملك/ملكة الكون III*': 170,
    '👑 *ملك/ملكة الكون II*': 180,
    '👑 *ملك/ملكة الكون I*': 199,

    // مستوى 200-299: أبطال
    '🚀 *بطل بين المجرات V*': 200,
    '🚀 *بطل بين المجرات IV*': 225,
    '🚀 *بطل بين المجرات III*': 250,
    '🚀 *بطل بين المجرات II*': 275,
    '🚀 *بطل بين المجرات I*': 299,

    // مستوى 300-399: ضوء أولي
    '✨ *ضوء أولي من الكون V*': 300,
    '✨ *ضوء أولي من الكون IV*': 325,
    '✨ *ضوء أولي من الكون III*': 350,
    '✨ *ضوء أولي من الكون II*': 375,
    '✨ *ضوء أولي من الكون I*': 399,

    // مستوى 400-499: نساج عظيم
    '🪐 *نساج المدارات اللانهائية V*': 400,
    '🪐 *نساج المدارات اللانهائية IV*': 425,
    '🪐 *نساج المدارات اللانهائية III*': 450,
    '🪐 *نساج المدارات اللانهائية II*': 475,
    '🪐 *نساج المدارات اللانهائية I*': 499,

    // مستوى 500-599: انعكاس عظيم
    '🪞 *انعكاس عظيم للمصير V*': 500,
    '🪞 *انعكاس عظيم للمصير IV*': 525,
    '🪞 *انعكاس عظيم للمصير III*': 550,
    '🪞 *انعكاس عظيم للمصير II*': 575,
    '🪞 *انعكاس عظيم للمصير I*': 599,

    // مستوى 600-699: تحول
    '🦋 *تحول نجمي V*': 600,
    '🦋 *تحول نجمي IV*': 625,
    '🦋 *تحول نجمي III*': 650,
    '🦋 *تحول نجمي II*': 675,
    '🦋 *تحول نجمي I*': 699,

    // مستوى 700-799: حكام مصير
    '💠 *حاكم مصير V*': 700,
    '💠 *حاكم مصير IV*': 725,
    '💠 *حاكم مصير III*': 750,
    '💠 *حاكم مصير II*': 775,
    '💠 *حاكم مصير I*': 799,

    // مستوى 800-899: عقل لامع
    '🧠 *عقل عالمي V*': 800,
    '🧠 *عقل عالمي IV*': 825,
    '🧠 *عقل عالمي III*': 850,
    '🧠 *عقل عالمي II*': 875,
    '🧠 *عقل عالمي I*': 899,

    // مستوى 900-999: مسافر
    '🛸 *مسافر عبر الزمن V*': 900,
    '🛸 *مسافر عبر الزمن IV*': 925,
    '🛸 *مسافر عبر الزمن III*': 950,
    '🛸 *مسافر عبر الزمن II*': 975,
    '🛸 *مسافر عبر الزمن I*': 999,

    // مستوى 300+: خالدون
    '🔥 *بطل خالد V*': 1000,
    '🔥 *بطل خالد IV*': 2000,
    '🔥 *بطل خالد III*': 3000,
    '🔥 *بطل خالد II*': 4000,
    '🔥 *بطل خالد I*': 5000,
    '👑🌌 *إله أبدي من الكون المتعدد* ⚡': 10000,
}