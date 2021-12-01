import { echo } from '../lib/advent.js'

describe("November 30", () => {
  it("computes the answer", async () => {
    let input = await fetchInput('2021-11-30.txt')
    let output = echo(input)
    expect(output).toBe(input)
  })
})
