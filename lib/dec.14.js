import _ from "lodash"

export function applyRulesQuickly(template, rules, maxDepth) {
  shingleString(template).reduce((histogram, shingle) => {
    applyRuleRecursively(rules, shingle, histogram, maxDepth, 0)
    return histogram
  }, createHistogram(template))
}

function applyRuleRecursively(rules, shingle, histogram, maxDepth, currentDepth) {

  let element = rules[shingle]
  histogram[element] ??= 0
  histogram[element]++

  let left = shingle[0] + element
  let right = element + shingle[1]

  if (currentDepth >= maxDepth) return
  applyRuleRecursively(rules, left, histogram, maxDepth, currentDepth + 1)
  applyRuleRecursively(rules, right, histogram, maxDepth, currentDepth + 1)

}

export function applyRules(template, rules, count) {
  let polymer = template
  for (let i = 0; i < count; i++) {
    polymer = applyRulesOnce(polymer, rules)
  }
  return polymer
}

export function createHistogram(polymer) {
  return polymer
    .split('')
    .reduce((histogram, element) => {
      histogram[element] ??= 0
      histogram[element]++
      return histogram
    }, {})
}

export function subtractMaxMin(histogram) {
  let max, min
  for (let prop in histogram) {
    let value = histogram[prop]
    max ??= value
    min ??= value
    if (value > max) max = value
    if (value < min) min = value
  }
  return max - min
}

export function applyRulesOnce(template, rules) {
  let shingles = shingleString(template)
  let elements = template.split('')
  let insertions = shingles.map(shingle => rules[shingle])
  return _.zip(elements, insertions).flat().join('')
}

export function shingleString(s) {
  let shingles = []
  for (let i = 0; i < s.length - 1; i++) shingles.push(s[i] + s[i + 1])
  return shingles
}