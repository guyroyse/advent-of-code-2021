import { Space, Board, Game, scoreGameToWin, scoreGameToLose } from "../../lib/dec.04"

const ROLLS = [
  7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16,
  13, 6, 15, 25, 12, 22, 18, 20, 8, 19, 3, 26, 1 ]

const BOARDS = [
  [
    [ 22, 13, 17, 11,  0 ],
    [  8,  2, 23,  4, 24 ],
    [ 21,  9, 14, 16,  7 ],
    [  6, 10,  3, 18,  5 ],
    [  1, 12, 20, 15, 19 ]
  ],[
    [  3, 15,  0,  2, 22 ],
    [  9, 18, 13, 17,  5 ],
    [ 19,  8,  7, 25, 23 ],
    [ 20, 11, 10, 24,  4 ],
    [ 14, 21, 16, 12,  6 ]
  ],[
    [ 14, 21, 17, 24,  4 ],
    [ 10, 16, 15,  9, 19 ],
    [ 18,  8, 23, 26, 20 ],
    [ 22, 11, 13,  6,  5 ],
    [  2,  0, 12,  3,  7 ]
]]

const BOARD_VALUE = [
  [ 31, 88, 71, 23, 61 ],
  [  4,  9, 14, 93, 51 ],
  [ 52, 50,  6, 34, 55 ],
  [ 70, 64, 78, 65, 95 ],
  [ 12, 22, 41, 60, 57 ]]

const BOARD_SUM = BOARD_VALUE.reduce((accum, row) => {
  return accum + row.reduce((accum, cell) => {
    return accum + cell
  }, 0)
}, 0)

describe("December 4", () => {
  describe("Space", () => {
    let space
    beforeEach(() => space = new Space(42))
    it("has a number", () => expect(space.number).toBe(42))
    it("is unmarked by default", () => expect(space.marked).toBe(false))
    it("can be marked", () => {
      space.mark()
      expect(space.marked).toBe(true)
    })
  })

  describe("Board", () => {
    let board
    beforeEach(() => board = new Board(BOARD_VALUE))
    
    it("is not a winner", () => expect(board.winner).toBe(false))
    it("has an unmarked sum of all the cells", () => {
      expect(board.unmarkedSum).toBe(BOARD_SUM)
    })

    describe("when a valid space is marked", () => {
      beforeEach(() => board.mark(31))

      it("is still not a winner", () => expect(board.winner).toBe(false))
      it("reduces the unmarked sum by the cell value", () => {
        expect(board.unmarkedSum).toBe(BOARD_SUM - 31)
      })
    })

    describe("when multiple valid spaces are marked", () => {
      beforeEach(() => [ 31, 88, 71 ].forEach(value => board.mark(value)))

      it("is still not a winner", () => expect(board.winner).toBe(false))
      it("reduces the unmarked sum by all the cell values", () => {
        expect(board.unmarkedSum).toBe(BOARD_SUM - (31 + 88 + 71))
      })
    })

    describe("when a invalid space is marked", () => {
      beforeEach(() => board.mark(1))

      it("is still not a winner", () => expect(board.winner).toBe(false))
      it("does not reduce the unmarked sum by the cell value", () => {
        expect(board.unmarkedSum).toBe(BOARD_SUM)
      })
    })

    describe("when multiple invalid space are marked", () => {
      beforeEach(() => [ 1, 2, 3 ].forEach(value => board.mark(value)))

      it("is still not a winner", () => expect(board.winner).toBe(false))
      it("does not reduce the unmarked sum by all the cell values", () => {
        expect(board.unmarkedSum).toBe(BOARD_SUM)
      })
    })

    describe("when mixed are marked", () => {
      beforeEach(() => [ 1, 31, 2, 88, 3, 71 ].forEach(value => board.mark(value)))

      it("is still not a winner", () => expect(board.winner).toBe(false))
      it("reduces the unmarked sum accordingly", () => {
        expect(board.unmarkedSum).toBe(BOARD_SUM - (31 + 88 + 71))
      })
    })

    describe.each([
      { values: [ 31, 88, 71, 23, 61 ] },
      { values: [ 52, 50,  6, 34, 55 ] },
      { values: [ 12, 22, 41, 60, 57 ] }
    ])("when a entire row is selected", (data) => {
      beforeEach(() => data.values.forEach(value => board.mark(value)))
      it("is a winner", () => expect(board.winner).toBe(true))
    })

    describe.each([
      { values: [ 31,  4, 52, 70, 12 ] },
      { values: [ 71, 14,  6, 78, 41 ] },
      { values: [ 61, 51, 55, 95, 57 ] }
    ])("when a entire column is selected", (data) => {
      beforeEach(() => data.values.forEach(value => board.mark(value)))
      it("is a winner", () => expect(board.winner).toBe(true))
    })
  })

  describe("Game", () => {
    let game
    beforeEach(() => game = new Game(BOARDS, ROLLS))
    describe("when playing to win", () => {
      beforeEach(() => game.playToWin())

      it("returns the unmarked sum of the winner", () => {
        expect(game.unmarkedSum).toBe(188)
      })
 
      it("returns the winning roll", () => {
        expect(game.winningRoll).toBe(24)
      })

      it("returns the winning score", () => {
        expect(game.winningScore).toBe(4512)
      })
    })

    describe("when playing to lose", () => {
      beforeEach(() => game.playToLose())

      it("returns the unmarked sum of the last winner", () => {
        expect(game.unmarkedSum).toBe(148)
      })
 
      it("returns the last winning roll", () => {
        expect(game.winningRoll).toBe(13)
      })

      it("returns the last winning score", () => {
        expect(game.winningScore).toBe(1924)
      })
    })
  })

  describe("Part 1", () => {
    it("computes the answer", async () => {
      let input = await fetchInput('dec.04.txt')
      let score = scoreGameToWin(input)
      expect(score).toBe(51034)
    })
  })

  describe("Part 2", () => {
    it("computes the answer", async () => {
      let input = await fetchInput('dec.04.txt')
      let score = scoreGameToLose(input)
      expect(score).toBe(5434)
    })
  })
})
