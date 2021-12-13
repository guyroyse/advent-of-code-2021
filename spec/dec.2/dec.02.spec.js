import { calculatePosition, calculatePositionCorrectly } from '../../lib/dec.02.js'

describe("December 2", () => {
  describe("Part 1", () => {
    it("returns depth and horizontal position of 0 for no inputs", () => {
      let position = calculatePosition("")
      expect(position.depth).toBe(0)
      expect(position.horizontalPosition).toBe(0)
    })

    it("increase the horizontal position with a forward command", () => {
      let position = calculatePosition("forward 5\n")
      expect(position.depth).toBe(0)
      expect(position.horizontalPosition).toBe(5)
    })

    it("increase the horizontal position with multiple forward command", () => {
      let position = calculatePosition("forward 5\nforward 3\nforward 1\n")
      expect(position.depth).toBe(0)
      expect(position.horizontalPosition).toBe(9)
    })

    it("increases the depth with a down command", () => {
      let position = calculatePosition("down 5\n")
      expect(position.depth).toBe(5)
      expect(position.horizontalPosition).toBe(0)
    })

    it("increases the depth with a multiple down commands", () => {
      let position = calculatePosition("down 5\ndown 3\ndown 1\n")
      expect(position.depth).toBe(9)
      expect(position.horizontalPosition).toBe(0)
    })

    it("decreases the depth with an up command", () => {
      let position = calculatePosition("up 5\n")
      expect(position.depth).toBe(-5)
      expect(position.horizontalPosition).toBe(0)
    })

    it("decreases the depth with a multiple up commands", () => {
      let position = calculatePosition("up 5\nup 3\nup 1\n")
      expect(position.depth).toBe(-9)
      expect(position.horizontalPosition).toBe(0)
    })

    it("changes the depth and increases the horizontal position with a multiple commands", () => {
      let position = calculatePosition("down 5\ndown 3\nforward 5\nup 1\nforward 6\ndown 12\n")
      expect(position.depth).toBe(19)
      expect(position.horizontalPosition).toBe(11)
    })

    it("computes the answer", async () => {
      let input = await fetchInput('dec.02.txt')
      let position = calculatePosition(input)
      expect(position.depth).toBe(724)
      expect(position.horizontalPosition).toBe(1911)
      expect(position.depth * position.horizontalPosition).toBe(1383564)
    })
  })

  describe("Part 2", () => {
    it("returns depth and horizontal position of 0 for no inputs", () => {
      let position = calculatePositionCorrectly("")
      expect(position.depth).toBe(0)
      expect(position.horizontalPosition).toBe(0)
      expect(position.aim).toBe(0)
    })

    it("increase the horizontal position with a forward command", () => {
      let position = calculatePositionCorrectly("forward 5\n")
      expect(position.depth).toBe(0)
      expect(position.horizontalPosition).toBe(5)
      expect(position.aim).toBe(0)
    })

    it("increase the horizontal position with multiple forward command", () => {
      let position = calculatePositionCorrectly("forward 5\nforward 3\nforward 1\n")
      expect(position.depth).toBe(0)
      expect(position.horizontalPosition).toBe(9)
      expect(position.aim).toBe(0)
    })
    
    it("increases the aim with a down command", () => {
      let position = calculatePositionCorrectly("down 5\n")
      expect(position.depth).toBe(0)
      expect(position.horizontalPosition).toBe(0)
      expect(position.aim).toBe(5)
    })

    it("increases the aim with a multiple down commands", () => {
      let position = calculatePositionCorrectly("down 5\ndown 3\ndown 1\n")
      expect(position.depth).toBe(0)
      expect(position.horizontalPosition).toBe(0)
      expect(position.aim).toBe(9)
    })

    it("decreases the aim with an up command", () => {
      let position = calculatePositionCorrectly("up 5\n")
      expect(position.depth).toBe(0)
      expect(position.horizontalPosition).toBe(0)
      expect(position.aim).toBe(-5)
    })

    it("decreases the aim with a multiple up commands", () => {
      let position = calculatePositionCorrectly("up 5\nup 3\nup 1\n")
      expect(position.depth).toBe(0)
      expect(position.horizontalPosition).toBe(0)
      expect(position.aim).toBe(-9)
    })

    it("increase the horizontal position and changes the depth by the aim with forward command", () => {
      let position = calculatePositionCorrectly("down 3\nforward 5\n")
      expect(position.depth).toBe(15)
      expect(position.horizontalPosition).toBe(5)
      expect(position.aim).toBe(3)
    })

    it("increase the horizontal position and changes the depth by the aim with lots of forward command", () => {
      let position = calculatePositionCorrectly("down 3\nforward 5\nup 1\nforward 1\n")
      expect(position.depth).toBe(17)
      expect(position.horizontalPosition).toBe(6)
      expect(position.aim).toBe(2)
    })

    it("computes the answer", async () => {
      let input = await fetchInput('dec.02.txt')
      let position = calculatePositionCorrectly(input)
      expect(position.depth).toBe(778813)
      expect(position.horizontalPosition).toBe(1911)
      expect(position.aim).toBe(724)
      expect(position.depth * position.horizontalPosition).toBe(1488311643)
    })
  })
})
