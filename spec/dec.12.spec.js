import { loadGraph, numberOfPaths, writeToGraph, queryGraph, flushAll } from "../lib/dec.12"

const SAMPLE_INPUT_1 = [ "start-A", "start-b", "A-c", "A-b", "b-d", "A-end", "b-end" ]
const SAMPLE_INPUT_2 = []
const SAMPLE_INPUT_3 = []
const REAL_INPUT = []

describe("December 12", () => {

  describe("writing a relationship to the graph", () => {
    beforeEach(async () => loadGraph([ "A-B", "c-d", "B-c" ]))

    it("writes all of the nodes to the graph only once", async () => {
      let results = await queryGraph(`MATCH (n) RETURN toJSON(n)`)
      let nodes = results.map(json => JSON.parse(json))
      expect(results).toHaveLength(4)
      expect(nodes[0].labels[0]).toBe('A')
      expect(nodes[1].labels[0]).toBe('B')
      expect(nodes[2].labels[0]).toBe('c')
      expect(nodes[3].labels[0]).toBe('d')
    })

    it("writes big nodes", async () => {
      let results = await queryGraph(`MATCH (n) RETURN toJSON(n)`)
      let nodes = results.map(json => JSON.parse(json))
      expect(results).toHaveLength(4)
      expect(nodes[0].properties.bigNode).toBe(true)
      expect(nodes[1].properties.bigNode).toBe(true)
      expect(nodes[2].properties.bigNode).toBe(false)
      expect(nodes[3].properties.bigNode).toBe(false)
    })

    it("write a forwards relationship to the graph", async () => {
      let results = await queryGraph(`
        MATCH (n1:A)-[:LEADS_TO]->(n2:B)
        RETURN toJSON(n1), toJSON(n2)`)
  
        expect(results).toHaveLength(2)

      let nodes = results.map(json => JSON.parse(json))
      expect(nodes[0].labels[0]).toBe('A')
      expect(nodes[1].labels[0]).toBe('B')
    })

    it("write a backwards relationship to the graph", async () => {
      let results = await queryGraph(`
        MATCH (n1:B)-[:LEADS_TO]->(n2:A)
        RETURN toJSON(n1), toJSON(n2)`)
  
      let nodes = results.map(json => JSON.parse(json))
      expect(nodes[0].labels[0]).toBe('B')
      expect(nodes[1].labels[0]).toBe('A')
    })
  })

  describe("Part 1", () => {
    it("computes the sample answer #1", async () => {
      await loadGraph(SAMPLE_INPUT_1)
      let results = await queryGraph('MATCH p = (:start)-[*]->(:end) RETURN [ n IN nodes(p) | labels(n)[0] ]')
      expect(results).toBe(false)
      let paths = await numberOfPaths()
      expect(paths).toBe(10)
    })

    xit("computes the real answer", () => {})
  })
  
  describe("Part 2", () => {
    xit("computes the sample answer", () => {})
    xit("computes the real answer", () => {})
  })
})
