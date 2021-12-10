import { corruptedPoints, incompletePoints } from "../lib/dec.10"

const SAMPLE_INPUT = `
[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`.trim()

const SAMPLE_ANSWER_1 = 26397
const SAMPLE_ANSWER_2 = 288957

describe("December 10", () => {

  describe("Part 1", () => {
    it("computes the sample answer", () => {
      let answer = corruptedPoints(SAMPLE_INPUT)
      expect(answer).toBe(SAMPLE_ANSWER_1)
    })

    it("computes the answer", async () => {
      let input = await fetchInput('dec.10.txt')
      let answer = corruptedPoints(input)
      expect(answer).toBe(436497)
    })
  })

  describe("Part 2", () => {
    it("computes the sample answer", () => {
      let answer = incompletePoints(SAMPLE_INPUT)
      expect(answer).toBe(SAMPLE_ANSWER_2)
    })

    it("computes the answer", async () => {
      let input = await fetchInput('dec.10.txt')
      let answer = incompletePoints(input)
      expect(answer).toBe(2377613374)
    })
  })
})
