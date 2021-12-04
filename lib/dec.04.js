export class Space {
  constructor(number) {
    this._number = number
    this._marked = false
  }

  get number() { return this._number }
  get marked() { return this._marked }

  mark() {
    this._marked = true
  }
}

export class Board {
  constructor(values) {
    this._spaces = values.flat().map(value => new Space(value))
  }

  mark(number) {
    this._spaces.find(space => space.number === number)?.mark()
  }

  get unmarkedSum() {
    return this._spaces
      .filter(space => !space.marked)
      .reduce((accum, space) => accum + space.number, 0)
  }

  get winner() {
    return (
      this.rows.some(row => row.every(space => space.marked)) ||
      this.columns.some(column => column.every(space => space.marked)))
  }

  get rows() {
    return this._spaces.reduce((rows, space, index) => {
      return index % 5 === 0
        ? [...rows, [space]]
        : [...rows.slice(0, -1), [...rows.slice(-1)[0], space]]
    }, [])
  }

  get columns() {
    let columns = []
    for (let i = 0; i < 5; i++) {
      let column = []
      for (let j = 0; j < 25; j += 5) {
        column.push(this._spaces[i + j])
      }
      columns.push(column)
    }
    return columns
  }
}

export class Game {
  constructor(boards, rolls) {
    this._boards = boards.map(board => new Board(board))
    this._rolls = rolls
  }

  playToWin() {
    this.#play(board => board.winner)
  }

  playToLose() {
    this.#play(() => this._boards.every(board => board.winner))
  }

  #play(winStrategy) {
    for (let roll of this._rolls) {
      for (let board of this._boards) {
        board.mark(roll)
        if (winStrategy(board)) {
          this._winningRoll = roll
          this._winningBoard = board
          return
        }
      }
    }
  }

  get unmarkedSum() {
    return this._winningBoard.unmarkedSum
  }

  get winningRoll() {
    return this._winningRoll
  }

  get winningScore() {
    return this.unmarkedSum * this.winningRoll
  }
}

export function scoreGameToWin(input) {
  let game = createGame(input)
  game.playToWin()
  return game.winningScore
}

export function scoreGameToLose(input) {
  let game = createGame(input)
  game.playToLose()
  return game.winningScore
}

function createGame(input) {
  let [ rollsLine, ...boardLines ] = input
    .split('\n')
    .filter(line => !!line)

  let rolls = rollsLine.split(',').map(roll => parseInt(roll))
  let boardRows = boardLines.map(line => line.trim().split(/\s+/).map(value => parseInt(value)))
  let boards = chunk(boardRows, 5)

  return new Game(boards, rolls)
}

function chunk(input, size) {
  return input.reduce((arr, item, idx) => {
    return idx % size === 0
      ? [...arr, [item]]
      : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]];
  }, []);
};
