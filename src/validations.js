const isAPositiveNumber = (input) => !isNaN(input) && input > 0;
const selectionIsAValidOne = (input) => input.toLowerCase() === 't' || input.toLowerCase() === 'e';
const matchMinMax = (input, min, max) => input >= min && input <= max;
const isNumber = (input) => typeof input === 'number';
const isFileInputChar = (input) => input === 'm' || input === 'M' || input === 'a' || input === 'A'
const isNotNullOrUndefined = (input) => input !== null && input !== undefined

const validations = {
  fileOption: (input) => isNotNullOrUndefined(input) && isFileInputChar(input),
  runs: (input) => isNotNullOrUndefined(input) && isAPositiveNumber(input) && matchMinMax(input, 1, 5),
  dimensions: (input) => isNotNullOrUndefined(input) && isAPositiveNumber(input) && matchMinMax(input, 1, 50),
  populationSize: (input) => isNotNullOrUndefined(input) && isAPositiveNumber(input) && matchMinMax(input, 10, 100000),
  selection: (input) => isNotNullOrUndefined(input) && selectionIsAValidOne(input),
  tournamentVictories: (input) => isNotNullOrUndefined(input) && isAPositiveNumber(input) && matchMinMax(input, 1, 10),
  elitismPercentage: (input) => isNotNullOrUndefined(input) && isAPositiveNumber(input) && matchMinMax(input, 1, 100),
  iterationsPerRun: (input) => isNotNullOrUndefined(input) && isAPositiveNumber(input) && matchMinMax(input, 1, 1000000),
  minValue: (input) => isNotNullOrUndefined(input) && isNumber(input) && matchMinMax(input, -32768, 32768),
  maxValue: (input) => isNotNullOrUndefined(input) && isNumber(input) && matchMinMax(input, -32768, 32768),
}

module.exports = { validations }
