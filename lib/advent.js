export function depthIncrease(input) {
  let values = parseInput(input)
  return depthIncreaseNumbers(values)
}

export function depthIncreaseSliding(input) {
  let sets =
    parseInput(input)
    .map((value, index, array) => {
      if (index >= 2) return array[index - 2] + array[index - 1] + value
    })

  return depthIncreaseNumbers(sets)
}

function parseInput(s) {
  return s
    .split(/\s/)
    .map(value => parseInt(value))
}

function depthIncreaseNumbers(values) {
  return values
    .reduce((acc, current) => {
      let { prev, depthIncrease } = acc
      if (prev !== undefined && prev < current) depthIncrease += 1
      return { prev: current, depthIncrease }
    }, { depthIncrease: 0 })
    .depthIncrease
}
