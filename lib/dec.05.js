import _ from "lodash"

export class VentMap {
  constructor() {
    this._data = []
  }

  drawLine(line) {
    let [ , ...[ x1, y1, x2, y2 ] ] = line.match(/^(\d+),(\d+) \-> (\d+),(\d+)$/)
    this.drawLineFromPoints( { x: parseInt(x1), y: parseInt(y1) }, { x: parseInt(x2), y: parseInt(y2) })
  }

  drawLineWithDiagonals(line) {
    let [ , ...[ x1, y1, x2, y2 ] ] = line.match(/^(\d+),(\d+) \-> (\d+),(\d+)$/)
    this.drawLineFromDiagonalPoints( { x: parseInt(x1), y: parseInt(y1) }, { x: parseInt(x2), y: parseInt(y2) })
  }

  drawLineFromPoints(start, end) {

    let lengthX = Math.abs(start.x - end.x)
    let lengthY = Math.abs(start.y - end.y)

    let directionX = start.x < end.x ? 1 : (start.x === end.x ? 0 : -1)
    let directionY = start.y < end.y ? 1 : (start.y === end.y ? 0 : -1)

    if (start.x === end.x || start.y === end.y) {
      for (let x = 0; x <= lengthX; x++) {
        for (let y = 0; y <= lengthY; y++) {
          this.incrementPoint({ x: start.x + x * directionX, y: start.y + y * directionY })
        }
      }
    }
  }

  drawLineFromDiagonalPoints(start, end) {

    let lengthX = Math.abs(start.x - end.x)
    let lengthY = Math.abs(start.y - end.y)

    let directionX = start.x < end.x ? 1 : (start.x === end.x ? 0 : -1)
    let directionY = start.y < end.y ? 1 : (start.y === end.y ? 0 : -1)

    let diagonal = start.x !== end.x && start.y !== end.y

    let x, y
    for (x = 0; x <= lengthX; x++) {
      for (y = 0; y <= lengthY; y++) {
        if (diagonal) {
          if (x === y) this.incrementPoint({ x: start.x + x * directionX, y: start.y + y * directionY })
        } else {
          this.incrementPoint({ x: start.x + x * directionX, y: start.y + y * directionY })
        }
      }
    }
  }

  incrementPoint(point) {
    let { x, y } = point
    this._data[x] ??= []
    this._data[x][y] ??= 0
    this._data[x][y]++
  }

  get lineCount() {
    return this._data.flat().filter(count => count === 1).length
  }

  get intersectionCount() {
    return this._data.flat().filter(count => (count ?? 0) >= 2).length
  }
}
