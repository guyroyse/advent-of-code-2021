import { calculatePowerConsumption } from '../lib/dec.03.js'

describe("December 3 - Part 1", () => {

  it("computes expected values for all 1s", () => {
    let result = calculatePowerConsumption("111111111111")
    expect(result.gamma).toBe(4095)
    expect(result.epsilon).toBe(0)
    expect(result.power).toBe(0)
  })

  it("computes expected values for multiple sets of all 1s", () => {
    let result = calculatePowerConsumption("111111111111\n111111111111\n111111111111")
    expect(result.gamma).toBe(4095)
    expect(result.epsilon).toBe(0)
    expect(result.power).toBe(0)
  })

  it("computes expected values for all 0s", () => {
    let result = calculatePowerConsumption("000000000000")
    expect(result.gamma).toBe(0)
    expect(result.epsilon).toBe(4095)
    expect(result.power).toBe(0)
  })

  it("computes expected values for multiple sets of all 0s", () => {
    let result = calculatePowerConsumption("000000000000\n000000000000\n000000000000")
    expect(result.gamma).toBe(0)
    expect(result.epsilon).toBe(4095)
    expect(result.power).toBe(0)
  })

  it("computes expected values for mix of 1s and 0s", () => {
    let result = calculatePowerConsumption("111100001010")
    expect(result.gamma).toBe(3850)
    expect(result.epsilon).toBe(245)
    expect(result.power).toBe(943250)
  })

  it("computes expected values for multiple sets of mixed of 1s and 0s", () => {
    let result = calculatePowerConsumption("111100001010\n101011110000\n000010101111")
    expect(result.gamma).toBe(2730)
    expect(result.epsilon).toBe(1365)
    expect(result.power).toBe(3726450)
  })

  it("computes the answer", async () => {
    let input = await fetchInput('dec.03.txt')
    let result = calculatePowerConsumption(input)
    expect(result.gamma).toBe(1869)
    expect(result.epsilon).toBe(2226)
    expect(result.power).toBe(4160394)
  })
})
