const { getAckleyFit } = require('./getAckleyFit');
const { randomFloatFromInterval } = require('./randomFromInterval');

const MIN_VALUE = -32768
const MAX_VALUE = 32768

const MIN_DEVIATION = 1
const MAX_DEVIATION = 5

class Habitant {
  constructor(dimension) {
    let values = []
    let deviations = []
    for (let i = 0; i < dimension; i++) {
      values.push(randomFloatFromInterval(MIN_VALUE, MAX_VALUE))
      deviations.push(randomFloatFromInterval(MIN_DEVIATION, MAX_DEVIATION))
    }

    this.values = values
    this.deviations = deviations
    this.fitness = getAckleyFit(values)
  }

  getFitness() {
    return this.fitness
  }

  deviationIsOutOfLimits(deviation) {
    return (deviation > MAX_DEVIATION || deviation < MIN_DEVIATION)
  }

  valueIsOutOfLimits(value) {
    return (value > MAX_VALUE || value < MIN_VALUE)
  }

  getChildren() {
    const ALPHA = 0.2
    let values = []
    let deviations = []

    for (let i = 0; i < this.values.length; i++) {
      const normalizedDeviator = Math.random()
      let mutatedValue = Math.floor(this.values[i] + this.deviations[i] * normalizedDeviator)
      let mutatedDeviation = this.deviations[i] * (1 + ALPHA * normalizedDeviator)

      if (this.deviationIsOutOfLimits(mutatedDeviation)) {
        mutatedDeviation = randomFloatFromInterval(MIN_DEVIATION, MAX_DEVIATION)
      }

      if (this.valueIsOutOfLimits(mutatedValue)) {
        mutatedValue = randomFloatFromInterval(MIN_VALUE, MAX_VALUE)
      }

      values.push(mutatedValue)
      deviations.push(mutatedDeviation)
    }

    const dimensionBasedInTheCurrentHabitants = this.values.length
    return new Habitant(dimensionBasedInTheCurrentHabitants)
  }
}

module.exports = Habitant
