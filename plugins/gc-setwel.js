let handler = async (m, { conn, text, isROwner, isOwner }) => {
if (text) {
global.db.data.chats[m.chat].sWelcome = text
m.reply('[⚡]⌯ تــم تـغـيـر الــتــرحــيــب بــنــجــاح')
} else throw `[⚡]⌯ يــرجـي كــتــابــه رســالــه الــتـرحــيـب\n⌯ اســتــخــدم :\n⌯ @user = مــنــشــن لـلـشـخـص الـي دخــل\n⌯ @group = اســم الـجـروب\n⌯ @desc وصــف الــجــروب`
}
handler.help = ['Shadow']
handler.tags = ['Shadow']
handler.command = ['تغيرالترحيب','الترحيب'] 
handler.admin = true
export default handler