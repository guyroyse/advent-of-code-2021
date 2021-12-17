import { createClient } from '@node-redis/client';


const bigIntMax = (...args) => args.reduce((m, e) => e > m ? e : m);
const bigIntMin = (...args) => args.reduce((m, e) => e < m ? e : m);

export class RedisBits {
  constructor(key) {
    this.redis = createClient()
    this.key = key
  }

  open = async () => await this.redis.connect()
  close = async () => await this.redis.quit()
  loadBits = async hexString => {
    await this.redis.sendCommand(
      hexString
        .split('')
        .map(digit => parseInt(digit, 16))
        .reduce((command, nibble, index) => {
          return command.concat([ 'SET', 'u4', `#${index}`, nibble.toString() ])
        }, [ 'BITFIELD', this.key ]))
  }

  fetchBits = async (start, size) => {
    let command = [ 'BITFIELD', this.key, 'GET', `u${size}`, start.toString() ]
    let [ n ] = await this.redis.sendCommand(command)
    return n
  }
}

const SUM_PACKET = 0
const PRODUCT_PACKET = 1
const MIN_PACKET = 2
const MAX_PACKET = 3
const LITERAL_PACKET = 4
const GT_PACKET = 5
const LT_PACKET = 6
const EQ_PACKET = 7

const LENGTH_TYPE = 0
const COUNT_TYPE = 1

export class Packet {
  constructor(redis) {
    this.redis = redis
  }

  get versionSum() {
    return this.subpackets.reduce((total, subpacket) => total + subpacket.versionSum, this.version)
  }

  load = async hex => {
    await this.loadBits(hex)
    await this.loadPacket(0)
  }

  loadPacket = async currentBit => {

    currentBit = await this.loadVersion(currentBit)
    currentBit = await this.loadType(currentBit)

    this.subpackets = []

    if (this.type === LITERAL_PACKET) {
      currentBit = await this.parseLiteral(currentBit)
    } else if (this.type !== LITERAL_PACKET) {
      currentBit = await this.parseOperation(currentBit)
    }

    return currentBit
  }

  loadVersion = async currentBit => {
    this.version = await this.fetchBits(currentBit, 3)
    return currentBit + 3
  }

  loadType = async currentBit => {
    this.type = await this.fetchBits(currentBit, 3)
    return currentBit + 3
  }

  async parseLiteral(currentBit) {
    let nibbles = []
    let lastNibble = false

    while (!lastNibble) {
      lastNibble = !(await this.fetchBits(currentBit, 1))
      currentBit++

      let nibble = BigInt(await this.fetchBits(currentBit, 4))
      currentBit += 4

      nibbles.push(nibble)
    }

    this._value = nibbles
      .reverse()
      .reduce((total, nibble, index) => total + ( nibble << (BigInt(index) * 4n) ), 0n)

    return currentBit
  }

  get value() {
    if (this.type === LITERAL_PACKET)
      return BigInt(this._value)

    if (this.type === SUM_PACKET)
      return this.subpackets.reduce((total, subpacket) => total + subpacket.value, 0n)

    if (this.type === PRODUCT_PACKET)
      return this.subpackets.reduce((total, subpacket) => total * subpacket.value, 1n)

    if (this.type === MIN_PACKET)
      return bigIntMin(...this.subpackets.map(subpacket => subpacket.value))

    if (this.type === MAX_PACKET)
      return bigIntMax(...this.subpackets.map(subpacket => subpacket.value))

    if (this.type === GT_PACKET) {
      let [ a, b ] = this.subpackets.map(subpacket => subpacket.value)
      return a > b ? 1n : 0n
    }

    if (this.type === LT_PACKET) {
      let [ a, b ] = this.subpackets.map(subpacket => subpacket.value)
      return a < b ? 1n : 0n
    }

    if (this.type === EQ_PACKET) {
      let [ a, b ] = this.subpackets.map(subpacket => subpacket.value)
      return a === b ? 1n : 0n
    }
  }

  async parseOperation(currentBit) {
    let type = await this.fetchBits(currentBit, 1)
    currentBit++

    if (type === LENGTH_TYPE) {
      currentBit = await this.parseSubpacketsByLength(currentBit)
    } else if (type === COUNT_TYPE) {
      currentBit = await this.parseSubpacketsByCount(currentBit)
    }

    return currentBit
  }

  async parseSubpacketsByLength(currentBit) {
    let length = await this.fetchBits(currentBit, 15)
    currentBit += 15

    let endOfSubpackets = currentBit + length

    while(currentBit < endOfSubpackets) {
      let subpacket = new Packet(this.redis)
      currentBit = await subpacket.loadPacket(currentBit)
      this.subpackets.push(subpacket)
    }

    return currentBit
  }

  async parseSubpacketsByCount(currentBit) {
    let count = await this.fetchBits(currentBit, 11)
    currentBit += 11

    for (let i = 0; i < count; i++) {
      let subpacket = new Packet(this.redis)
      currentBit = await subpacket.loadPacket(currentBit)
      this.subpackets.push(subpacket)
    }

    return currentBit
  }

  loadBits = async hexString => await this.redis.loadBits(hexString)
  fetchBits = async (start, size) => await this.redis.fetchBits(start, size)
}