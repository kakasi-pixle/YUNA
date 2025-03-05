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
💫 *بوت يونا بوت* 💫  
👑 *المطور:* مطورك المميز  
⏳ *وقت التشغيل:* ${uptimeMinutes} دقيقة و ${uptimeSeconds} ثانية  
🌍 *عدد المستخدمين:* ${totalUsers}  
⏰ *الوقت الآن (مصر):* ${formattedTime}  
💖🌸━━━━━━━━━━━━━━━🌸💖

🎀 *أوامر البوت:* 🎀  
🎮 | .انطق
⚡ | .حولها
🎯 | .طقم
👁‍🗨 | .
💍 | .
🎨 | .
🎲 | .
👑 | .  
  

🌸💖 *دعم البوت:*  
https://chat.whatsapp.com/DTq801MduLhFxT9xH1BXHS
💖🌸
`;

  conn.sendMessage(m.chat, { image: { url: "https://qu.ax/rtoxE.jpg" }, caption: txt }, { quoted: m });
  
  return conn.sendMessage(m.chat, {
    react: {
      text: '🪇',
      key: m.key,
    }
  });
}

handler.command = /^(م4|4|امر4|ق4)$/i;
export default handler;