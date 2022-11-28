const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const randomFloatFromInterval = (min, max) => {
  return Math.random() * (max - min + 1) + min
}

const randomFloatTruncatedFromInterval = (min, max) => {
  return (Math.random() * (max - min + 1) + min).toFixed(7)
}

const getMultipleRandomIntFromIntervalWithoutDuplicates = (min, max, quantity) => {
  let numbers = []

  for (let i = 0; i < quantity; i++) {
    let number = randomIntFromInterval(min, max)
    while (numbers.includes(number)) {
      number = randomIntFromInterval(min, max)
    }
    numbers.push(number)
  }

  return numbers
}

module.exports = { randomIntFromInterval, randomFloatFromInterval, getMultipleRandomIntFromIntervalWithoutDuplicates, randomFloatTruncatedFromInterval };
