const HabitantsCluster = require('./HabitantsCluster');
console.log("HABITANT CLUSTER IN RUNNER?")
console.log(HabitantsCluster)
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

    if (numberOfGenerations < 1) return { best: null, worst: null, average: null }

    let population = new HabitantsCluster(dimensions, populationSize)

    const firstStatistics = population.getStatistics()

    let listOfBest = [firstStatistics.best.fitness]
    let listOfWorst = [firstStatistics.worst.fitness]
    let listOfAverage = [firstStatistics.average]

    let bestHabitant = {
      best: {
        fitness: 40,
        fields: {
          values: [],
          deviations: []
        }
      },
      worst: {
        fitness: -40,
        fields: {
          values: [],
          deviations: []
        }
      },
      average: {
        fitness: 0
      }
    }
    let worstHabitant = {
      best: {
        fitness: 40,
        fields: {
          values: [],
          deviations: []
        }
      },
      worst: {
        fitness: -40,
        fields: {
          values: [],
          deviations: []
        }
      },
      average: {
        fitness: 0
      }
    }

    let acumBest = 0
    let acumWorst = 0

    let averageAverage = 0

    for (let i = 1; i < numberOfGenerations; i++) {
      population = population.getNextGeneration(method)

      const { best, worst, average } = population.getStatistics()

      if (best.fitness < bestHabitant.best.fitness) {
        bestHabitant.best.fields = best.habitant
        bestHabitant.best.fitness = best.fitness
      }

      if (best.fitness > bestHabitant.worst.fitness) {
        bestHabitant.worst.fitness = best.fitness
        bestHabitant.worst.fields = best.habitant
      }

      if (worst.fitness > worstHabitant.worst.fitness) {
        worstHabitant.worst.fitness = worst.fitness
        worstHabitant.worst.fields = worst.habitant
      }

      if (worst.fitness < worstHabitant.best.fitness) {
        worstHabitant.best.fitness = worst.fitness
        worstHabitant.best.fields = worst.habitant
      }

      acumBest += best.fitness
      acumWorst += worst.fitness
      averageAverage += average

      listOfBest.push(best.fitness)
      listOfWorst.push(worst.fitness)
      listOfAverage.push(average)
    }

    bestHabitant.average.fitness = acumBest / numberOfGenerations
    worstHabitant.average.fitness = acumWorst / numberOfGenerations

    averageAverage = averageAverage / numberOfGenerations

    return {
      best: listOfBest,
      worst: listOfWorst,
      average: listOfAverage,
      bestHabitant,
      worstHabitant,
      averageAverage
    }
  }
}

module.exports = Runner
