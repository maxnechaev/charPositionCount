import figlet from 'figlet';
import chalk from 'chalk';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let textCache;
let caretPositionCache;

function setCaret(text, caretPosition) {
    const replacement = chalk.green(text.substr(caretPosition - 2, 1));
    text = text.substr(0, caretPosition - 2) + replacement + text.substr(caretPosition - 1, text.length);
    rl.write(text);
    console.log(chalk.yellow(`\nCaret is now at index ${chalk.green(caretPosition)}. Total char length is ${chalk.green(text.length)}`));
    rl.close();
}

function init() {
    rl.question(chalk.yellow('Enter caret index: '), function (caretPosition) {
        if (!caretPosition) {
            console.log(chalk.red('Caret index is not entered.'));
            init();
        } else {
            caretPosition = parseInt(caretPosition, 10);
            if (isNaN(caretPosition)) {
                console.log(chalk.red('Caret index should be numeric.'));
                init();
            } else {
                caretPositionCache = caretPosition;
                enterText();
            }
        }
    });
}

function enterText() {
    if (!!textCache) {
        setCaret(textCache, caretPositionCache);
    } else {
        rl.question(chalk.yellow('Please enter the text:\n'), function (text) {
            if (!text) {
                chalk.red('The text is not entered. Please enter the text:\n');
                enterText();
            } else {
                textCache = text;
                if (caretPositionCache > textCache.length) {
                    console.log(chalk.red(`Position ${caretPositionCache} is out of the text range.`));
                    init();
                } else {
                    setCaret(textCache, caretPositionCache);
                }
            }
        });
    }
}

rl.on('close', function () {
    console.log(chalk.cyan('\nBYE BYE !!!'));
    process.exit(0);
});

figlet.text('Char  Position  Count', {
    font: 'Ogre',
    whitespaceBreak: true
}, function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data);
    init();
});
