export function computePart1(input) {
  let ledSets = parseInput(input).map(line => line.leds)
  return countAllKnownNumbers(ledSets)
}

export function parseInput(input) {
  return input.split("\n").map(line => parseLine(line))
}

export function parseLine(line) {
  let [ left, right ] = line.split(' | ')
  let wires = left.split(' ')
  let leds = right.split(' ')
  return { wires, leds }
}

export function countAllKnownNumbers(ledSets) {
  return ledSets
    .map(set => countKnownNumbers(set))
    .reduce((total, count) => total + count)
}

export function countKnownNumbers(leds) {
  return countSegments(leds).filter(count => count === 2 || count === 3 || count === 4 || count === 7 ).length
}

export function countSegments(leds) {
  return leds.map(led => led.length)
}

export function convertToBits(wires) {
  return wires.map(digit => {
    let bits = 0
    if (digit.includes('a')) bits |= 0b0000001
    if (digit.includes('b')) bits |= 0b0000010
    if (digit.includes('c')) bits |= 0b0000100
    if (digit.includes('d')) bits |= 0b0001000
    if (digit.includes('e')) bits |= 0b0010000
    if (digit.includes('f')) bits |= 0b0100000
    if (digit.includes('g')) bits |= 0b1000000
    return bits
  })
}

export function convertToNumbers(wires) {

  let bitSet = convertToBits(wires)
  let answer = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]

  let oneIndex = wires.findIndex(wireSet => wireSet.length === 2)
  let fourIndex = wires.findIndex(wireSet => wireSet.length === 4)
  let sevenIndex = wires.findIndex(wireSet => wireSet.length === 3)
  let eightIndex = wires.findIndex(wireSet => wireSet.length === 7)

  let oneBits = bitSet[oneIndex]
  let fourBits = bitSet[fourIndex]
  let sevenBits = bitSet[sevenIndex]
  let eightBits = bitSet[eightIndex]
  let oneXorFourBits = (fourBits ^ oneBits)

  answer[oneIndex] = 1
  answer[fourIndex] = 4
  answer[sevenIndex] = 7
  answer[eightIndex] = 8

  wires.forEach((wireSet, index) => {
    let bits = bitSet[index]
    if (wireSet.length === 5) {
      if ((bits & oneBits) === oneBits) {
        answer[index] = 3
      } else {
        if ((bits & oneXorFourBits) === oneXorFourBits) {
          answer[index] = 5
        } else {
          answer[index] = 2
        }
      }
    } else if (wireSet.length === 6) {
      if ((bits & oneBits) !== oneBits) {
        answer[index] = 6
      } else {
        if ((bits & fourBits) === fourBits) {
          answer[index] = 9
        } else {
          answer[index] = 0
        }
      }
    }
  })

  return answer
}
