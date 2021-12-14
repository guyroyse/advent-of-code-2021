export function createPaper(coords) {

  let paper = []
  let maxX = 0, maxY = 0

  coords.forEach(coord => {
    let { x, y } = coord
    maxX = Math.max(maxX, x)
    maxY = Math.max(maxY, y)
    paper[y] ??= []
    paper[y][x] = true
  })

  for (let y = 0; y <= maxY; y++) {
    paper[y] ??= []
    for (let x = 0; x <= maxX; x++) {
      paper[y][x] = !!paper[y][x]
    }
  }

  return paper
}

export function foldMany(paper, folds) {
  return folds.reduce((prevPaper, fold) => {
    return foldPaper(prevPaper, fold.axis, fold.value)
  }, paper)
}

export function foldPaper(paper, axis, value) {
  if (axis === 'x') return foldLeft(paper, value)
  if (axis === 'y') return foldUp(paper, value)
}

export function foldLeft(paper, value) {
  
  return paper.map(row => {
    let newRow = [], leftIndex = value, rightIndex = value
    while (leftIndex > 0) {
      leftIndex--
      rightIndex++
      newRow[leftIndex] = row[leftIndex] || row[rightIndex]
    }
    return newRow
  })
}

export function foldUp(paper, value) {

  let newPaper = [], upIndex = value, downIndex = value

  while (upIndex > 0) {
    upIndex--
    downIndex++
    newPaper[upIndex] = mergeArray(paper[upIndex], paper[downIndex])
  }

  return newPaper
}

function mergeArray(a, b) {
  return a.map((value, index) => value || b[index])
}

export function countDots(paper) {
  return paper.flat().filter(b => b).length
}

export function countSpaces(paper) {
  return paper.flat().filter(b => !b).length
}

export function showDots(paper) {
  return paper.map(row => {
    return row.map(cell => cell ? '*' : ' ').join('')
  }).join('\n')
}
