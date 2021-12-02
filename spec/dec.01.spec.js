import { countDepthIncreases, countDepthIncreasesSliding } from '../lib/dec-01.js'

describe("December 1 - Part 1", () => {

  it("returns 0 for no inputs", () => {
    expect(countDepthIncreases("")).toBe(0)
  })

  it("returns 0 for single input", () => {
    expect(countDepthIncreases("200")).toBe(0)
  })

  it("returns 1 for two inputs with increasing difference", () => {
    expect(countDepthIncreases("200 202")).toBe(1)
  })

  it("returns 1 for multiple inputs with increasing difference", () => {
    expect(countDepthIncreases("200 202 204 206")).toBe(3)
  })

  it("returns 0 for two inputs with decreasing values", () => {
    expect(countDepthIncreases("200 198")).toBe(0)
  })

  it("returns 0 for multiple inputs with decreasing values", () => {
    expect(countDepthIncreases("200 198 196 194")).toBe(0)
  })

  it("returns 0 for multiple inputs with decreasing values", () => {
    expect(countDepthIncreases("200 198 196 194")).toBe(0)
  })

  it("returns the answer the multiple inputs with increasing and decreasing values", () => {
    expect(countDepthIncreases("200 198 200 198 200 198 200 198")).toBe(3)
  })

  it("computes the answer", async () => {
    let input = await fetchInput('dec.01.txt')
    let output = countDepthIncreases(input)
    expect(output).toBe(1482)
  })
})

describe("December 1 - Part 2", () => {

  it("returns 0 for no inputs", () => {
    expect(countDepthIncreasesSliding("")).toBe(0)
  })

  it("returns 0 for single input", () => {
    expect(countDepthIncreasesSliding("200")).toBe(0)
  })

  it("returns 0 for a set of inputs", () => {
    expect(countDepthIncreasesSliding("200 201 202")).toBe(0)
  })

  it("returns 1 for two sets of increasing inputs", () => {
    expect(countDepthIncreasesSliding("200 201 202 203")).toBe(1)
  })

  it("returns 3 for four sets of increasing inputs", () => {
    expect(countDepthIncreasesSliding("200 201 202 203 204 205")).toBe(3)
  })

  it("returns 0 for sets of decreasing inputs", () => {
    expect(countDepthIncreasesSliding("200 199 198 197 196 195")).toBe(0)
  })

  it("returns 0 for sets of increasing and decreasing inputs", () => {
    expect(countDepthIncreasesSliding("200 199 198 197 296 195")).toBe(1)
  })

  it("computes the answer", async () => {
    let input = await fetchInput('dec.01.txt')
    let output = countDepthIncreasesSliding(input)
    expect(output).toBe(1518)
  })
})
