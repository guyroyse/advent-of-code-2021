import { computePart1, parseInput, parseLine, countSegments,
  countKnownNumbers, countAllKnownNumbers, convertToBits, convertToNumbers } from "../lib/dec.08"

const PART_1_SAMPLE =`
be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`.trim()

describe("December 8", () => {

  it("parses a line of input", () => {
    let data = parseLine("acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf")
    expect(data).toEqual({
      wires: [ "acedgfb", "cdfbe", "gcdfa", "fbcad", "dab", "cefabd", "cdfgeb", "eafb", "cagedb", "ab" ],
      leds: [ "cdfeb", "fcadb", "cdfeb", "cdbaf" ]
    })
  })

  it("parses multiple lines of input", () => {
    let data = parseInput(PART_1_SAMPLE)
    expect(data).toHaveLength(10)
    expect(data[5]).toEqual({
      wires: [ "fgeab", "ca", "afcebg", "bdacfeg", "cfaedg", "gcfdb", "baec", "bfadeg", "bafgc", "acf" ],
      leds: [ "gebdcfa", "ecba", "ca", "fadegcb" ]
    })
  })

  it("counts the led segments", () => {
    let counts = countSegments([ "ab", "abc", "accd", "abcde", "abcdef", "abcdefg" ])
    expect(counts).toEqual([ 2, 3, 4, 5, 6, 7 ])
  })

  it("counts the known numbers", () => {
    let counts = countKnownNumbers([ "ab", "abc", "accd", "abcde", "abcdef", "abcdefg" ])
    expect(counts).toBe(4)
  })

  it("counts all the known numbers", () => {
    let counts = countAllKnownNumbers([
      [ "ab", "abc", "accd", "abcde", "abcdef", "abcdefg" ],
      [ "ab", "abc", "accd", "abcde", "abcdef", "abcdefg" ],
      [ "ab", "abc", "accd", "abcde", "abcdef", "abcdefg" ]
    ])
    expect(counts).toBe(12)
  })

  it("converts the wires to bits", () => {
    let bits = convertToBits([ "acedgfb", "cdfbe", "gcdfa", "fbcad", "dab",
      "cefabd", "cdfgeb", "eafb", "cagedb", "ab" ])
    expect(bits).toEqual([ 0b1111111, 0b0111110, 0b1101101, 0b0101111, 0b0001011,
      0b0111111, 0b1111110, 0b0110011, 0b1011111, 0b0000011 ])
  })

  it("convert letters to numbers", () => {
    let bits = convertToNumbers([ "acedgfb", "cdfbe", "gcdfa", "fbcad", "dab",
      "cefabd", "cdfgeb", "eafb", "cagedb", "ab" ])
    expect(bits).toEqual([ 8, 5, 2, 3, 7, 9, 6, 4, 0, 1 ])
  })

  describe("Part 1", () => {
    it("computes the sample answer", () => {
      let answer = computePart1(PART_1_SAMPLE)
      expect(answer).toBe(26)
    })

    it("computes the answer", async () => {
      let input = await fetchInput('dec.08.txt')
      let answer = computePart1(input)
      expect(answer).toBe(318)
    })
  })

  describe("Part 2", () => {
    xit("computes the answer", async () => {
      let input = await fetchInput('dec.07.txt')
    })
  })
})
