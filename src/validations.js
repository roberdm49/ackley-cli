const isAPositiveNumber = (input) => !isNaN(input) && input > 0;
const selectionIsAValidOne = (input) => input.toLowerCase() === 't' || input.toLowerCase() === 'e';
const matchMinMax = (input, min, max) => input >= min && input <= max;
const isNumber = (input) => typeof input === 'number';

const validations = {
  runs: (input) => isAPositiveNumber(input) && matchMinMax(input, 1, 5),
  dimensions: (input) => isAPositiveNumber(input) && matchMinMax(input, 1, 50),
  populationSize: (input) => isAPositiveNumber(input) && matchMinMax(input, 10, 100000),
  selection: (input) => selectionIsAValidOne(input),
  tournamentVictories: (input) => isAPositiveNumber(input) && matchMinMax(input, 1, 10),
  elitismPercentage: (input) => isAPositiveNumber(input) && matchMinMax(input, 1, 100),
  iterationsPerRun: (input) => isAPositiveNumber(input) && matchMinMax(input, 1, 1000000),
  minValue: (input) => isNumber(input) && matchMinMax(input, -32768, 32768),
  maxValue: (input) => isNumber(input) && matchMinMax(input, -32768, 32768),
}

module.exports = { validations }
