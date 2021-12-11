export function findSyncedGeneration(genZero) {

  let genNext = genZero

  let i = 0
  while (true) {
    i++
    genNext = computeGeneration(genNext)
    let synced = genNext.flat().every(cell => cell === 0)
    if (synced) return i
  }
}

export function computeGenerations(genZero, numOfGens) {
  let genNext = genZero
  let flashCount = 0

  for (let gen = 0; gen < numOfGens; gen++) {
    genNext = computeGeneration(genNext)
    flashCount += genNext.flat().filter(cell => cell === 0).length
  }
  return { flashCount, finalGeneration: genNext }
}

function computeGeneration(gen) {

  let nextGen = gen.map(row => row.map(cell => cell + 1))

  let needsToFlash = nextGen.some(row => row.some(cell => cell > 9))
  while (needsToFlash) {
    flashGeneration(nextGen)
    needsToFlash = nextGen.some(row => row.some(cell => cell > 9))
  }
  nextGen = nextGen.map(row => row.map(cell => Math.max(cell, 0)))
  return nextGen
}

function flashGeneration(array) {
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      if (lookup(array, x, y) > 9) {
        flashCell(array, x, y)
      }
    }
  }
}

function flashCell(array, x, y) {
  for(let x1 = x - 1; x1 <= x + 1; x1++ ) {
    for(let y1 = y - 1; y1 <= y + 1; y1++ ) {
      if (x1 === x && y1 === y) {
        array[x1][y1] = -1
      } else {
        if (x1 >= 0 && x1 <= 9 && y1 >= 0 && y1 <= 9) {
          if (array[x1][y1] !== -1) array[x1][y1]++
        }
      }
    }
  }
}

function lookup(array, x, y) {
  return array[x][y]
}

