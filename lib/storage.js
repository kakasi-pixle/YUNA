import { Low, JSONFile } from 'lowdb'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const filePath = path.join(__dirname, '../database/storage.json')
const adapter = new JSONFile(filePath)
const db = new Low(adapter)

await db.read()
db.data ||= {
  commands: {},
  inventory: {
    swords: 0,     // السيوف
    coins: 0,      // العملات
    diamonds: 0,   // الالماس
    boxes: 0,      // الصناديق
    ducks: 0,      // البط
    animals: 0,    // الحيوانات
    chickens: 0,   // الفراخ
    eggs: 0,       // البيض
    health: 0,     // الصحة
    drinks: 0,     // المشروبات
    armors: 0      // الدروع
  }
}
await db.write()

export async function getCommandData(commandName) {
  await db.read()
  if (!db.data.commands[commandName]) {
    db.data.commands[commandName] = {}
    await db.write()
  }
  return db.data.commands[commandName]
}

export async function setCommandData(commandName, newData) {
  await db.read()
  db.data.commands[commandName] = newData
  await db.write()
}

// دوال لإدارة المخزون (inventory)
export async function getInventory() {
  await db.read()
  return db.data.inventory
}

export async function updateInventory(newInventory) {
  await db.read()
  db.data.inventory = { ...db.data.inventory, ...newInventory }
  await db.write()
}
