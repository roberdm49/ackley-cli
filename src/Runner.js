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
    const { dimensions, numberOfGenerations, populationSize, method, minValue, maxValue } = this
    let population = new HabitantsCluster({ dimensions, populationSize, minValue, maxValue })
    let iterationBestCandidate = population.getBest()
    let generationOfBest = null
    let runBestCandidate = iterationBestCandidate
    const listOfBest = [`Generacion 0 (inicial) => ${iterationBestCandidate.text}`]

    for (let i = 1; i < numberOfGenerations; i++) {
      population = population.getNextGeneration(method)
      iterationBestCandidate = population.getBest()
      listOfBest.push(`Generacion ${i} => ${iterationBestCandidate.text}`)

      if (iterationBestCandidate.fitness < runBestCandidate.fitness) {
        runBestCandidate = iterationBestCandidate
        generationOfBest = i
      }
    }
    return {
      iterations: listOfBest,
      best: runBestCandidate.text,
      generationOfBest
    };
  }
}

module.exports = Runner
