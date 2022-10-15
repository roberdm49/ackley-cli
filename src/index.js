const fs = require('fs');
const { printTitle, getUserInputValues } = require('./mainScripts');
const { writeHeaders, writeTitleAndTime } = require('./writer')
const Runner = require('./Runner')

printTitle('Bienvenido/a al algoritmo evolutivo - Ackley');
const start = new Date()
const values = getUserInputValues();

if(values){
  const runner = new Runner(values);
  const result = runner.run();
  const end = new Date()
  
  fs.writeFileSync('res.txt', '');
  writeTitleAndTime(end - start, 'res.txt');
  writeHeaders(values, 'res.txt');
  fs.appendFile('res.txt', JSON.stringify(result, null, 2), function () {
    console.log('Run cargada')
  });
  
  console.log(values)
}
