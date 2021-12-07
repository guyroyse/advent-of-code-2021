import { computePopulation, parseInput } from "../lib/dec.06"

describe("December 6", () => {

  describe("LanternFish", () => {
    describe("#parseInput", () => {
      it("return an empty array for an empty string",
        () => expect(parseInput("")).toEqual([]))

      it("return an array with a single integer for a string with a single value",
        () => expect(parseInput("42")).toEqual([42]))

      it("return an array with multiple integers for a string with multiple values",
        () => expect(parseInput("42,23,13")).toEqual([ 42, 23, 13 ]))
    })

    describe("#computePopulation", () => {
      it("computes the population from a string after generations", () => {
        expect(computePopulation(18, "3,4,3,1,2")).toBe(26)
        expect(computePopulation(80, "3,4,3,1,2")).toBe(5934)
      })
    })
  })

  describe("Part 1", () => {
    it("computes the answer", async () => {
      let input = await fetchInput('dec.06.txt')
      expect(computePopulation(80, input)).toBe(350149)
    })
  })

  describe("Part 2", () => {
    it("computes the answer", async () => {
      let input = await fetchInput('dec.06.txt')
      expect(computePopulation(256, input)).toBe(1590327954513)
    })
  })
})
