const fs = require('fs');

function writeHeaders (parameters, path) {
  const {dimensions, numberOfGenerations, populationSize, method, minValue, maxValue, elitismPercentage, tournamentPercentage} = parameters;
  const text = `
    \rDimensiones: ${dimensions}
    \rNúmero de generaciones: ${numberOfGenerations}
    \rTamaño de la población: ${populationSize}
    \rMétodo de selección de supervivientes: ${method}
    \rValor mínimo de variable: ${minValue}
    \rValor máximo de variable: ${maxValue}
    \rValor de metodo de selección: ${method === 'elitism' ? elitismPercentage : tournamentPercentage}
  `

  fs.appendFileSync(path, text)
}

function writeTitleAndTime (time, path) {
  fs.appendFileSync(path, `Run ejecutada en ${time/1000}s\n`);
}

function writeBestCandidate (candidate, generation, path) {
  fs.appendFileSync(path, `Mejor candidato (generacion  #${generation}) : ${JSON.stringify(candidate)}\n`);
}

function writeTitleForValues (path) {
  fs.appendFileSync(path, `\rValores de la run:\n`);
  

}

module.exports = { writeHeaders, writeTitleAndTime, writeBestCandidate, writeTitleForValues }
