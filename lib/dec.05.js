import _ from "lodash"

export class VentMap {
  constructor() {
    this._data = []
  }

  drawLine(line) {
    let [ , ...[ x1, y1, x2, y2 ] ] = line.match(/^(\d+),(\d+) \-> (\d+),(\d+)$/)
    this.drawLineFromPoints( { x: x1, y: y1 }, { x: x2, y: y2 })
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
