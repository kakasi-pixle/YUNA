import fetch from 'node-fetch';
let timeout = 45000;
let poin = 10000;
let handler = async (m, { conn, command, usedPrefix }) => {
    // منع الرد على رسائل البوت نفسه
    if (m.key.fromMe) return;

    conn.tebakbendera = conn.tebakbendera ? conn.tebakbendera : {};
    let id = m.chat;
    if (id in conn.tebakbendera) {
        conn.reply(m.chat, '⌯ هناك أسئلة لم يتم الإجابة عنها.', conn.tebakbendera[id][0]);
        throw false;
    }
    let src = await (await fetch('https://raw.githubusercontent.com/Darkshadow201293/ShadowMedia/main/games/eye.json')).json();
    let json = src[Math.floor(Math.random() * src.length)];
    let caption = `
فــعــالـيـه عـيـن 
--------------------->
الوقت ⟣ ⌊${(timeout / 1000).toFixed(2)}⌉
--------------------->
الجائزة ⟣ ⌊${poin}⌉
--------------------->
النوع: عين شخصيه عشوائيه
> استخدم ${usedPrefix}تلميح للجواب`.trim();
    conn.tebakbendera[id] = [
        await conn.sendFile(m.chat, json.img, 'shadow.jpg', caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.tebakbendera[id]) {
                conn.reply(m.chat, `⌯ انتهى الوقت\nالإجابة: *${json.name}*`, conn.tebakbendera[id][0]);
                delete conn.tebakbendera[id];
            }
        }, timeout)
    ];
};

// دالة الإجابة
handler.answer = async (m, { conn, text }) => {
    let id = m.chat;
    if (!conn.tebakbendera || !(id in conn.tebakbendera)) return;
    let [msg, json, poin, timeout] = conn.tebakbendera[id];
    if (text.toLowerCase() === json.name.toLowerCase()) {
        conn.reply(m.chat, `⌯ إجابة صحيحة! 🎉 حصلت على ${poin} نقطة.`, msg);
        clearTimeout(timeout); // إلغاء المؤقت عند الإجابة الصحيحة
        delete conn.tebakbendera[id];
    } else {
        conn.reply(m.chat, '⌯ إجابة خاطئة. حاول مرة أخرى!', msg);
    }
};

handler.help = ['Shadow'];
handler.tags = ['Shadow'];
handler.command = /^عين/i;

export default handler;