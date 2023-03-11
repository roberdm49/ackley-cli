const clc = require("cli-color");

const printTitle = (message) => console.log(clc.blackBright.bgBlueBright(`${message} \n`));

const printError = (message) => console.log(clc.redBright(`${message} \n`));

module.exports = { printTitle, printError };
