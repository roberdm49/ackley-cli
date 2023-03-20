const Habitant = require('./Habitant');
const { getTournamentScore } = require('./getTournamentScore')
const { shuffle } = require('./shuffle')
const { getMultipleRandomIntFromIntervalWithoutDuplicates } = require('./randomFromInterval')
const ELITISM = 'elitism';
const TOURNAMENT = 'tournament';

const BEST_DISCERNIBLE = 40
const WORST_DISCERNIBLE = -40

const DEFAULT_OPTIONS = {
  elitismPercentage: 10,
  tournamentPercentage: 10,
  tournamentComparisonCount: 5,
}

class HabitantsCluster {
  constructor({ dimensions, populationSize, initializedHabitants = [], minValue, maxValue }) {
    this.populationSize = populationSize
    this.minValue = minValue
    this.maxValue = maxValue

    if (initializedHabitants?.length) {
      this.listOfHabitants = initializedHabitants
    } else {
      let listOfHabitants = []
      for (let i = 0; i < populationSize; i++) {
        listOfHabitants.push(new Habitant({ dimensions, minValue, maxValue }))
      }
      this.listOfHabitants = listOfHabitants
    }
  }
  
  selectByElitism = (parents, childrens, options = DEFAULT_OPTIONS) => {
    const { elitismPercentage } = options
    const populationSize = parents.length
  
    const allHabitants = [...parents, ...childrens].sort((a, b) => a.fitness - b.fitness)
  
    const elitismCeil = Math.floor(parents.length * (elitismPercentage / 100))
    const elitismRest = parents.length - elitismCeil
  
    const elitismHabitants = allHabitants.slice(0, elitismCeil)
    const restOfHabitantsForNextGenerations = shuffle(allHabitants.slice(elitismCeil)).slice(0, elitismRest)
  
    const nextGeneration = [...elitismHabitants, ...restOfHabitantsForNextGenerations]
    const newCluster = new HabitantsCluster({ dimensions: 0, populationSize, initializedHabitants: nextGeneration }) 
    return newCluster;
  }
  
  selectByTournament = (parents, childrens, options = DEFAULT_OPTIONS) => {
    const { tournamentComparisonCount, tournamentPercentage } = options
    const populationSize = parents.length
    
    const tournamentCeil = Math.floor(parents.length * (tournamentPercentage / 100))
    const tournamentRest = parents.length - tournamentCeil
  
    const allHabitants = [...parents, ...childrens]
  
    const allHabitantsWithScore = allHabitants.map(habitant => {
      const indexes = getMultipleRandomIntFromIntervalWithoutDuplicates(0, allHabitants.length - 1, tournamentComparisonCount)
      let score = 0
  
      for (const index of indexes) {
        const indexedElem = allHabitants[index]
        score = getTournamentScore(habitant, indexedElem)
      }
  
      return { habitant, score }
    })
  
    const habitantsWinnersOfTheTournament = allHabitantsWithScore.sort((a, b) => b.score - a.score).slice(0, tournamentCeil).map(elem => elem.habitant)
    const restOfHabitantsForNextGenerations = shuffle(allHabitantsWithScore.map(elem => elem.habitant).slice(tournamentCeil)).slice(0, tournamentRest)
  
    const nextGeneration = [...habitantsWinnersOfTheTournament, ...restOfHabitantsForNextGenerations]
    const newCluster = new HabitantsCluster({ dimensions: 0, populationSize, initializedHabitants: nextGeneration, minValue: this.minValue, maxValue: this.maxValue }) 
    return newCluster;
  }

  getHabitants() {
    // return [...this.listOfHabitants]
    return this.listOfHabitants
  }

  getPopulationSize() {
    return this.populationSize
  }

  getChildrens() {
    let childrens = []
    for (const habitant of this.listOfHabitants) {
      childrens.push(habitant.getChildren())
    }
    return childrens
  }

  getBest() {
    let bestFitness = BEST_DISCERNIBLE
    let bestValues = {}

    for (const habitant of this.listOfHabitants) {
      const currentFitness = habitant.getFitness()

      if (currentFitness < bestFitness) {
        bestFitness = currentFitness
        bestValues = habitant
      }
    }

    return {
      text: `Fitness: ${bestFitness} | Valores: [${bestValues.values}] | Desviaciones: [${bestValues.deviations}]`,
      fitness: bestFitness
    }
  }

  getNextGeneration(method) {
    const childrens = this.getChildrens()
    switch(method) {
      case ELITISM:
        const selectedNextGenerationByElitism = this.selectByElitism(this.listOfHabitants, childrens)
        return selectedNextGenerationByElitism
      case TOURNAMENT:
        const selectedNextGenerationByTournament = this.selectByTournament(this.listOfHabitants, childrens)
        return selectedNextGenerationByTournament
      default:
        return new HabitantsCluster({ dimensions: 0, populationSize: this.populationSize, minValue: this.minValue, maxValue: this.maxValue })
    }
  }
}

module.exports = HabitantsCluster;
