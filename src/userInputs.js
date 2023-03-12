const readlineSync = require('readline-sync');
const { questions } = require('./questionMessages')
const { errorMessages } = require('./errorMessages')
const { validations } = require('./validations')
const { printTitle, printError } = require('./print');
const { fileLoader } = require('./fileLoader');

const inputsInOrder = Object.keys(questions).filter(option => option !== 'fileOption')

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

  if (userFileAnswer.toLowerCase() === 'a') {
    const userPathFile = readlineSync.question('Ingrese el path para el archivo de configuracion \n')
    return fileLoader(userPathFile)
  }

  for (const field of inputsInOrder) {
    if (field === 'tournamentVictories') {
      if (answers.selection.toLowerCase() === 't') {
        while(!validations[field](answers[field])) {
          const userAnswer = readlineSync.question(questions[field])
          if (validations[field](userAnswer)) {
            answers[field] = userAnswer
          } else {
            printError(errorMessages[field])
          }
        }
      }
    } else if (field === 'elitismPercentage') {
      if (answers.selection.toLowerCase() === 'e') {
        while(!validations[field](answers[field])) {
          const userAnswer = readlineSync.question(questions[field])
          if (validations[field](userAnswer)) {
            answers[field] = userAnswer
          } else {
            printError(errorMessages[field])
          }
        }
      }
    } else {
      while(!validations[field](answers[field])) {
        const userAnswer = readlineSync.question(questions[field])
        if (validations[field](userAnswer)) {
          answers[field] = userAnswer
        } else {
          printError(errorMessages[field])
        }
      }
    }
  }

  return {
    runs: answers.runs,
    dimensions: answers.dimensions,
    numberOfGenerations: answers.iterationsPerRun,
    populationSize: answers.populationSize,
    minValue: parseInt(- answers.minValue),
    maxValue: answers.maxValue,
    method: answers.selection === ('t' || 'T') ? 'tournament' : 'elitism',
    elitismPercentage: answers.elitismPercentage,
    tournamentPercentage: answers.tournamentVictories,
  }
}

module.exports = { getUserInputs }
