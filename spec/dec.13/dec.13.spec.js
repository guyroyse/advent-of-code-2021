import { coords as SAMPLE_COORDS, folds as SAMPLE_FOLDS } from "./sample"
import { coords as REAL_COORDS, folds as REAL_FOLDS } from "./data"
import { createPaper, foldMany, foldPaper, countDots, countSpaces, showDots } from "../../lib/dec.13"

describe("December 13", () => {

  it("creates paper from coords", () => {
    let paper = createPaper(SAMPLE_COORDS)
    expect(paper).toHaveLength(15)
    expect(paper[0]).toHaveLength(11)
    expect(countDots(paper)).toBe(SAMPLE_COORDS.length)
    expect(countSpaces(paper)).toBe((15 * 11) - SAMPLE_COORDS.length)
  })

  describe("Part 1", () => {
    it("computes the sample answer", () => {
      let [{ axis, value }] = SAMPLE_FOLDS
      let paper = createPaper(SAMPLE_COORDS)
      let folded = foldPaper(paper, axis, value)
      let dots = countDots(folded)
      expect(dots).toBe(17)
    })

    it("computes the real answer", () => {
      let [{ axis, value }] = REAL_FOLDS
      let paper = createPaper(REAL_COORDS)
      let folded = foldPaper(paper, axis, value)
      let dots = countDots(folded)
      expect(dots).toBe(682)
    })
  })
  
  describe("Part 2", () => {
    it("computes the sample answer", () => {
      let paper = createPaper(SAMPLE_COORDS)
      let folded = foldMany(paper, SAMPLE_FOLDS)
      let dots = countDots(folded)
      expect(dots).toBe(16)
    })

    it("computes the real answer", () => {
      let paper = createPaper(REAL_COORDS)
      let folded = foldMany(paper, REAL_FOLDS)
      let dots = showDots(folded)
      console.log(dots)
      expect(dots).toBe(
`****  **   **  *  * ***  **** *  * **** 
*    *  * *  * *  * *  *    * *  * *    
***  *  * *    *  * *  *   *  **** ***  
*    **** * ** *  * ***   *   *  * *    
*    *  * *  * *  * * *  *    *  * *    
*    *  *  ***  **  *  * **** *  * **** `)

// FAGURZHE
    })
  })
})
