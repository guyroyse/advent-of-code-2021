export function calculatePowerConsumption(input) {

  let bitSets = parseInput(input)

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

export function calculateLifeSupportRating(input) {
  let bitSets = parseInput(input)

  let o2 = computeO2(bitSets)
  let co2 = computeCO2(bitSets)
  let lifeSupport = o2 * co2

  return { o2, co2, lifeSupport}
}

function parseInput(input) {
  return input
    .split('\n')
    .map(s => {
      let bitStrings = s.split('')
      let bits = bitStrings.map(bitString => parseInt(bitString))
      return bits
    })
}

function computeO2(bitSets, depth = 0) {
  return computerGasLevel(bitSets, (lowCount, highCount) => highCount >= lowCount ? 1 : 0, depth)
}

function computeCO2(bitSets, depth = 0) {
  return computerGasLevel(bitSets, (lowCount, highCount) => highCount < lowCount ? 1 : 0, depth)
}

function computerGasLevel(bitSets, gimmeTheBit, depth) {
  let [ lowBitsCount, highBitsCount ] = countBothBitsAt(bitSets, depth)

  let bitToFind = gimmeTheBit(lowBitsCount, highBitsCount)
  let newBitSet = bitSets.filter(bitSet => bitSet[depth] === bitToFind)

  if (newBitSet.length === 1) return parseInt(newBitSet[0].join(''), 2)

  return computerGasLevel(newBitSet, gimmeTheBit, depth + 1)
}

function countBothBitsAt(bitSets, position) {
  return [ 0, 1 ]
    .map(bitValue => countBitsAt(bitSets, position, bitValue))
}

function countBitsAt(bitSets, position, bitValue) {
  return bitSets
    .map(bitSet => bitSet[position])
    .filter(bit => bit === bitValue)
    .length
}
