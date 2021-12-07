import { computeLeastFuel } from "../lib/dec.07"

describe("December 7", () => {

  describe("Part 1", () => {

    it("computes the least fuel needed", () => {
      let fuel = computeLeastFuel("16,1,2,0,4,2,7,1,2,14")
      expect(fuel).toBe(37)
    })

    it("computes the answer", async () => {
      let input = await fetchInput('dec.07.txt')
      let fuel = computeLeastFuel(input)
      expect(fuel).toBe(false)
    })
  })

  describe("Part 2", () => {
    xit("computes the answer", async () => {
      let input = await fetchInput('dec.07.txt')
    })
  })
})
