const handler = async (m, { conn }) => {
    if (!global.owner.map(v => v[0] + '@s.whatsapp.net').includes(m.sender)) {
        return await m.reply('🚫 هذا الأمر خاص بالمطورين فقط.');
    }

    await m.reply('🔄 جاري إعادة تشغيل البوت، الرجاء الانتظار...');

    process.exit(0); 
};

handler.command = /^ريستارت$/i; 
handler.rowner = true; 

export default handler;