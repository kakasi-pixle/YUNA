import TicTacToe from '../lib/tictactoe.js'
let handler = async (m, { conn, usedPrefix, command, text }) => {
conn.game = conn.game ? conn.game : {}
if (Object.values(conn.game).find(room => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender))) throw '[⚡]⌯ انــت لـا تـزال فــي الــلــعــبــه مــع شــخــص مــا'
if (!text) throw `[⚡]⌯ ضــيــف اســم لـلـروم\n\n⌯ مــثــال :\n⌯ ${usedPrefix + command} غــرفــه`
let room = Object.values(conn.game).find(room => room.state === 'WAITING' && (text ? room.name === text : true))
if (room) {
await m.reply('[🕹️] لــقــد بــدات الــلــعــبه')
room.o = m.chat
room.game.playerO = m.sender
room.state = 'PLAYING'
let arr = room.game.render().map(v => {
return {
X: '❎',
O: '⭕',
1: '1️⃣',
2: '2️⃣',
3: '3️⃣',
4: '4️⃣',
5: '5️⃣',
6: '6️⃣',
7: '7️⃣',
8: '8️⃣',
9: '9️⃣',
}[v]})
let str = `
〄│ 〘 اكـــس او 〙│〄

❎ = @${room.game.playerX.split('@')[0]}
⭕ = @${room.game.playerO.split('@')[0]}

        ${arr.slice(0, 3).join('')}
        ${arr.slice(3, 6).join('')}
        ${arr.slice(6).join('')}

⌯ دور : @${room.game.currentTurn.split('@')[0]}
`.trim()
if (room.x !== room.o) await conn.sendMessage(room.x, { text: str, mentions: this.parseMention(str)}, { quoted: m })
await conn.sendMessage(room.o, { text: str, mentions: conn.parseMention(str)}, { quoted: m })
} else {
room = {
id: 'tictactoe-' + (+new Date),
x: m.chat,
o: '',
game: new TicTacToe(m.sender, 'o'),
state: 'WAITING' }
if (text) room.name = text     
let imgplay = `https://cope-cdnmed.agilecontent.com/resources/jpg/8/9/1590140413198.jpg`
conn.reply(m.chat, `〄│ 〘 اكـــس او 〙│〄\n\n⌯ فــي انـتـظـار انـضـمـام لـاعـب اخــر\n⌯ لـحـذف الـغـرفـه اســتـخـدم الــامر ${usedPrefix}مغادره\n\n⌯ لـانـضـمـام الـي الـغـرفـه اســتـخـدم : ${usedPrefix + command} ${text}`, m)

conn.game[room.id] = room
}}
handler.command = /^(اكس|اكس-او)$/i
export default handler