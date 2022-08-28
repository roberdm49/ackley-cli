const HabitantsCluster = require('./HabitantsCluster');

class Runner {
  constructor({ dimensions, numberOfGenerations, populationSize, method, elitismPercentage, tournamentPercentage }) {
    this.dimensions = dimensions
    this.numberOfGenerations = numberOfGenerations
    this.populationSize = populationSize
    this.method = method
    this.elitismPercentage = elitismPercentage
    this.tournamentPercentage = tournamentPercentage
  }

  run() {
    const { dimensions, numberOfGenerations, populationSize, method, elitismPercentage, tournamentPercentage } = this

    let population = new HabitantsCluster(dimensions, populationSize)
    let listOfBest = [population.getBest()]

    for (let i = 1; i < numberOfGenerations; i++) {
      population = population.getNextGeneration(method)
      listOfBest.push(population.getBest())
    }

    return {
      best: listOfBest,
    }
  }
}

module.exports = Runner
