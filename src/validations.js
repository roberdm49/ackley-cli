const isAPositiveNumber = (input) => !isNaN(input) && input > 0;
const selectionIsAValidOne = (input) => input.toLowerCase() === 't' || input.toLowerCase() === 'e';
const matchMinMax = (input, min, max) => input >= min && input <= max;
const isNumber = (input) => typeof input === 'number';
const isFileInputChar = (input) => input.toLowerCase() === 'm' || input.toLowerCase() === 'a'
const isNotNullOrUndefined = (input) => input !== null && input !== undefined

const validations = {
  fileOption: (input) => isNotNullOrUndefined(input) && isFileInputChar(input),
  runs: (input) => isNotNullOrUndefined(input) && isAPositiveNumber(parseInt(input)) && matchMinMax(parseInt(input), 1, 5),
  dimensions: (input) => isNotNullOrUndefined(input) && isAPositiveNumber(parseInt(input)) && matchMinMax(parseInt(input), 1, 50),
  populationSize: (input) => isNotNullOrUndefined(input) && isAPositiveNumber(parseInt(input)) && matchMinMax(parseInt(input), 10, 100000),
  minValue: (input) => isNotNullOrUndefined(input) && isNumber(parseInt(input)) && matchMinMax(parseInt(input), 1, 32768),
  maxValue: (input) => isNotNullOrUndefined(input) && isNumber(parseInt(input)) && matchMinMax(parseInt(input), 1, 32768),
  selection: (input) => isNotNullOrUndefined(input) && selectionIsAValidOne(input),
  tournamentVictories: (input) => isNotNullOrUndefined(input) && isAPositiveNumber(parseInt(input)) && matchMinMax(parseInt(input), 1, 10),
  elitismPercentage: (input) => isNotNullOrUndefined(input) && isAPositiveNumber(parseInt(input)) && matchMinMax(parseInt(input), 1, 100),
  iterationsPerRun: (input) => isNotNullOrUndefined(input) && isAPositiveNumber(parseInt(input)) && matchMinMax(parseInt(input), 1, 1000000),
}

module.exports = { validations }
