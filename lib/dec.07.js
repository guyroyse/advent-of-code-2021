import _ from 'lodash'

export function computeLeastFuel(input) {
  let positions = parseInput(input)
  let min = _.min(positions)
  let max = _.max(positions)
  let allCosts = []

  for (let i = min; i <= max; i++) {
    let cost = _(positions)
      .map(position => Math.abs(position - i))
      .sum()
    allCosts.push(cost)
  }

  return _.min(allCosts)
}

function parseInput(s) {
  return s
  .split(',')
  .map(value => parseInt(value))
  .filter(number => !isNaN(number))
}
