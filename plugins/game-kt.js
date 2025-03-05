import fs from 'fs';

let timeout = 20000;
let poin = 3999;

let handler = async (m, { conn, usedPrefix }) => {
    conn.tekateki = conn.tekateki ? conn.tekateki : {};
    let id = m.chat;
    if (id in conn.tekateki) {
        conn.reply(m.chat, '*㊣ ━─ ─ ╎⊰⚡⊱╎─ ─━ ㊣*\n\n*لم يتم الاجابة على السؤال بعد*\n\n*㊣ ━─ ─ ╎⊰⚡⊱╎─ ─━ ㊣*', conn.tekateki[id][0]);
        throw false;
    }
    let tekateki = JSON.parse(fs.readFileSync(`./src/game/kt.json`));
    let json = tekateki[Math.floor(Math.random() * tekateki.length)];
    let _clue = json.response;
    let clue = _clue.replace(/[A-Za-z]/g, ''); 
    let caption = `ⷮ اكــــتــــب ↶ 
> ⌊${json.question}⌉
الــوقــت ⟣ ⌊${(timeout / 1000).toFixed(2)}⌉
الــجـائـزه ⟣ ⌊${poin}⌉
`.trim();
    conn.tekateki[id] = [
       await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(async () => {
            if (conn.tekateki[id]) await conn.reply(m.chat, `*㊣ ━─ ─ ╎⊰⚡⊱╎─ ─━ ㊣*\n*↞انتهى وقت الاجابة*\n\n*↞الاجابة ${json.response}*\n*㊣ ━─ ─ ╎⊰⚡⊱╎─ ─━ ㊣*`, conn.tekateki[id][0]);
            delete conn.tekateki[id];
        }, timeout)
    ];
};

handler.help = ['shadow'];
handler.tags = ['game'];
handler.command = /^(كت)$/i;

export default handler