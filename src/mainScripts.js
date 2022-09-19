const readlineSync = require('readline-sync');

const { validations } = require('./validations')
const { questions } = require('./questionMessages')
const { errors } = require('./errorMessages')

const { printTitle, printError } = require('./print');

const { fileLoader } = require('./fileLoader');

const getUserInputValues = () => {
  const INITIAL_STATE = {
    runs: 1,
    dimensions: 1,
    populationSize: 120,
    selection: 'e',
    tournamentVictories: 5,
    elitismPercentage: 10,
    iterationsPerRun: 100000,
  };
  
  const values = {};

  /*
  
  for (const field of Object.keys(INITIAL_STATE)) {
    if (field === 'tournamentVictories' && values.selection === ('e' || 'E')) {
      // do nothing
    } else if (field === 'elitismPercentage' && values.selection === ('t' || 'T')) {
      // do nothing
    } else {
      let value = readlineSync.question(questions[field]);
      value = field === 'selection' ? value : parseInt(value);
      const validation = validations[field];
      while (!validation(value)) {
        printError(errors[field]);
        value = readlineSync.question(questions[field]);
      }
      values[field] = value;
    }
  }
  */

  const { runs, dimensions, populationSize, selection, tournamentVictories, elitismPercentage, iterationsPerRun } = fileLoader();

  return {
    dimensions,
    numberOfGenerations: iterationsPerRun,
    populationSize,
    method: selection === ('t' || 'T') ? 'tournament' : 'elitism',
    elitismPercentage,
    tournamentPercentage: tournamentVictories,
  }
}

module.exports = { printTitle, getUserInputValues }
