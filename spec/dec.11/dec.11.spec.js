import { computeGenerations, findSyncedGeneration } from "../../lib/dec.11"

const SAMPLE_INPUT = [
  [ 5, 4, 8, 3, 1, 4, 3, 2, 2, 3 ],
  [ 2, 7, 4, 5, 8, 5, 4, 7, 1, 1 ],
  [ 5, 2, 6, 4, 5, 5, 6, 1, 7, 3 ],
  [ 6, 1, 4, 1, 3, 3, 6, 1, 4, 6 ],
  [ 6, 3, 5, 7, 3, 8, 5, 4, 7, 8 ],
  [ 4, 1, 6, 7, 5, 2, 4, 6, 4, 5 ],
  [ 2, 1, 7, 6, 8, 4, 1, 7, 2, 1 ],
  [ 6, 8, 8, 2, 8, 8, 1, 1, 3, 4 ],
  [ 4, 8, 4, 6, 8, 4, 8, 5, 5, 4 ],
  [ 5, 2, 8, 3, 7, 5, 1, 5, 2, 6 ]]

const REAL_INPUT = [
  [ 2, 3, 4, 4, 6, 7, 1, 2, 1, 2 ],
  [ 6, 6, 1, 1, 7, 4, 2, 6, 8, 1 ],
  [ 5, 5, 7, 5, 5, 7, 5, 5, 7, 3 ],
  [ 3, 1, 6, 7, 8, 4, 8, 5, 3, 6 ],
  [ 1, 3, 5, 3, 8, 2, 7, 3, 1, 1 ],
  [ 4, 4, 1, 6, 4, 6, 3, 2, 6, 6 ],
  [ 2, 6, 2, 4, 7, 6, 1, 6, 1, 5 ],
  [ 1, 7, 8, 6, 5, 6, 1, 2, 6, 3 ],
  [ 3, 6, 2, 2, 6, 4, 3, 2, 1, 5 ],
  [ 4, 1, 4, 3, 2, 8, 4, 6, 5, 3 ]]

describe("December 11", () => {

  describe("Part 1", () => {

    let result

    describe("when calculating a single generation", () => {
      beforeEach(() => result = computeGenerations(SAMPLE_INPUT, 1))
      it("has the expected number of flashes", () => expect(result.flashCount).toBe(0))
      it("has the expected next generation", () => {
        expect(result.finalGeneration).toEqual([
          [ 6, 5, 9, 4, 2, 5, 4, 3, 3, 4 ],
          [ 3, 8, 5, 6, 9, 6, 5, 8, 2, 2 ],
          [ 6, 3, 7, 5, 6, 6, 7, 2, 8, 4 ],
          [ 7, 2, 5, 2, 4, 4, 7, 2, 5, 7 ],
          [ 7, 4, 6, 8, 4, 9, 6, 5, 8, 9 ],
          [ 5, 2, 7, 8, 6, 3, 5, 7, 5, 6 ],
          [ 3, 2, 8, 7, 9, 5, 2, 8, 3, 2 ],
          [ 7, 9, 9, 3, 9, 9, 2, 2, 4, 5 ],
          [ 5, 9, 5, 7, 9, 5, 9, 6, 6, 5 ],
          [ 6, 3, 9, 4, 8, 6, 2, 6, 3, 7 ]])
      })
    })

    describe("when calculating multiple generations", () => {
      beforeEach(() => result = computeGenerations(SAMPLE_INPUT, 3))
      it("has the expected number of flashes", () => expect(result.flashCount).toBe(80))
      it("has the expected next generation", () => {
        expect(result.finalGeneration).toEqual([
          [ 0, 0, 5, 0, 9, 0, 0, 8, 6, 6 ],
          [ 8, 5, 0, 0, 8, 0, 0, 5, 7, 5 ],
          [ 9, 9, 0, 0, 0, 0, 0, 0, 3, 9 ],
          [ 9, 7, 0, 0, 0, 0, 0, 0, 4, 1 ],
          [ 9, 9, 3, 5, 0, 8, 0, 0, 6, 3 ],
          [ 7, 7, 1, 2, 3, 0, 0, 0, 0, 0 ],
          [ 7, 9, 1, 1, 2, 5, 0, 0, 0, 9 ],
          [ 2, 2, 1, 1, 1, 3, 0, 0, 0, 0 ],
          [ 0, 4, 2, 1, 1, 2, 5, 0, 0, 0 ],
          [ 0, 0, 2, 1, 1, 1, 9, 0, 0, 0 ]])
      })
    })

    describe("when calculating the sample", () => {
      beforeEach(() => result = computeGenerations(SAMPLE_INPUT, 100))
      it("has the expected number of flashes", () => expect(result.flashCount).toBe(1656))
      it("has the expected next generation", () => {
        expect(result.finalGeneration).toEqual([
          [ 0, 3, 9, 7, 6, 6, 6, 8, 6, 6 ],
          [ 0, 7, 4, 9, 7, 6, 6, 9, 1, 8 ],
          [ 0, 0, 5, 3, 9, 7, 6, 9, 3, 3 ],
          [ 0, 0, 0, 4, 2, 9, 7, 8, 2, 2 ],
          [ 0, 0, 0, 4, 2, 2, 9, 8, 9, 2 ],
          [ 0, 0, 5, 3, 2, 2, 2, 8, 7, 7 ],
          [ 0, 5, 3, 2, 2, 2, 2, 9, 6, 6 ],
          [ 9, 3, 2, 2, 2, 2, 8, 9, 6, 6 ],
          [ 7, 9, 2, 2, 2, 8, 6, 8, 6, 6 ],
          [ 6, 7, 8, 9, 9, 9, 8, 7, 6, 6 ]])
      })
    })

    it("computes the answer", () => {
      let result = computeGenerations(REAL_INPUT, 100)
      expect(result.flashCount).toBe(1729)
    })
  })

  describe("Part 2", () => {
    it("computes the sample answer", () => {
      let result = findSyncedGeneration(SAMPLE_INPUT)
      expect(result).toBe(195)
    })

    it("computes the answer", () => {
      let result = findSyncedGeneration(REAL_INPUT)
      expect(result).toBe(237)
    })
  })
})
