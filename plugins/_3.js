let handler = async (m, { conn }) => {
  var currentTime = new Date();
  var egyptTime = new Date(currentTime.toLocaleString("en-US", { timeZone: "Africa/Cairo" }));
  var hours = egyptTime.getHours().toString().padStart(2, '0');
  var minutes = egyptTime.getMinutes().toString().padStart(2, '0');
  var seconds = egyptTime.getSeconds().toString().padStart(2, '0');
  var formattedTime = `${hours}:${minutes}:${seconds}`;
  
  var uptime = process.uptime();
  var uptimeMinutes = Math.floor(uptime / 60);
  var uptimeSeconds = Math.floor(uptime % 60);

  var totalUsers = 1253; // عدد مستخدمي البوت

  var txt = `
💖🌸━━━━━━━━━━━━━━━🌸💖
💫 *بوت يونا* 💫  
👑 *المطور:* مطورك المميز  
⏳ *وقت التشغيل:* ${uptimeMinutes} دقيقة و ${uptimeSeconds} ثانية  
🌍 *عدد المستخدمين:* ${totalUsers}  
⏰ *الوقت الآن (مصر):* ${formattedTime}  
💖🌸━━━━━━━━━━━━━━━🌸💖

🎮 *أوامر الألعاب:* 🎮  
🏦 | .البنك  
👤 | .بروفايل  
📝 | .تسجيل  
🔢 | .رقمي  
🛒 | .شراء   
👁‍🗨 | .عين  
🎲 | .احزر  
🎯 | .اكس  
🤖 | .بوت  
🗣️ | .انطق  
⏳ | .اكله
📜 | .صوره
⭐ |

🌸💖 *دعم البوت:*  
https://chat.whatsapp.com/DTq801MduLhFxT9xH1BXHS
💖🌸

⚠️ ملاحظة: استخدام البوت بطريقة خاطئة = بان  
`;

  conn.sendMessage(m.chat, { image: { url: "https://qu.ax/Hlbmb.jpg" }, caption: txt }, { quoted: m });
  
  return conn.sendMessage(m.chat, {
    react: {
      text: '🧀',
      key: m.key,
    }
  });
}

handler.command = /^(م3|1ق|ق1|3)$/i;
export default handler;