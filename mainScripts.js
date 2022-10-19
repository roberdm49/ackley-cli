const readlineSync = require('readline-sync');

const { validations } = require('./validations')
const { questions } = require('./questionMessages')
const { errors } = require('./errorMessages')

const { printTitle, printError } = require('./print');

const { fileLoader } = require('./fileLoader');
const { commandReader } = require('./commandReader');

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

  const HELP_OPTION = '-?';
  const FILE_OPTION = '--file';

  const HELP_TEXT = `Opciones aceptadas:
    "-r": Cantidad de ejecuciones del algoritmo.
    "-d": Cantidad de dimensiones que usara el algoritmo.
    "-p": Cantidad de poblacion que usara el algoritmo.
    "-s": Metodo de seleccion que usara el algoritmo (Se acepta t|T para torneo y e|E para elitismo).
    "-i": Cantidad de iteraciones por ejecucion que usara el algoritmo.
    "--file": Establece los parametros del algoritmo desde un archivo.
  `; 

  const arguments = process.argv.slice(2);
  let values; //{ runs, dimensions, populationSize, selection, tournamentVictories, elitismPercentage, iterationsPerRun };
  
  if(arguments[0] === FILE_OPTION) {
    values = fileLoader();
  } else if (arguments[0] === HELP_OPTION || arguments.length === 0){
      console.log(HELP_TEXT);
      return null;    
  } else {
    values = commandReader(arguments);
  }

  return {
    dimensions: values.dimensions,
    numberOfGenerations: values.iterationsPerRun,
    populationSize: values.populationSize,
    method: values.selection === ('t' || 'T') ? 'tournament' : 'elitism',
    elitismPercentage: values.elitismPercentage,
    tournamentPercentage: values.tournamentVictories,
  }
}

module.exports = { printTitle, getUserInputValues }
