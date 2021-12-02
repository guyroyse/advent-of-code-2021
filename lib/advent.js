export function depthIncrease(input) {
  return input
    .split(/\s/)
    .map(value => parseInt(value))
    .reduce((acc, current) => {
      let { prev, depthIncrease } = acc
      if (prev !== undefined && prev < current) depthIncrease += 1
      return { prev: current, depthIncrease }
    }, { depthIncrease: 0 })
    .depthIncrease
}
