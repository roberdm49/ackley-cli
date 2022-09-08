const fs = require('fs');

function writeHeaders (parameters, path) {
  const {dimensions, numberOfGenerations, populationSize, method, elitismPercentage, tournamentPercentage} = parameters;
  const text = `
    \rDimensiones: ${dimensions}
    \rNúmero de generaciones: ${numberOfGenerations}
    \rTamaño de la población: ${populationSize}
    \rMétodo de selección de supervivientes: ${method}
    \rValor de metodo de selección: ${method === 'elitism' ? elitismPercentage : tournamentPercentage}
    \rValores de la run:
  `

  fs.appendFileSync(path, text)
}

function writeTitleAndTime (time, path) {
  fs.appendFileSync(path, `Run ejecutada en ${time/1000}s\n`);
}

module.exports = { writeHeaders, writeTitleAndTime }
