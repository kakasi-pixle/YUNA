let listsData = {};  // تخزين بيانات القوائم

let handler = async (m, { conn, text, isAdmin }) => {
  if (!m.isGroup) return conn.reply(m.chat, "هذا الأمر يعمل فقط في المجموعات.", m);
  let groupId = m.chat;

  // أمر تسجيل قائمة جديدة
  if (/^\.تسجيل_قائمة_([^\s]+)$/i.test(text)) {
    if (!isAdmin) return conn.reply(m.chat, "يجب أن تكون مشرفًا في المجموعة لاستخدام هذا الأمر.", m);
    
    let match = text.match(/^\.تسجيل_قائمة_([^\s]+)$/i);
    let listName = match[1];

    // الحصول على المشاركين والمشرفين في المجموعة
    let participants = (await conn.groupMetadata(groupId)).participants;
    let admins = participants.filter(p => p.admin === "admin").map(p => p.id);
    let allMembers = participants.map(p => p.id);
    
    // إنشاء القائمة وحفظها
    listsData[listName] = {
      admins: admins,  // مشرفين القروب
      members: allMembers,  // جميع أعضاء القروب
    };

    // حفظ البيانات في ملف JSON
    fs.writeFileSync('./listsData.json', JSON.stringify(listsData, null, 2));

    conn.reply(m.chat, `✅ تم تسجيل قائمة باسم "${listName}" بنجاح!`, m);
  }

  // أمر عرض القائمة
  else if (/^قائمة_([^\s]+)$/i.test(text)) {
    let match = text.match(/^قائمة_([^\s]+)$/i);
    let listName = match[1];

    if (!listsData[listName]) {
      return conn.reply(m.chat, "❌ القائمة غير موجودة!", m);
    }

    let list = listsData[listName];
    let replyMessage = `قائمة "${listName}":\n\n`;
    
    replyMessage += `مشرفين القروب:\n`;
    list.admins.forEach(id => {
      replyMessage += `${id}\n`;
    });

    replyMessage += `\nأعضاء القروب:\n`;
    list.members.forEach(id => {
      replyMessage += `${id}\n`;
    });

    conn.reply(m.chat, replyMessage, m);
  }

  // أمر إرسال رسالة إلى القائمة
  else if (/^\.رسالة_([^\s]+)_([^\s]+)$/i.test(text)) {
    let match = text.match(/^\.رسالة_([^\s]+)_([^\s]+)$/i);
    let listName = match[1];
    let messageContent = match[2];

    if (!listsData[listName]) {
      return conn.reply(m.chat, "❌ القائمة غير موجودة!", m);
    }

    let list = listsData[listName];
    let replyMessage = `إرسال الرسالة إلى قائمة "${listName}":\n${messageContent}\n\n`;
    
    // إرسال الرسالة إلى جميع الأعضاء والمشرفين
    let allUsers = [...list.admins, ...list.members];
    
    for (let userId of allUsers) {
      try {
        await conn.sendMessage(userId, { text: messageContent });
      } catch (e) {
        console.log(`فشل إرسال الرسالة إلى ${userId}: ${e.message}`);
      }
    }

    conn.reply(m.chat, `✅ تم إرسال الرسالة إلى جميع أعضاء القائمة "${listName}".`, m);
  }

  // إذا لم يكن النص مطابقًا لأي من الأوامر
  else {
    conn.reply(m.chat, "أمر غير صالح. استخدم .تسجيل_قائمة_اسم لتسجيل قائمة أو .رسالة_اسم [محتوى الرسالة] لإرسال رسالة.", m);
  }
};

// تعيين الأوامر التي يعمل بها البوت
handler.command = /^(تسجيل_قائمة|قائمة|رسالة)$/i;
export default handler;