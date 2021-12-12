import { Graph } from 'redisgraph.js'

let client = new Graph('advent-of-code')

export async function flushAll() {
  try {
    await client.deleteGraph('advent-of-code')
  } catch (error) {
    console.log(error)
  }
}

export async function loadGraph(subgraphs) {
  await flushAll()
  await Promise.all(subgraphs.map(async subgraph => await writeToGraph(subgraph)))
}

export async function writeToGraph(subgraph) {
  let [ a, b ] = subgraph.split('-')
  let aBig = !!a.match(/^[A-Z]/)
  let bBig = !!b.match(/^[A-Z]/)

  if (a === 'start') {
    await client.query(`
      MERGE (n1:${a} { bigNode: ${aBig} })
      MERGE (n2:${b} { bigNode: ${bBig} })
      MERGE (n1)-[:LEADS_TO]->(n2)`)
  } else if (b === 'start') {
    await client.query(`
      MERGE (n1:${a} { bigNode: ${aBig} })
      MERGE (n2:${b} { bigNode: ${bBig} })
      MERGE (n1)<-[:LEADS_TO]-(n2)`)
  } else if (a === 'end') {
    await client.query(`
      MERGE (n1:${a} { bigNode: ${aBig} })
      MERGE (n2:${b} { bigNode: ${bBig} })
      MERGE (n1)<-[:LEADS_TO]-(n2)`)
  } else if (b === 'end') {
    await client.query(`
      MERGE (n1:${a} { bigNode: ${aBig} })
      MERGE (n2:${b} { bigNode: ${bBig} })
      MERGE (n1)-[:LEADS_TO]->(n2)`)
  } else {
    await client.query(`
      MERGE (n1:${a} { bigNode: ${aBig} })
      MERGE (n2:${b} { bigNode: ${bBig} })
      MERGE (n1)-[:LEADS_TO]->(n2)
      MERGE (n1)<-[:LEADS_TO]-(n2)`)
  }
}

export async function numberOfPaths() {
  return 0
}

export async function queryGraph(query) {

  let result = await client.query(query, {})

  let valueSet = []
  while (result.hasNext()) {
    let record = result.next()
    if (record.size() > 0) {
      valueSet.push(record.values())
    }
  }

  return valueSet.flat()
}