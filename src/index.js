const fs = require('fs');
const { printTitle, getUserInputValues } = require('./mainScripts');
const Runner = require('./Runner')

printTitle('Bienvenido/a al algoritmo evolutivo - Ackley');
const values = getUserInputValues();
const runner = new Runner(values);
const result = runner.run();

fs.writeFileSync('res.txt', JSON.stringify(result, null, 2));

console.log(values)
