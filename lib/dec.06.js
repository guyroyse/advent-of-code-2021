export function computePopulation(num, input) {
  let population = [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ]

  let initialGeneration = parseInput(input)
  initialGeneration.forEach(age => population[age]++)

  for (let i = 0; i < num; i++) {
    let newPopulation = []
    newPopulation[8] = population[0]
    newPopulation[7] = population[8]
    newPopulation[6] = population[7] + population[0]
    newPopulation[5] = population[6]
    newPopulation[4] = population[5]
    newPopulation[3] = population[4]
    newPopulation[2] = population[3]
    newPopulation[1] = population[2]
    newPopulation[0] = population[1]
    population = newPopulation
  }

  return population.reduce((total, count) => total + count)
}

export function parseInput(s) {
  return s
    .split(',')
    .map(value => parseInt(value))
    .filter(number => !isNaN(number))
}
