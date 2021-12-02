import { depthIncrease } from '../lib/advent.js'

describe("December 1", () => {

  it("returns 0 for no inputs", () => {
    expect(depthIncrease("")).toBe(0)
  })

  it("returns 0 for single input", () => {
    expect(depthIncrease("200")).toBe(0)
  })

  it("returns 1 for two inputs with increasing difference", () => {
    expect(depthIncrease("200 202")).toBe(1)
  })

  it("returns 1 for multiple inputs with increasing difference", () => {
    expect(depthIncrease("200 202 204 206")).toBe(3)
  })

  it("returns 0 for two inputs with decreasing values", () => {
    expect(depthIncrease("200 198")).toBe(0)
  })

  it("returns 0 for multiple inputs with decreasing values", () => {
    expect(depthIncrease("200 198 196 194")).toBe(0)
  })

  it("returns 0 for multiple inputs with decreasing values", () => {
    expect(depthIncrease("200 198 196 194")).toBe(0)
  })

  it("returns the answer the multiple inputs with increasing and decreasing values", () => {
    expect(depthIncrease("200 198 200 198 200 198 200 198")).toBe(3)
  })

  it("computes the answer", async () => {
    let input = await fetchInput('2021-12-01.txt')
    let output = depthIncrease(input)
    expect(output).toBe(1482)
  })
})
