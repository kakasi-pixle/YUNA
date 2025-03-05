import similarity from 'similarity'
const threshold = 0.72
let handler = m => m

handler.before = async function (m) {
    let id = m.chat
    this.tekateki = this.tekateki ? this.tekateki : {}

    if (m.text.toLowerCase() === '.انسحب') {
        if (!(id in this.tekateki)) return m.reply('لا يوجد لغز نشط للانسحاب!')
        let json = JSON.parse(JSON.stringify(this.tekateki[id][1]))
        m.reply(`الإجابة الصحيحة كانت: ${json.response}`)
        clearTimeout(this.tekateki[id][3])
        delete this.tekateki[id]
        return !0
    }

    if (!m.quoted || !m.quoted.fromMe || !/^ⷮ/i.test(m.quoted.text)) return !0
    if (!(id in this.tekateki)) return m.reply('هذا اللغز قد انتهى!')
    if (m.quoted.id == this.tekateki[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.tekateki[id][1]))

        if (m.text.toLowerCase() == json.response.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.tekateki[id][2]
            m.reply(`*❐┃إجابة صحيحة┃✅ ❯*\n\n*❐↞┇الجائزة💰↞ ${this.tekateki[id][2]} نقطة┇*`)
            clearTimeout(this.tekateki[id][3])
            delete this.tekateki[id]
        } else if (similarity(m.text.toLowerCase(), json.response.toLowerCase().trim()) >= threshold) {
            m.reply(`قريب جداً!`)
        } else {
            m.reply('❐┃إجابة خاطئة┃❌ ❯')
        }
    }
    return !0
}

handler.command = /^انسحب$/i

export default handler