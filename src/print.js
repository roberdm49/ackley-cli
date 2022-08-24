const clc = require("cli-color");

const printTitle = (message) => console.log(clc.blackBright.bgBlueBright(message));

const printError = (message) => console.log(clc.redBright(message));

module.exports = { printTitle, printError };
