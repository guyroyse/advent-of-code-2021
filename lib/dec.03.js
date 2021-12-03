export function calculatePowerConsumption(input) {

  let bitSets = input
    .split('\n')
    .map(s => {
      let bitStrings = s.split('')
      let bits = bitStrings.map(bitString => parseInt(bitString))
      return bits
    })

  let length = bitSets.length

  let onesCounts = bitSets
    .reduce((accum, current) => {
      current.forEach((bit, index) => accum[index] = (accum[index] ?? 0) + bit)
      return accum
    }, [])

  let zerosCounts = onesCounts.map(count => length - count)

  let gammaBits = onesCounts
    .map((oneCount, index) => {
      let zeroCount = zerosCounts[index]
      return oneCount > zeroCount ? 1 : 0
    })
    .join('')

  let gamma = parseInt(gammaBits, 2)
  let epsilon = 4095 - gamma
  let power = gamma * epsilon

  return { gamma, epsilon, power }
}