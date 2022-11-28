const fs = require('fs')
const HabitantsCluster = require('./HabitantsCluster');

class Runner {
  constructor({ dimensions, numberOfGenerations, populationSize, method, elitismPercentage, tournamentPercentage, minValue, maxValue }) {
    this.dimensions = dimensions
    this.numberOfGenerations = numberOfGenerations
    this.populationSize = populationSize
    this.method = method
    this.elitismPercentage = elitismPercentage
    this.tournamentPercentage = tournamentPercentage
    this.minValue = minValue
    this.maxValue = maxValue
  }

  run() {
    const { dimensions, numberOfGenerations, populationSize, method, minValue, maxValue, elitismPercentage, tournamentPercentage } = this
    let population = new HabitantsCluster({ dimensions, populationSize, minValue, maxValue })
    const listOfBest = [`Generacion 0 (inicial) => ${population.getBest()}`]

    for (let i = 1; i < numberOfGenerations; i++) {
      population = population.getNextGeneration(method)
      listOfBest.push(`Generacion ${i} => ${population.getBest()}`)
    }
    return listOfBest;
  }
}

module.exports = Runner
