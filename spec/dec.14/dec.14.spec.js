import { sampleTemplate, sampleRules, realTemplate, realRules } from "./data" 
import { applyRules, applyRulesQuickly, createHistogram, subtractMaxMin, applyRulesOnce, shingleString } from "../../lib/dec.14"

describe("December 14", () => {

  it("shingles a string", () => {
    let shingles = shingleString('ABCDEF')
    expect(shingles).toEqual([ 'AB', 'BC', 'CD', 'DE', 'EF' ])
  })

  it("applies a rule to a polymer template", () => {
    let polymer = applyRulesOnce(sampleTemplate, sampleRules)
    expect(polymer).toBe('NCNBCHB')
  })

  it("applies a rule to a polymer template multiple times", () => {
    let polymer = applyRules(sampleTemplate, sampleRules, 10)
    expect(polymer).toHaveLength(3073)
  })

  it("creates a histogram of a polymer", () => {
    let histogram = createHistogram("AAAABBBCCD")
    expect(histogram.A).toBe(4)
    expect(histogram.B).toBe(3)
    expect(histogram.C).toBe(2)
    expect(histogram.D).toBe(1)
  })

  it("subtracts the max and the min from a histogram", () => {
    let histogram = { A: 4, B: 3, C: 2, D: 1 }
    let difference = subtractMaxMin(histogram)
    expect(difference).toBe(3)
  })

  describe("Part 1", () => {
    it("computes the sample answer", () => {
      let polymer = applyRules(sampleTemplate, sampleRules, 10)
      let histogram = createHistogram(polymer)
      let difference = subtractMaxMin(histogram)
      expect(difference).toBe(1588)
    })

    it("computes the real answer", () => {
      let polymer = applyRules(realTemplate, realRules, 10)
      let histogram = createHistogram(polymer)
      let difference = subtractMaxMin(histogram)
      expect(difference).toBe(2621)
    })
  })
  
  describe("Part 2", () => {
    it("computes the sample answer", () => {
      let histogram = applyRulesQuickly(sampleTemplate, sampleRules, 40)
      let difference = subtractMaxMin(histogram)
      expect(difference).toBe(1588)
    })
    xit("computes the real answer", () => {})
  })
})
