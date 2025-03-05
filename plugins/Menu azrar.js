function clockString(ms) {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor(ms % 3600000 / 60000);
    let s = Math.floor(ms % 60000 / 1000);
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}

import pkg from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto, prepareWAMessageMedia } = pkg;

const handler = async (m, {conn, usedPrefix, usedPrefix: _p, __dirname, text, isPrems}) => {
    let d = new Date(new Date + 3600000);
    let locale = 'ar';
    let week = d.toLocaleDateString(locale, { weekday: 'long' });
    let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
    let _uptime = process.uptime() * 1000;
    let uptime = clockString(_uptime);
    let user = global.db.data.users[m.sender];
    let name = conn.getName(m.sender)
    let { money, joincount } = global.db.data.users[m.sender];
    let { exp, limit, level, role } = global.db.data.users[m.sender];
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length;
    let more = String.fromCharCode(8206);
    let readMore = more.repeat(850);
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let taguser = '@' + m.sender.split("@s.whatsapp.net")[0];
  await conn.sendMessage(m.chat, { react: { text: '🌺', key: m.key } })
  const harley = 'https://qu.ax/TvcHA.jpg'
  const mentionId = m.key.participant || m.key.remoteJid;
 
conn.relayMessage(m.chat, { viewOnceMessage: { message: { interactiveMessage: { header: { title: `harley`}, body: { text: `*⎔⋅ ╼╃ ⊰ •﹝❄️﹞• ⊱ ╄╾ ⋅⎔*
*␥↞مـࢪحـبـا بـك/ي* @${mentionId.split('@')[0]}
*⎔⋅ ╼╃ ⊰ •﹝❄️﹞• ⊱ ╄╾ ⋅⎔*
> 🧭␥﴿ إن وعد الله حق ﴾
*⎔⋅ ╼╃ ⊰ •﹝❄️﹞• ⊱ ╄╾ ⋅⎔*
*␥↞﴿ مـعـلـومـاتـك ﴾⤹*
> 🪔␥بـريـمـيـوم↞﴿ ${user.premiumTime > 0 ? 'مــمـ🔱ـيز' : (isPrems ? 'مــمـ🔱ـيز' : 'عــ🍁ــادي') || ''} ﴾
> ⚜️␥مـــســـتواك↞﴿ ${level} ﴾
> 💫␥رتـبـتـك↞﴿ ${role} ﴾
*⎔⋅ ╼╃ ⊰ •﹝❄️﹞• ⊱ ╄╾ ⋅⎔*
*␥↞﴿الـبـوت﴾⤹*
> 🧧␥اسـم الـبـوت↞﴿ yna ﴾
> ❄️␥الـمـطـور↞﴿ shawarma ﴾
> ⏳␥الـتـشـغـيـل↞﴿ ${uptime} ﴾
> 💧␥عـدد الـمـسـتـخـدمـين↞﴿ 20 ﴾
*⎔⋅ ╼╃ ⊰ •﹝❄️﹞• ⊱ ╄╾ ⋅⎔*
> © shawarma 2025
*⎔⋅ ╼╃ ⊰ •﹝❄️﹞• ⊱ ╄╾ ⋅⎔*`,subtitle: "ssh_shawarma",},header: { hasMediaAttachment: true,...(await prepareWAMessageMedia({ image : { url: harley } }, { upload: conn.waUploadToServer }, {quoted: m}))},
                    contextInfo: {
                        mentionedJid: [m.sender],
                        isForwarded: false,
                    },nativeFlowMessage: { buttons: [


                            {
                                name: 'single_select',
                                buttonParamsJson: JSON.stringify({
                                    title: '⌈🛡╎الــقــوائـــم╎🛡⌋',
                                    sections: [
                                        {
                                            title: 'مــرحـ🛡ـبــا بــك فـي يونا بـ🤖ـوت',
                                            highlight_label: 'اتمني تدخل القناه وجروب الدعم🌺',
                                            rows: [
                                                {
                                                    header: 'الــقـ👑ـســم الـاول',
                                                    title: 'استدعاء_قسم_الاعضاء #الاعضاء',
                                                    description: '',
                                                    id: '.م1'
                                                },
                                                {
                                                    header: 'الــقـ👨🏻‍💻ـســم الــثــانــي',
                                                    title: 'استدعاء_قسم_المشرفين #المشرفين',
                                                    description: '',
                                                    id: '.م2'
                                                },
                                                {
              
                                                    header: 'قسم الالعاب',
                                                    title: 'استدعاء_قسم_الالعاب #الالعاب',
                                                    description: '',
                                                    id: '.م3'
                                                },
                                                {
                                                    header: 'قسم التحويلات',
                                                    title: 'استدعاء_قسم_التحويلات #التحويلات',
                                                    description: '',
                                                    id: '.م4'
                                               }
                                            ]
                                        }
                                    ]
                                }),
                  messageParamsJson: ''
                },
                {
              name: "quick_reply",
              buttonParamsJson: '{"display_text":"⌈✅╎المطور╎✅⌋","id":".المطور"}'
                     },
                     {
               name: "cta_url",
               buttonParamsJson: '{"display_text":"⌈📲╎قـنـاة الـمـطـور╎📲⌋","url":"https://whatsapp.com/channel/0029VaxKNWwKgsO0vINyGg1W","merchant_url":"https://whatsapp.com/channel/0029VaxKNWwKgsO0vINyGg1W"}'
                            }
                        ]
                    }
                }
            }
        }
    }, {});
}

handler.help = ['info'];
handler.tags = ['main'];
handler.command = ['menu', 'مهام', 'اوامر','الاوامر','قائمة','القائمة']

export default handler;
