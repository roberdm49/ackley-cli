const { getAckleyFit } = require('./getAckleyFit');
const { randomFloatFromInterval } = require('./randomFromInterval');

const MIN_DEVIATION = 1
const MAX_DEVIATION = 5

class Habitant {
  constructor({ dimensions, minValue, maxValue }) {
    let values = []
    let deviations = []
    this.minValue = minValue
    this.maxValue = maxValue
    for (let i = 0; i < dimensions; i++) {
      values.push(randomFloatFromInterval(this.minValue, this.maxValue))
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
    return (value > this.maxValue || value < this.minValue)
  }

  getChildren() {
    const ALPHA = 0.2
    let values = []
    let deviations = []

    for (let i = 0; i < this.values.length; i++) {
      const normalizedDeviator = Math.random()
      let mutatedValue = Math.floor(this.values[i] + this.deviations[i] * normalizedDeviator)
      let mutatedDeviation = this.deviations[i] * (1 + ALPHA * normalizedDeviator)

      /*
      if (this.deviationIsOutOfLimits(mutatedDeviation)) {
        mutatedDeviation = randomFloatFromInterval(MIN_DEVIATION, MAX_DEVIATION)
      }

      if (this.valueIsOutOfLimits(mutatedValue)) {
        console.log({mutatedValue})
        mutatedValue = randomFloatFromInterval(this.minValue, this.maxValue)
      }
      */

      values.push(mutatedValue)
      deviations.push(mutatedDeviation)
    }

    const dimensionBasedInTheCurrentHabitants = this.values.length
    return new Habitant({ dimensions: dimensionBasedInTheCurrentHabitants, minValue: this.minValue, maxValue: this.maxValue })
  }
}

module.exports = Habitant
