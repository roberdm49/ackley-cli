const fs = require('fs');
const { printTitle, getUserInputValues } = require('./mainScripts');
const { writeHeaders, writeTitleAndTime } = require('./writer')
const Runner = require('./Runner')

printTitle('Bienvenido/a al algoritmo evolutivo - Ackley');
const start = new Date()
const values = getUserInputValues();

if(values){
  const { runs } = values
  const runBaseFileName = new Date().toLocaleString()
    .replaceAll('/', '-')
    .replaceAll(':', '_')

  for (let i = 0; i < runs; i++) {
    const runner = new Runner(values);
    const result = runner.run();
    const end = new Date()
    
    const filename = runs === 1
      ? `Run, ${runBaseFileName}.txt`
      : `Run_${i}, ${runBaseFileName}.txt`
    
    fs.writeFileSync(filename, '');
    writeTitleAndTime(end - start, filename);
    writeHeaders(values, filename);
    fs.appendFile(filename, JSON.stringify(result, null, 2), function () {
      console.log('Run cargada')
    });
  }
}
