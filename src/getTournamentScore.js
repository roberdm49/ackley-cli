const getTournamentScore = (a, b) => {
  return a.fitness > b.fitness ? 1 : 0
}

module.exports = { getTournamentScore };
