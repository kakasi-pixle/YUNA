import { createCanvas, loadImage } from 'canvas'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default function welcomePlugin(client) {
  client.on('group_participants_changed', async (update) => {
    if (update.action !== 'add') return
    try {
      const chat = await client.getChatById(update.jid)
      const groupMemberCount = chat.participants.length
      for (const participant of update.participants) {
        let profilePicUrl
        try {
          profilePicUrl = await client.getProfilePicUrl(participant)
        } catch {
          profilePicUrl = path.join(__dirname, '../assets/default_profile.png')
        }
        const welcomeText = 'نورت الجروب'
        const imageBuffer = await generateWelcomeImage(profilePicUrl, groupMemberCount, welcomeText)
        await chat.sendMessage(imageBuffer, { caption: '' })
      }
    } catch (err) {
      console.error(err)
    }
  })
}

async function generateWelcomeImage(profilePicUrl, groupMemberCount, welcomeText) {
  const width = 800, height = 400
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  const bgPath = path.join(__dirname, '../assets/welcome_background.png')
  const bgImage = await loadImage(bgPath)
  ctx.drawImage(bgImage, 0, 0, width, height)

  let profilePic
  try {
    profilePic = await loadImage(profilePicUrl)
  } catch {
    profilePic = await loadImage(path.join(__dirname, '../assets/default_profile.png'))
  }

  const picSize = 150
  const picX = (width - picSize) / 2
  const picY = 40
  ctx.save()
  ctx.beginPath()
  ctx.arc(picX + picSize / 2, picY + picSize / 2, picSize / 2, 0, Math.PI * 2)
  ctx.closePath()
  ctx.clip()
  ctx.drawImage(profilePic, picX, picY, picSize, picSize)
  ctx.restore()

  ctx.fillStyle = '#ffffff'
  ctx.textAlign = 'center'
  ctx.font = 'bold 40px Arial'
  ctx.fillText(welcomeText, width / 2, picY + picSize + 50)
  ctx.font = '30px Arial'
  ctx.fillText(`عدد الأعضاء: ${groupMemberCount}`, width / 2, picY + picSize + 100)

  return canvas.toBuffer()
}
