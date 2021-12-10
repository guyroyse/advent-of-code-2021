const matchedTokens = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
}

export function corruptedPoints(input) {
  let counterHash = {}

  let lines = input.split('\n')
  lines.forEach(line => {
    let tokens = line.split('')
    let stack = []
    tokens.forEach(token => {
      if ('([{<'.includes(token)) {
        stack.push(token)
      } else {
        let poppedToken = stack.pop()
        if (matchedTokens[poppedToken] !== token) {
          counterHash[token] = (counterHash[token] ?? 0) + 1
        }
      }
    })
  })

  let total = 0
  total += counterHash[')'] * 3
  total += counterHash[']'] * 57
  total += counterHash['}'] * 1197
  total += counterHash['>'] * 25137

  return total
}

export function incompletePoints(input) {

  let totals = []

  let lines = input.split('\n')
  lines.forEach(line => {
    let tokens = line.split('')
    let stack = []
    let corrupted = false
    tokens.forEach(token => {
      if ('([{<'.includes(token)) {
        stack.push(token)
      } else {
        let poppedToken = stack.pop()
        if (matchedTokens[poppedToken] !== token) {
          corrupted = true
        }
      }
    })

    let lineTotal = 0
    if (!corrupted) {
      lineTotal += stack.reverse().reduce((total, token) => {
        if (token === '(') return total * 5 + 1
        if (token === '[') return total * 5 + 2
        if (token === '{') return total * 5 + 3
        if (token === '<') return total * 5 + 4
      }, 0)
    }

    if (lineTotal !== 0) totals.push(lineTotal)
  })

  let sorted = totals.sort((a, b) => a > b ? 1 : -1)

  let total = sorted[Math.floor(sorted.length / 2)]


  return total
}