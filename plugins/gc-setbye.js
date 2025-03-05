let handler = async (m, { conn, text, iwelcimesROwner, isOwner }) => {
if (text) {
global.db.data.chats[m.chat].sBye = text
m.reply('[⚡]⌯ تــم تـغـيـر الـمـغـادره بــنــجــاح')
} else throw `[⚡]⌯ يــرجـي كــتــابــه رســالــه الـمـغـادره\n⌯ اســتــخــدم :\n⌯ @user = مــنــشــن لـلـشـخـص الـي دخــل\n⌯ @group = اســم الـجـروب\n⌯ @desc وصــف الــجــروب`
}
handler.help = ['<text>تغيرالمغادره']
handler.tags = ['group']
handler.command = ['تغيرالمغادره','المغادره', 'الوداع'] 
handler.admin = true
export default handler