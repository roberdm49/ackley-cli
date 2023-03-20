const fs = require('fs');
const { getUserInputs } = require('./userInputs')
const { writeHeaders, writeTitleAndTime, writeBestCandidate, writeTitleForValues } = require('./writer')
const { getFormattedDate } = require('./utilities')
const Runner = require('./Runner')

const values = getUserInputs()

if(values){
  const { runs } = values
  const runBaseFileName = getFormattedDate(new Date())

  for (let i = 0; i < runs; i++) {
    const runner = new Runner(values);
    const start = new Date()
    const result = runner.run();
    const { iterations, best, generationOfBest } = result
    const end = new Date()
    
    const filename = runs === 1
      ? `Run, ${runBaseFileName}.txt`
      : `Run_${i + 1}, ${runBaseFileName}.txt`
    
    fs.writeFileSync(filename, '');
    writeTitleAndTime(end - start, filename);
    writeHeaders(values, filename);
    writeBestCandidate(best, generationOfBest, filename)
    writeTitleForValues(filename)
    fs.appendFile(filename, JSON.stringify(iterations, null, 2), function () {
      console.log('Run cargada')
    });
  }
}
