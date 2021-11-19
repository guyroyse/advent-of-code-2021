import { readFile } from 'fs/promises'

global.fetchInput = async function fetchInput(path) {
  return await readFile(`spec/input/${path}`, { encoding: 'utf-8' })
}
