import { join, dirname } from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { setupMaster, fork } from 'cluster';
import { watchFile, unwatchFile } from 'fs';
import cfonts from 'cfonts';
import { createInterface } from 'readline';
import boxen from 'boxen';
import yargs from 'yargs';
import chalk from 'chalk';
import readline from 'readline';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(__dirname);
const { name, author, version, description, collaborators } = require(join(__dirname, './package.json'));
const rl = createInterface(process.stdin, process.stdout);

console.log(chalk.bold('✨ جاري التحميل...'));

const subtitleStyle = chalk.white.bold;
const responseStyle = chalk.dim.bold;

let activeCollaborators = '';
for (const key in collaborators) {
    if (collaborators.hasOwnProperty(key)) {
        activeCollaborators += collaborators[key] + '، ';
    }
}
activeCollaborators = activeCollaborators.slice(0, -2);

const screenRows = process.stdout.rows;
const fallingTextFrames = [];
const targetWord = "SHAWARMA BOT MD";

for (let i = 0; i < targetWord.length; i++) {
    fallingTextFrames.push({
        char: targetWord[i],
        row: -Math.floor(Math.random() * screenRows),
        col: i + Math.floor((process.stdout.columns - targetWord.length) / 2)
    });
}

function drawFrame() {
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
    const lines = Array.from({ length: screenRows }, () => Array(process.stdout.columns).fill(' ').join(''));

    fallingTextFrames.forEach((frame) => {
        if (frame.row >= 0 && frame.row < screenRows) {
            lines[frame.row] =
                lines[frame.row].substring(0, frame.col) + frame.char +
                lines[frame.row].substring(frame.col + 1);
        }
        frame.row++;
    });

    process.stdout.write(lines.join('\n'));

    if (fallingTextFrames.every((frame) => frame.row >= screenRows)) {
        clearInterval(animationInterval);
        launchMain();
    }
}

const animationInterval = setInterval(drawFrame, 100);

function launchMain() {
    cfonts.say(description, {
        font: 'console',
        align: 'center',
        gradient: ['green', 'cyan']
    });

    const message = `${subtitleStyle('تم التطوير بواسطة »')} ${responseStyle(author.name)}\n` +
        `${subtitleStyle('مبني على الكود بواسطة »')} ${responseStyle(collaborators.col1 || 'غير متاح')}\n` +
        `${subtitleStyle('المساهمون النشطون »')} ${responseStyle(activeCollaborators)}\n` +
        `${subtitleStyle('الإصدار »')} ${responseStyle(version)}`;

    console.log(boxen(message, {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'yellow',
        backgroundColor: 'black'
    }));

    start('main.js');
}

let isRunning = false;

async function start(file) {
    if (isRunning) return;
    isRunning = true;
    const currentFilePath = new URL(import.meta.url).pathname;
    const args = [join(__dirname, file), ...process.argv.slice(2)];

    setupMaster({
        exec: args[0],
        args: args.slice(1),
    });

    const processInstance = fork();

    processInstance.on('message', (data) => {
        switch (data) {
            case 'reset':
                processInstance.process.kill();
                isRunning = false;
                start(file);
                break;
            case 'uptime':
                processInstance.send(process.uptime());
                break;
        }
    });

    processInstance.on('exit', (code) => {
        isRunning = false;
        console.log(chalk.bgRedBright('💥 خطأ:'), code);
        start('main.js');

        if (code === 0) return;
        watchFile(args[0], () => {
            unwatchFile(args[0]);
            start(file);
        });
    });

    const opts = yargs(process.argv.slice(2)).exitProcess(false).parse();
    if (!opts['test'] && !rl.listenerCount()) {
        rl.on('line', (line) => {
            processInstance.emit('message', line.trim());
        });
    }
}
