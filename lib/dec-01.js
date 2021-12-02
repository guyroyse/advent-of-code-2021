export function countDepthIncreases(input) {
  let values = parseInput(input)
  return countDepthIncreasesFromNumbers(values)
}

export function countDepthIncreasesSliding(input) {
  let slidingSets =
    parseInput(input)
    .map((value, index, array) => {
      if (index >= 2) return array[index - 2] + array[index - 1] + value
    })

  return countDepthIncreasesFromNumbers(slidingSets)
}

function parseInput(s) {
  return s
    .split(/\s/)
    .map(value => parseInt(value))
}

function countDepthIncreasesFromNumbers(values) {
  return values
    .reduce((acc, current) => {
      let { prev, depthIncrease } = acc
      if (prev !== undefined && prev < current) depthIncrease += 1
      return { prev: current, depthIncrease }
    }, { depthIncrease: 0 })
    .depthIncrease
}
