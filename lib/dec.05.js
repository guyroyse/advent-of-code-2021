import _ from "lodash"

export class VentMap {
  constructor() {
    this._data = []
  }

  drawLine(line) {
    let [ , ...[ x1, y1, x2, y2 ] ] = line.match(/^(\d+),(\d+) \-> (\d+),(\d+)$/)
    this.drawLineFromPoints( { x: x1, y: y1 }, { x: x2, y: y2 })
  }

  drawLineFromPoints(a, b) {
    let [ start, end ] = _.sortBy([a, b], [ o => o.x, o => o.y ])
    // const iterX = start.x < end.x ? x => x + 1 : x => x - 1;
    // const iterY = start.y < end.y ? y => y + 1 : y => y - 1;

    if (start.x === end.x || start.y === end.y) {
      for (let x = start.x; x <= end.x; x++) {
        for (let y = start.y; y <= end.y; y++) {
          this.incrementPoint({ x, y })
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
