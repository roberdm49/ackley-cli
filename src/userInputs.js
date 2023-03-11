const readlineSync = require('readline-sync');
const { questions } = require('./questionMessages')
const { errorMessages } = require('./errorMessages')
const { validations } = require('./validations')
const { printTitle, printError } = require('./print');
const { fileLoader } = require('./fileLoader');

const inputsInOrder = [
  'runs',
  'dimensions',
  'populationSize',
  'selection',
  'tournamentVictories',
  'elitismPercentage',
  'iterationsPerRun',
]

const getUserInputs = () => {
  const answers = {}
  const FILE_OPTION = 'fileOption'

  printTitle('Bienvenido/a al algoritmo evolutivo - Ackley')

  let userFileAnswer = null
  while (!validations[FILE_OPTION](userFileAnswer)) {
    const tempUserFileAnswer = readlineSync.question(questions[FILE_OPTION])
    if (validations[FILE_OPTION](tempUserFileAnswer)) {
      userFileAnswer = tempUserFileAnswer
    } else {
      printError(errorMessages[FILE_OPTION])
    }
  }

  if (userFileAnswer === 'a' || userFileAnswer === 'A') {
    const userPathFile = readlineSync.question('Ingrese el path para el archivo de configuracion \n')
    return fileLoader(userPathFile)
  }

  for (const field of inputsInOrder) {
    while(!validations[field](answers[field])) {
      const userAnswer = readlineSync.question(questions[field])
      if (validations[field](userAnswer)) {
        answers[field] = userAnswer
      } else {
        printError(errorMessages[field])
      }
    }
  }

  return answers
}

module.exports = { getUserInputs }
