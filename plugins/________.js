global.math = global.math ? global.math : {}
let handler  = async (m, { conn, args, usedPrefix, command }) => {
let mat =`${lenguajeGB['smsAvisoIIG']()}✨ يمكنك استخدام الأزرار أو كتابة الصعوبة

صعب 
${Object.keys(modes).join('  |  ')}
 | مثل
${usedPrefix + command} noob
${usedPrefix + command} impossible2
 المزيد من الصعوبة يمكنك الحصول على مكافأة أكبر
`.trim()
if (args.length < 1) return conn.sendHydrated(m.chat, wm, mat, null, null, null, null, null, [
['😋  | سهل', `${usedPrefix + command} easy`], 
['😎  | صعب', `${usedPrefix + command} hard`], 
['🤑  | صعب جدا', `${usedPrefix + command} extreme`]], m)
  
let mode = args[0].toLowerCase()
if (!(mode in modes)) return conn.sendHydrated(m.chat, wm, mat, null, null, null, null, null, [
['😋 𝙁𝙖𝙘𝙞𝙡 | 𝙀𝙖𝙨𝙮', `${usedPrefix + command} easy`], 
['😎 𝘿𝙞𝙛𝙞𝙘𝙞𝙡 | 𝙃𝙖𝙧𝙙', `${usedPrefix + command} hard`], 
['🤑 𝙀𝙭𝙩𝙧𝙚𝙢𝙤 | 𝙀𝙭𝙩𝙧𝙚𝙢𝙚', `${usedPrefix + command} extreme`]], m) 
  
let id = m.chat
if (id in global.math) return conn.reply(m.chat, `${lenguajeGB['smsAvisoAG']()}𝙃𝘼𝙔 𝙋𝙍𝙀𝙂𝙐𝙉𝙏𝘼𝙎 𝙎𝙄𝙉 𝙍𝙀𝙎𝙋𝙊𝙉𝘿𝙀𝙍 𝙀𝙉 𝙀𝙇 𝘾𝙃𝘼𝙏!!\n\n𝙏𝙃𝙀𝙍𝙀 𝘼𝙍𝙀 𝙌𝙐𝙀𝙎𝙏𝙄𝙊𝙉𝙎 𝙒𝙄𝙏𝙃𝙊𝙐𝙏 𝘼𝙉𝙎𝙒𝙀𝙍𝙄𝙉𝙂 𝙄𝙉 𝙏𝙃𝙀 𝘾𝙃𝘼𝙏!!`, global.math[id][0])
//let ii = global.db.data.users[m.sender].limit += 10 math.dia
let math = genMath(mode)
global.math[id] = [
await conn.reply(m.chat, `𝘾𝙪𝙖𝙡 𝙚𝙨 𝙧𝙚𝙨𝙪𝙡𝙩𝙖𝙙𝙤 𝙙𝙚 *${math.str} = ?*
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
𝙏𝙞𝙚𝙢𝙥𝙤 | 𝙏𝙞𝙢𝙚
🧭 *${(math.time / 1000).toFixed(0)} 𝚜𝚎𝚐𝚞𝚗𝚍𝚘𝚜*
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
𝙍𝙚𝙨𝙥𝙤𝙣𝙙𝙚 𝙖 𝙚𝙨𝙩𝙚 𝙢𝙚𝙣𝙨𝙖𝙟𝙚 𝙮 𝙂𝙖𝙣𝙖 
🏆 *${math.bonus} 𝙓𝙋*
`, m),
math, 4,
  
await conn.sendHydrated(m.chat, `⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️`, `𝙍𝙀𝙎𝙋𝙊𝙉𝘿𝘼 𝘼𝙇 𝙈𝙀𝙉𝙎𝘼𝙅𝙀 𝘿𝙀 𝘼𝙍𝙍𝙄𝘽𝘼 𝘾𝙊𝙉 𝙇𝘼 𝙍𝙀𝙎𝙋𝙐𝙀𝙎𝙏𝘼\n\n𝘼𝙉𝙎𝙒𝙀𝙍 𝙏𝙃𝙀 𝙈𝙀𝙎𝙎𝘼𝙂𝙀 𝘼𝘽𝙊𝙑𝙀 𝙏𝙊 𝙆𝙉𝙊𝙒 𝙔𝙊𝙐𝙍 𝘼𝙉𝙎𝙒𝙀𝙍`, null, md, '𝙂𝙖𝙩𝙖𝘽𝙤𝙩-𝙈𝘿', null, null, [ 
['𝙏𝙤𝙥𝙨 | 𝙍𝙖𝙣𝙠𝙞𝙣𝙜 🏆', `${usedPrefix}top`],
['𝙑𝙤𝙡𝙫𝙚𝙧 𝙖𝙡 𝙈𝙚𝙣𝙪́ | 𝘽𝙖𝙘𝙠 𝙩𝙤 𝙈𝙚𝙣𝙪 ☘️', `${usedPrefix}menu`]
], m), math, 4,
  
setTimeout(() => { 
if (global.math[id]) conn.sendButton(m.chat, `${lenguajeGB['smsAvisoAG']()}𝙎𝙀 𝘼𝘾𝘼𝘽𝙊 𝙀𝙇 𝙏𝙄𝙀𝙈𝙋𝙊!!\n𝙇𝘼 𝙍𝙀𝙎𝙋𝙐𝙀𝙎𝙏𝘼 𝙀𝙎 *${math.result}*\n\n𝙏𝙄𝙈𝙀 𝙄𝙎 𝙐𝙋!!\n𝙏𝙃𝙀 𝘼𝙉𝙎𝙒𝙀𝙍 𝙄𝙎 *${math.result}*`, wm, null, [['𝙄𝙣𝙩𝙚𝙣𝙩𝙖𝙧 𝙙𝙚 𝙣𝙪𝙚𝙫𝙤 | 𝙏𝙧𝙮 𝙖𝙜𝙖𝙞𝙣', `${usedPrefix + command} ${math.mode}`], ['𝙈𝙚𝙣𝙪 𝙅𝙪𝙚𝙜𝙤𝙨 | 𝙂𝙖𝙢𝙚𝙨 𝙈𝙚𝙣𝙪 🎡', `/juegosmenu`]], global.math[id][0])
delete global.math[id]
}, math.time)
]}
handler.help = ['math <mode>']
handler.tags = ['game']
handler.command = /^math|mates|matemáticas/i

export default handler

let modes = {
noob: [-3, 3,-3, 3, '+-', 15000, 30], 
easy: [-10, 10, -10, 10, '*/+-', 20000, 50],
medium: [-40, 40, -20, 20, '*/+-', 30000, 200],
hard: [-100, 100, -70, 70, '*/+-', 40000, 500],
extreme: [-999999, 999999, -999999, 999999, '*/', 40000, 2500],
impossible: [-99999999999, 99999999999, -99999999999, 999999999999, '*/', 50000, 5500],
impossible2: [-999999999999999, 999999999999999, -999, 999, '/', 60000, 8500]
} 

let operators = {
'+': '+',
'-': '-',
'*': '×',
'/': '÷'
}

// XP
function genMath(mode) {
let [a1, a2, b1, b2, ops, time, bonus] = modes[mode]
let a = randomInt(a1, a2)
let b = randomInt(b1, b2)
let op = pickRandom([...ops])
let result = (new Function(`return ${a} ${op.replace('/', '*')} ${b < 0 ? `(${b})` : b}`))()
if (op == '/') [a, result] = [result, a]
return {
str: `${a} ${operators[op]} ${b}`,
mode,
time,
bonus,
result
}}

function randomInt(from, to) {
if (from > to) [from, to] = [to, from]
from = Math.floor(from)
to = Math.floor(to)
return Math.floor((to - from) * Math.random() + from)
}

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]
}