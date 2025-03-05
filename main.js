process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1' 
import './confshawarma.js' 
import { createRequire } from 'module'
import path, { join } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import { platform } from 'process'
import * as ws from 'ws'
import { readdirSync, statSync, unlinkSync, existsSync, readFileSync, rmSync, watch } from 'fs'
import yargs from 'yargs'
import { spawn } from 'child_process'
import lodash from 'lodash'
import chalk from 'chalk'
import fs from 'fs'
import { watchFile, unwatchFile } from 'fs'  
import syntaxerror from 'syntax-error'
import { tmpdir } from 'os'
import { format } from 'util'
import P from 'pino'
import pino from 'pino'
import Pino from 'pino'
import { Boom } from '@hapi/boom'
import { makeWASocket, protoType, serialize } from './lib/simple.js'
import {Low, JSONFile} from 'lowdb'
import { mongoDB, mongoDBV2 } from './lib/mongoDB.js'
import store from './lib/store.js'
import readline from 'readline'
import NodeCache from 'node-cache'
import boxen from 'boxen'
import pkg from 'google-libphonenumber'
const { PhoneNumberUtil } = pkg
const phoneUtil = PhoneNumberUtil.getInstance()
const { DisconnectReason, useMultiFileAuthState, MessageRetryMap, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, jidNormalizedUser } = await import('@whiskeysockets/baileys')
const { CONNECTING } = ws
const { chain } = lodash
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000

protoType()
serialize()

global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') {
return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString();
}; global.__dirname = function dirname(pathURL) {
return path.dirname(global.__filename(pathURL, true));
}; global.__require = function require(dir = import.meta.url) {
return createRequire(dir);
};

global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({...query, ...(apikeyqueryname ? {[apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name]} : {})})) : '')
global.timestamp = { start: new Date }

const __dirname = global.__dirname(import.meta.url)

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
global.prefix = new RegExp('^[' + (opts['prefix'] || '*/i!#$%+£¢€¥^°=¶∆×÷π√✓©®&.\\-.@').replace(/[|\\{}()[\]^$+*.\-\^]/g, '\\$&') + ']');

//global.db = new Low(/https?:\/\//.test(opts['db'] || '') ? new cloudDBAdapter(opts['db']) : new JSONFile(`${opts._[0] ? opts._[0] + '_' : ''}database.json`));
global.db = new Low(/https?:\/\//.test(opts['db'] || '') ? new cloudDBAdapter(opts['db']) : new JSONFile('database.json'))

global.DATABASE = global.db
global.loadDatabase = async function loadDatabase() {
if (global.db.READ) {
return new Promise((resolve) => setInterval(async function() {
if (!global.db.READ) {
clearInterval(this);
resolve(global.db.data == null ? global.loadDatabase() : global.db.data);
}}, 1 * 1000));
}
if (global.db.data !== null) return;
global.db.READ = true;
await global.db.read().catch(console.error);
global.db.READ = null;
global.db.data = {
users: {},
chats: {},
stats: {},
msgs: {},
sticker: {},
settings: {},
...(global.db.data || {}),
};
global.db.chain = chain(global.db.data);
};
loadDatabase();

global.chatgpt = new Low(new JSONFile(path.join(__dirname, '/db/chatgpt.json')));
global.loadChatgptDB = async function loadChatgptDB() {
if (global.chatgpt.READ) {
return new Promise((resolve) =>
setInterval(async function() {
if (!global.chatgpt.READ) {
clearInterval(this);
resolve( global.chatgpt.data === null ? global.loadChatgptDB() : global.chatgpt.data );
}}, 1 * 1000));
}
if (global.chatgpt.data !== null) return;
global.chatgpt.READ = true;
await global.chatgpt.read().catch(console.error);
global.chatgpt.READ = null;
global.chatgpt.data = {
users: {},
...(global.chatgpt.data || {}),
};
global.chatgpt.chain = lodash.chain(global.chatgpt.data);
};
loadChatgptDB();

global.authFile = `ShawarmaBotsSesson`
global.authFileJB = `serbot`

const {state, saveState, saveCreds} = await useMultiFileAuthState(global.authFile)
const msgRetryCounterMap = (MessageRetryMap) => { }
const msgRetryCounterCache = new NodeCache()
const {version} = await fetchLatestBaileysVersion()

let phoneNumber = global.botNumberCode
const methodCodeQR = process.argv.includes("qr")
const methodCode = !!phoneNumber || process.argv.includes("code")
const MethodMobile = process.argv.includes("mobile")

const rl = readline.createInterface({
input: process.stdin,
output: process.stdout,
terminal: true,
})
const question = (texto) => {
rl.clearLine(rl.input, 0)
return new Promise((resolver) => {
rl.question(texto, (respuesta) => {
rl.clearLine(rl.input, 0)
resolver(respuesta.trim())
})})
}

const colores = chalk.bold.green
const opcionQR = chalk.bgBlue.white
const opcionTexto = chalk.bgMagenta.white
let opcion
if (methodCodeQR) {
opcion = '1'
}
if (!methodCodeQR && !methodCode && !fs.existsSync(`./${authFile}/creds.json`)) {
do {
opcion = await question(colores('اختر:\n') + opcionQR('1. كيوار\n') + opcionTexto('2. كود8\n--> '))
if (!/^[1-2]$/.test(opcion)) {
console.log(chalk.bold.redBright(`أرقام أخرى غير مسموح بها ${chalk.bold.greenBright("1")} O ${chalk.bold.greenBright("2")}, لا توجد رسائل أو رموز خاصة.\n${chalk.bold.yellowBright("نصيحة: انسخ رقم الخيار والصقه في وحدة التحكم.")}`))
}} while (opcion !== '1' && opcion !== '2' || fs.existsSync(`./${authFile}/creds.json`))
}

const filterStrings = [
"Q2xvc2luZyBzdGFsZSBvcGVu", // "Closing stable open"
"Q2xvc2luZyBvcGVuIHNlc3Npb24=", // "Closing open session"
"RmFpbGVkIHRvIGRlY3J5cHQ=", // "Failed to decrypt"
"U2Vzc2lvbiBlcnJvcg==", // "Session error"
"RXJyb3I6IEJhZCBNQUM=", // "Error: Bad MAC" 
"RGVjcnlwdGVkIG1lc3NhZ2U=" // "Decrypted message" 
]

//console.info = () => {} 
//console.debug = () => {} 
//['log', 'warn', 'error'].forEach(methodName => redefineConsoleMethod(methodName, filterStrings))

// Verificar si se debe reintentar enviar un mensaje
const shouldRetryMessage = (msgKey) => {
const retryCount = msgRetryCounterCache.get(msgKey.id) || 0
if (retryCount >= 3) return false // Máximo 3 intentos
msgRetryCounterCache.set(msgKey.id, retryCount + 1)
return true
}

const connectionOptions = {
logger: pino({ level: 'silent' }),
printQRInTerminal: opcion == '1' ? true : methodCodeQR ? true : false,
mobile: MethodMobile, 
browser: opcion == '1' ? ['shawarmaCOde', 'Edge', '2.0.0'] : methodCodeQR ? ['shawarmaCOde', 'Edge', '2.0.0'] : ['Ubuntu', 'Edge', '110.0.1587.56'],
auth: {
creds: state.creds,
keys: makeCacheableSignalKeyStore(state.keys, Pino({ level: "fatal" }).child({ level: "fatal" })),
},
markOnlineOnConnect: true, 
generateHighQualityLinkPreview: true, 
syncFullHistory: true,
//getMessage: async (clave) => {
//let jid = jidNormalizedUser(clave.remoteJid)
//let msg = await store.loadMessage(jid, clave.id)
//return msg?.message || ""
//},
getMessage: async (clave) => {
try {
let jid = jidNormalizedUser(clave.remoteJid)
let msg = await store.loadMessage(jid, clave.id)
return msg?.message || ""
} catch (e) {
console.error(`Error al cargar mensaje de ${clave.remoteJid}:`, e.message)
if (e.message.includes("Bad MAC")) {
console.warn("تم اكتشاف مشكلة في مفاتيح الجلسة. قد تكون إعادة المزامنة ضرورية.")
}
return null
}},
msgRetryCounterCache, // Resolver mensajes en espera
msgRetryCounterMap, // Determinar si se debe volver a intentar enviar un mensaje o no
defaultQueryTimeoutMs: 30000,
version,  
}

global.conn = makeWASocket(connectionOptions)
if (!fs.existsSync(`./${authFile}/creds.json`)) {
if (opcion === '2' || methodCode) {
opcion = '2'
if (!conn.authState.creds.registered) {
let addNumber
if (!!phoneNumber) {
addNumber = phoneNumber.replace(/[^0-9]/g, '')
} else {
do {
phoneNumber = await question(chalk.bgBlack(chalk.bold.greenBright(`الرجاء إدخال رقم الواتساب.\n${chalk.bold.yellowBright("نصيحة: انسخ رقم WhatsApp والصقه في وحدة التحكم.")}\n${chalk.bold.yellowBright("مثال: 201550680822")}\n${chalk.bold.magentaBright('---> ')}`)))
phoneNumber = phoneNumber.replace(/\D/g,'')
if (!phoneNumber.startsWith('+')) {
phoneNumber = `+${phoneNumber}`
}
} while (!await isValidPhoneNumber(phoneNumber))
rl.close()
addNumber = phoneNumber.replace(/\D/g, '')

setTimeout(async () => {
let codeBot = await conn.requestPairingCode(addNumber)
codeBot = codeBot?.match(/.{1,4}/g)?.join("-") || codeBot
console.log(chalk.bgBlueBright.bold.white('رمز الربط:'), chalk.bold.white(chalk.white(codeBot)))
}, 2000)
}}}
}

conn.isInit = false
conn.well = false

if (!opts['test']) {
if (global.db) setInterval(async () => {
if (global.db.data) await global.db.write()
if (opts['autocleartmp'] && (global.support || {}).find) (tmp = [os.tmpdir(), 'tmp', authFileJB], tmp.forEach(filename => cp.spawn('find', [filename, '-amin', '2', '-type', 'f', '-delete'])))}, 30 * 1000)}
if (opts['server']) (await import('./server.js')).default(global.conn, PORT)

async function getMessage(key) {
if (store) {
} return {
conversation: 'SimpleBot',
}}

async function connectionUpdate(update) {  
const {connection, lastDisconnect, isNewLogin} = update
global.stopped = connection
if (isNewLogin) conn.isInit = true
const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode
if (code && code !== DisconnectReason.loggedOut && conn?.ws.socket == null) {
await global.reloadHandler(true).catch(console.error)
//console.log(await global.reloadHandler(true).catch(console.error));
global.timestamp.connect = new Date
}
if (global.db.data == null) loadDatabase()
if (update.qr != 0 && update.qr != undefined || methodCodeQR) {
if (opcion == '1' || methodCodeQR) {
console.log(chalk.bold.yellow(`\n✅قم بمسح رمز الاستجابة السريعة الذي تنتهي صلاحيته خلال 45 ثانية`))}
}
if (connection == 'open') {
console.log(boxen(chalk.bold(' متصل بالواتس اب! '), { borderStyle: 'round', borderColor: 'green', title: chalk.green.bold('● الاتصال ●'), titleAlignment: 'center', float: 'center' }))}
let reason = new Boom(lastDisconnect?.error)?.output?.statusCode
if (connection === 'close') {
if (reason === DisconnectReason.badSession) {
console.log(chalk.bold.cyanBright(`\n⚠️ غير متصل، حذف المجلد ${global.authFile} ومسح رمز الاستجابة السريعة ⚠️`))
} else if (reason === DisconnectReason.connectionClosed) {
console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ☹\n┆ ⚠️ اتصال مغلق، إعادة الاتصال....\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ☹`))
await global.reloadHandler(true).catch(console.error)
} else if (reason === DisconnectReason.connectionLost) {
console.log(chalk.bold.blueBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ☂\n┆ ⚠️ تم فقدان الاتصال بالخادم، وإعادة الاتصال....\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ☂`))
await global.reloadHandler(true).catch(console.error)
} else if (reason === DisconnectReason.connectionReplaced) {
console.log(chalk.bold.yellowBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ✗\n┆ ⚠️ تم استبدال الاتصال، وتم فتح جلسة جديدة أخرى، يرجى إغلاق الجلسة الحالية أولاً.\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ✗`))
} else if (reason === DisconnectReason.loggedOut) {
console.log(chalk.bold.redBright(`\n⚠️ غير متصل، حذف المجلد ${global.authFile} قم بمسح رمز الاستجابة السريعة ⚠️`))
await global.reloadHandler(true).catch(console.error)
} else if (reason === DisconnectReason.restartRequired) {
console.log(chalk.bold.cyanBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ✓\n┆ ❇️ الاتصال بالخادم...\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ✓`))
await global.reloadHandler(true).catch(console.error)
} else if (reason === DisconnectReason.timedOut) {
console.log(chalk.bold.yellowBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ▸\n┆ ⌛ انتهت مهلة الاتصال، جارٍ إعادة الاتصال....\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ▸`))
await global.reloadHandler(true).catch(console.error) //process.send('reset')
} else {
console.log(chalk.bold.redBright(`\n⚠️❗ سبب قطع الاتصال غير معروف: ${reason || 'No encontrado'} >> ${connection || 'No encontrado'}`))
}}
}
process.on('uncaughtException', console.error)

let isInit = true
let handler = await import('./handler.js')
global.reloadHandler = async function(restatConn) {
try {
const Handler = await import(`./handler.js?update=${Date.now()}`).catch(console.error)
if (Object.keys(Handler || {}).length) handler = Handler
} catch (e) {
console.error(e)
}
if (restatConn) {
const oldChats = global.conn.chats
try {
global.conn.ws.close()
} catch { }
conn.ev.removeAllListeners()
global.conn = makeWASocket(connectionOptions, {chats: oldChats})
isInit = true
}
if (!isInit) {
conn.ev.off('messages.upsert', conn.handler)
conn.ev.off('group-participants.update', conn.participantsUpdate)
conn.ev.off('groups.update', conn.groupsUpdate)
conn.ev.off('message.delete', conn.onDelete)
conn.ev.off('call', conn.onCall)
conn.ev.off('connection.update', conn.connectionUpdate)
conn.ev.off('creds.update', conn.credsUpdate)
}

//Información para Grupos

conn.welcome = '❃━═━═✦•〘⚡〙•✦═━═━❃\n*♥︎•⇓﷽ رســـالة ترحـــيب⇓•♥︎*\n\n*~ يـــا أهـــلا وســـهلا بك في نقابة  يــشــرفـــنـا بـــمـن هـو ممـــيز ، تقبلـــ/ـي تحـــياتـــنا وتقـــديرنـا ومرحـــبا بڪ ضمـــن عائلـــتنا المتــواضـــعــہ♥︎*\n*~ نتـــمنى مشـــارڪـــتڪ °وتفـــاعـــلڪ وابداعـــڪ༺.*\n❃━═━═✦•〘⚡〙•✦═━═━❃\n*⊢❉ المـــنـشـن╎❯〖@user〗*\n*⊢❉ نقـــابة╎❯〖@subject〗*\n❃━═━═✦•〘⚡〙•✦═━═━❃\n*⊢❉ الـــوصف╎❯*\n@desc',
conn.bye = '❃━═━═✦•〘⚡〙•✦═━═━❃\n*♥︎•⇓﷽ رســـالة مـغــادره ⇓•♥︎*\n*⊢❉〖@user〗*\n**⊢❉ اتــمــنــي ان تــكــون اســتــمـتـعـت مـعـنـا*\n❃━═━═✦•〘⚡〙•✦═━═━❃'
conn.spromote = '[⚡]⌯ @user لــقــد اصــبــحــت زعــيــمــا'
conn.sdemote = '[⚡]⌯ @user تــعــال يـالــعــضــو'
conn.sDesc = '[⚡]⌯ تــم تـحـديـث وصــف الــجــروب\n\n⌯ الــوصــف الــجــديــد : @desc'
conn.sSubject = '[⚡]⌯ تـــم تــغــيــر اســم الــجــروب\n⌯ الــاســم الــجــديــد : @subject'
conn.sIcon = '[⚡]⌯ تـــم تــغــيــر صــوره الــمــجــمــوعـــه'
conn.sRevoke = '[⚡]⌯ تــم تـغـيـر رابــط الـمـجـمــوعــه\n⌯ الــرابــط الـجـديـد : @revoke';

conn.handler = handler.handler.bind(global.conn)
conn.participantsUpdate = handler.participantsUpdate.bind(global.conn)
conn.groupsUpdate = handler.groupsUpdate.bind(global.conn)
conn.onDelete = handler.deleteUpdate.bind(global.conn)
conn.onCall = handler.callUpdate.bind(global.conn)
conn.connectionUpdate = connectionUpdate.bind(global.conn)
conn.credsUpdate = saveCreds.bind(global.conn, true)

conn.ev.on('messages.upsert', conn.handler)
conn.ev.on('group-participants.update', conn.participantsUpdate)
conn.ev.on('groups.update', conn.groupsUpdate)
conn.ev.on('message.delete', conn.onDelete)
conn.ev.on('call', conn.onCall)
conn.ev.on('connection.update', conn.connectionUpdate)
conn.ev.on('creds.update', conn.credsUpdate)
isInit = false
return true
}

const pluginFolder = global.__dirname(join(__dirname, './plugins/index'));
const pluginFilter = (filename) => /\.js$/.test(filename);
global.plugins = {};
async function filesInit() {
for (const filename of readdirSync(pluginFolder).filter(pluginFilter)) {
try {
const file = global.__filename(join(pluginFolder, filename));
const module = await import(file);
global.plugins[filename] = module.default || module;
} catch (e) {
conn.logger.error(e);
delete global.plugins[filename];
}}}
filesInit().then((_) => Object.keys(global.plugins)).catch(console.error)

global.reload = async (_ev, filename) => {
if (pluginFilter(filename)) {
const dir = global.__filename(join(pluginFolder, filename), true)
if (filename in global.plugins) {
if (existsSync(dir)) conn.logger.info(`تم تحديث البرنامج المساعد للتو: '${filename}'`)
else {
conn.logger.warn(`تمت إزالة البرنامج المساعد للتو: '${filename}'`)
return delete global.plugins[filename]
}
} else conn.logger.info(`Nuevo plugin: '${filename}'`)
const err = syntaxerror(readFileSync(dir), filename, {
sourceType: 'module',
allowAwaitOutsideFunction: true,
});
if (err) conn.logger.error(`خطأ في بناء الجملة عند التحميل '${filename}'\n${format(err)}`)
else {
try {
const module = (await import(`${global.__filename(dir)}?update=${Date.now()}`))
global.plugins[filename] = module.default || module;
} catch (e) {
conn.logger.error(`Error require plugin '${filename}\n${format(e)}'`)
} finally {
global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)))
}}}};
Object.freeze(global.reload)
watch(pluginFolder, global.reload)
await global.reloadHandler()
async function _quickTest() {
const test = await Promise.all([
spawn('ffmpeg'),
spawn('ffprobe'),
spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
spawn('convert'),
spawn('magick'),
spawn('gm'),
spawn('find', ['--version']),
].map((p) => {
return Promise.race([
new Promise((resolve) => {
p.on('close', (code) => {
resolve(code !== 127)
});
}),
new Promise((resolve) => {
p.on('error', (_) => resolve(false))
})]);
}));
const [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test
const s = global.support = {ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find}
Object.freeze(global.support)
}

function clearTmp() {
const tmpDir = join(__dirname, 'tmp')
const filenames = readdirSync(tmpDir)
filenames.forEach(file => {
const filePath = join(tmpDir, file)
unlinkSync(filePath)})
}

/*function purgeSession() {
let prekey = []
let directorio = readdirSync(`./${authFile}`)
let filesFolderPreKeys = directorio.filter(file => {
return file.startsWith('pre-key-')
})
prekey = [...prekey, ...filesFolderPreKeys]
filesFolderPreKeys.forEach(files => {
unlinkSync(`./${authFile}/${files}`)
})
} 

function purgeSessionSB() {
try {
const listaDirectorios = readdirSync(`./${authFileJB}/`);
let SBprekey = [];
listaDirectorios.forEach(directorio => {
if (statSync(`./${authFileJB}/${directorio}`).isDirectory()) {
const DSBPreKeys = readdirSync(`./${authFileJB}/${directorio}`).filter(fileInDir => {
return fileInDir.startsWith('pre-key-')
})
SBprekey = [...SBprekey, ...DSBPreKeys];
DSBPreKeys.forEach(fileInDir => {
if (fileInDir !== 'creds.json') {
unlinkSync(`./${authFileJB}/${directorio}/${fileInDir}`)
}})
}})
if (SBprekey.length === 0) {
console.log(chalk.bold.green(`\n╭» 🟡 shawarmaserbots 🟡\n│→ NADA POR ELIMINAR \n╰― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― 🗑️♻️`))
} else {
console.log(chalk.bold.cyanBright(`\n╭» ⚪ shawarmaserbots ⚪\n│→ ARCHIVOS NO ESENCIALES ELIMINADOS\n╰― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― 🗑️♻️`))
}} catch (err) {
console.log(chalk.bold.red(`\n╭» 🔴 shawarmaserbots 🔴\n│→ OCURRIÓ UN ERROR\n╰― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― 🗑️♻️\n` + err))
}}

function purgeOldFiles() {
const directories = [`./${authFile}/`, `./${authFileJB}/`]
directories.forEach(dir => {
readdirSync(dir, (err, files) => {
if (err) throw err
files.forEach(file => {
if (file !== 'creds.json') {
const filePath = path.join(dir, file);
unlinkSync(filePath, err => {
if (err) {
console.log(chalk.bold.red(`\n╭» 🔴 ARCHIVO 🔴\n│→ ${file} NO SE LOGRÓ BORRAR\n╰― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― 🗑️❌\n` + err))
} else {
console.log(chalk.bold.green(`\n╭» 🟣 ARCHIVO 🟣\n│→ ${file} BORRADO CON ÉXITO\n╰― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― 🗑️♻️`))
} }) }
}) }) }) }*/

function redefineConsoleMethod(methodName, filterStrings) {
const originalConsoleMethod = console[methodName]
console[methodName] = function() {
const message = arguments[0]
if (typeof message === 'string' && filterStrings.some(filterString => message.includes(atob(filterString)))) {
arguments[0] = ""
}
originalConsoleMethod.apply(console, arguments)
}}

setInterval(async () => {
if (stopped === 'close' || !conn || !conn.user) return
await clearTmp()
console.log(chalk.bold.cyanBright(`\n╭جار التحديث`))}, 1000 * 60 * 4) // 4 min 

//setInterval(async () => {
//if (stopped === 'close' || !conn || !conn.user) return
//await purgeSession()
//console.log(chalk.bold.cyanBright(`\n╭» 🔵 ${global.authFile} 🔵\n│→ السيسون م شغاله شكلها`))}, 1000 * 60 * 10) // 10 min

//setInterval(async () => {
//if (stopped === 'close' || !conn || !conn.user) return
//await purgeSessionSB()}, 1000 * 60 * 10) 

//setInterval(async () => {
//if (stopped === 'close' || !conn || !conn.user) return
//await purgeOldFiles()
//console.log(chalk.bold.cyanBright(`\n╭» 🟠 ARCHIVOS 🟠\n│→ ARCHIVOS RESIDUALES ELIMINADAS\n╰― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― 🗑️♻️`))}, 1000 * 60 * 10)

_quickTest().then(() => conn.logger.info(chalk.bold(`✨ CARGANDO...\n`.trim()))).catch(console.error)

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
unwatchFile(file)
console.log(chalk.bold.greenBright("خطا ف 'shawarma.js' جار الخروج".trim()))
import(`${file}?update=${Date.now()}`)
})

async function isValidPhoneNumber(number) {
try {
number = number.replace(/\s+/g, '')
// Si el número empieza con '+521' o '+52 1', quitar el '1'
if (number.startsWith('+20')) {
number = number.replace('+201', '+20'); // Cambiar +521 a +52
} else if (number.startsWith('+20') && number[4] === '1') {
number = number.replace('+20 1', '+20'); // Cambiar +52 1 a +52
}
const parsedNumber = phoneUtil.parseAndKeepRawInput(number)
return phoneUtil.isValidNumber(parsedNumber)
} catch (error) {
return false
}}
