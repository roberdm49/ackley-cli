const readlineSync = require('readline-sync');

const { validations } = require('./validations')
const { questions } = require('./questionMessages')
const { errors } = require('./errorMessages')

const { printTitle, printError } = require('./print');

const { fileLoader } = require('./fileLoader');
const { commandReader } = require('./commandReader');

const getUserInputValues = () => {

  const HELP_OPTION = '-?';
  const FILE_OPTION = '--file';

  const HELP_TEXT = `Opciones aceptadas:
    "-r": Cantidad de ejecuciones del algoritmo.
    "-d": Cantidad de dimensiones que usara el algoritmo.
    "-p": Cantidad de poblacion que usara el algoritmo.
    "-minv": Valor minimo de variable
    "-maxv": Valor maximo de variable
    "-s": Metodo de seleccion que usara el algoritmo (Se acepta t|T para torneo y e|E para elitismo).
    "-b": Sesgo de seleccion aplicado al metodo de seleccion
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
    minValue: values.minValue,
    maxValue: values.maxValue,
    method: values.selection === ('t' || 'T') ? 'tournament' : 'elitism',
    elitismPercentage: values.elitismPercentage,
    tournamentPercentage: values.tournamentVictories,
  }
}

module.exports = { printTitle, getUserInputValues }
