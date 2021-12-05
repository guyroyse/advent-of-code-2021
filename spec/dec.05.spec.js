import { VentMap } from "../lib/dec.05"

describe("December 5", () => {

  describe("VentMap", () => {
    let map

    beforeEach(() => map = new VentMap())
    it("creates map without lines", () => expect(map.lineCount).toBe(0))
    it("creates map without intersections", () => expect(map.intersectionCount).toBe(0))

    describe("when a single point is drawn", () => {
      beforeEach(() => map.drawLine("0,0 -> 0,0"))
      it("creates map with the expected line", () => expect(map.lineCount).toBe(1))
      it("creates map without intersections", () => expect(map.intersectionCount).toBe(0))
    })

    describe("when a vertical line is drawn", () => {
      beforeEach(() => map.drawLine("0,0 -> 0,4"))
      it("creates map with the expected line", () => expect(map.lineCount).toBe(5))
      it("creates map without intersections", () => expect(map.intersectionCount).toBe(0))
    })

    describe("when a horizontal line is drawn", () => {
      beforeEach(() => map.drawLine("0,0 -> 4,0"))
      it("creates map with the expected line", () => expect(map.lineCount).toBe(5))
      it("creates map without intersections", () => expect(map.intersectionCount).toBe(0))
    })

    describe("when a backwards vertical line is drawn", () => {
      beforeEach(() => map.drawLine("0,4 -> 0,0"))
      it("creates map with the expected line", () => expect(map.lineCount).toBe(5))
      it("creates map without intersections", () => expect(map.intersectionCount).toBe(0))
    })

    describe("when a backwards horizontal line is drawn", () => {
      beforeEach(() => map.drawLine("4,0 -> 0,0"))
      it("creates map with the expected line", () => expect(map.lineCount).toBe(5))
      it("creates map without intersections", () => expect(map.intersectionCount).toBe(0))
    })

    describe("when a diagonal line is drawn", () => {
      beforeEach(() => map.drawLine("0,0 -> 4,4"))
      it("draws no lines", () => expect(map.lineCount).toBe(0))
      it("has no intersections", () => expect(map.intersectionCount).toBe(0))
    })

    describe("when intersecting lines is drawn", () => {
      beforeEach(() => {
        map.drawLine("0,0 -> 0,4")
        map.drawLine("0,0 -> 4,0")
      })
      it("creates map with the expected lines", () => expect(map.lineCount).toBe(8))
      it("creates map with the expected intersections", () => expect(map.intersectionCount).toBe(1))
    })

    describe("drawing lots of lines", () => {
      beforeEach(() => {
        map.drawLine("0,9 -> 5,9")
        map.drawLine("8,0 -> 0,8")
        map.drawLine("9,4 -> 3,4")
        map.drawLine("2,2 -> 2,1")
        map.drawLine("7,0 -> 7,4")
        map.drawLine("6,4 -> 2,0")
        map.drawLine("0,9 -> 2,9")
        map.drawLine("3,4 -> 1,4")
        map.drawLine("0,0 -> 8,8")
        map.drawLine("5,5 -> 8,2")
      })
      it("creates map with the expected intersections", () => expect(map.intersectionCount).toBe(5))
    })
  })

  describe("Part 1", () => {
    it("computes the answer", async () => {
      let input = await fetchInput('dec.05.txt')
      let map = new VentMap()
      let lines = input.split('\n')
      lines.forEach(line => map.drawLine(line))
      console.log(map._data.length)
      expect(map.lineCount).toBe(86612)
      expect(map.intersectionCount).toBe(4639)
    })
  })
})
