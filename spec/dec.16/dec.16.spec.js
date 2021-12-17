import { Packet, RedisBits } from "../../lib/dec.16"

describe("December 16", () => {
  let redisBits, packet, subpacket

  beforeEach(async () => {
    redisBits = new RedisBits('packets')
    await redisBits.open()
  })

  afterEach(async () => await redisBits.close())

  describe("when parsing a value literal packet", () => {
    beforeEach(async () => {
      packet = new Packet(redisBits)
      await packet.load('D2FE28')
    })

    it("hath the expected version", () => expect(packet.version).toBe(6))
    it("hath the expected packet type", () => expect(packet.type).toBe(4))
    it("hath the expected value", () => expect(packet.value).toBe(2021n))
    it("hath subpackets not", () => expect(packet.subpackets).toHaveLength(0))
  })

  describe("when parsing a length-type operation packet", () => {
    beforeEach(async () => {
      packet = new Packet(redisBits)
      await packet.load('38006F45291200')
    })

    it("hath the expected version", () => expect(packet.version).toBe(1))
    it("hath the expected packet type", () => expect(packet.type).toBe(6))
    it("hath two subpackets", () => expect(packet.subpackets).toHaveLength(2))

    describe("subpacket #1", () => {
      beforeEach(() => subpacket = packet.subpackets[0])
      it("hath the expected version", async () => expect(await subpacket.version).toBe(6))
      it("hath the expected packet type", async () => expect(await subpacket.type).toBe(4))
      it("hath the expected value", async () => expect(await subpacket.value).toBe(10n))
    })

    describe("subpacket #2", () => {
      beforeEach(() => subpacket = packet.subpackets[1])
      it("hath the expected version", async () => expect(await subpacket.version).toBe(2))
      it("hath the expected packet type", async () => expect(await subpacket.type).toBe(4))
      it("hath the expected value", async () => expect(await subpacket.value).toBe(20n))
    })
  })

  describe("when parsing a count-type operation packet", () => {
    beforeEach(async () => {
      packet = new Packet(redisBits)
      await packet.load('EE00D40C823060')
    })

    it("hath the expected version", () => expect(packet.version).toBe(7))
    it("hath the expected packet type", () => expect(packet.type).toBe(3))
    it("hath three subpackets", () => expect(packet.subpackets).toHaveLength(3))

    describe("subpacket #1", () => {
      beforeEach(() => subpacket = packet.subpackets[0])
      it("hath the expected version", async () => expect(await subpacket.version).toBe(2))
      it("hath the expected packet type", async () => expect(await subpacket.type).toBe(4))
      it("hath the expected value", async () => expect(await subpacket.value).toBe(1n))
    })

    describe("subpacket #2", () => {
      beforeEach(() => subpacket = packet.subpackets[1])
      it("hath the expected version", async () => expect(await subpacket.version).toBe(4))
      it("hath the expected packet type", async () => expect(await subpacket.type).toBe(4))
      it("hath the expected value", async () => expect(await subpacket.value).toBe(2n))
    })

    describe("subpacket #3", () => {
      beforeEach(() => subpacket = packet.subpackets[2])
      it("hath the expected version", async () => expect(await subpacket.version).toBe(1))
      it("hath the expected packet type", async () => expect(await subpacket.type).toBe(4))
      it("hath the expected value", async () => expect(await subpacket.value).toBe(3n))
    })
  })

  describe("when parsing a straight and deep packet set", () => {
    beforeEach(async () => {
      packet = new Packet(redisBits)
      await packet.load('8A004A801A8002F478')
    })

    it("hath the expected structure", () => {
      expect(packet.version).toBe(4)
      expect(packet.type).toBe(2)
      expect(packet.subpackets).toHaveLength(1)
      expect(packet.subpackets[0].version).toBe(1)
      expect(packet.subpackets[0].type).toBe(2)
      expect(packet.subpackets[0].subpackets).toHaveLength(1)
      expect(packet.subpackets[0].subpackets[0].version).toBe(5)
      expect(packet.subpackets[0].subpackets[0].type).toBe(2)
      expect(packet.subpackets[0].subpackets[0].subpackets).toHaveLength(1)
      expect(packet.subpackets[0].subpackets[0].subpackets[0].version).toBe(6)
      expect(packet.subpackets[0].subpackets[0].subpackets[0].type).toBe(4)
      expect(packet.subpackets[0].subpackets[0].subpackets[0].subpackets).toHaveLength(0)
    })

    it("hath the expected version sum", () => {
      expect(packet.versionSum).toBe(16)
    })
  })

  describe("when parsing a balanced packet set", () => {
    beforeEach(async () => {
      packet = new Packet(redisBits)
      await packet.load('620080001611562C8802118E34')
    })

    it("hath the expected version sum", () => {
      expect(packet.versionSum).toBe(12)
    })
  })

  describe("when parsing a different balanced packet set", () => {
    beforeEach(async () => {
      packet = new Packet(redisBits)
      await packet.load('C0015000016115A2E0802F182340')
    })

    it("hath the expected version sum", () => {
      expect(packet.versionSum).toBe(23)
    })
  })

  describe("when parsing a wide packet set", () => {
    beforeEach(async () => {
      packet = new Packet(redisBits)
      await packet.load('A0016C880162017C3686B18A3D4780')
    })

    it("hath the expected version sum", () => {
      expect(packet.versionSum).toBe(31)
    })
  })

  describe.each([
    { description: "sums two numbers", hexString: 'C200B40A82', expectedValue: 3n },
    { description: "multiplies two numbers", hexString: '04005AC33890', expectedValue: 54n },
    { description: "finds the smallest number", hexString: '880086C3E88112', expectedValue: 7n },
    { description: "finds the biggest number", hexString: 'CE00C43D881120', expectedValue: 9n },
    { description: "greater than compares two numbers", hexString: 'D8005AC2A8F0', expectedValue: 1n },
    { description: "less than compares two numbers", hexString: 'F600BC2D8F', expectedValue: 0n },
    { description: "equal compares two numbers", hexString: '9C005AC2F8F0', expectedValue: 0n },
    { description: "does complex math", hexString: '9C0141080250320F1802104A08', expectedValue: 1n }
  ])('when calculating various values ', ({ description, hexString, expectedValue }) => {

    it(description, async () => {
      packet = new Packet(redisBits)
      await packet.load(hexString)
      expect(packet.value).toBe(expectedValue)
    })
  })

  it("computes the real answer", async () => {
    packet = new Packet(redisBits)
    await packet.load('60556F980272DCE609BC01300042622C428BC200DC128C50FCC0159E9DB9AEA86003430BE5EFA8DB0AC401A4CA4E8A3400E6CFF7518F51A554100180956198529B6A700965634F96C0B99DCF4A13DF6D200DCE801A497FF5BE5FFD6B99DE2B11250034C00F5003900B1270024009D610031400E70020C0093002980652700298051310030C00F50028802B2200809C00F999EF39C79C8800849D398CE4027CCECBDA25A00D4040198D31920C8002170DA37C660009B26EFCA204FDF10E7A85E402304E0E60066A200F4638311C440198A11B635180233023A0094C6186630C44017E500345310FF0A65B0273982C929EEC0000264180390661FC403006E2EC1D86A600F43285504CC02A9D64931293779335983D300568035200042A29C55886200FC6A8B31CE647880323E0068E6E175E9B85D72525B743005646DA57C007CE6634C354CC698689BDBF1005F7231A0FE002F91067EF2E40167B17B503E666693FD9848803106252DFAD40E63D42020041648F24460400D8ECE007CBF26F92B0949B275C9402794338B329F88DC97D608028D9982BF802327D4A9FC10B803F33BD804E7B5DDAA4356014A646D1079E8467EF702A573FAF335EB74906CF5F2ACA00B43E8A460086002A3277BA74911C9531F613009A5CCE7D8248065000402B92D47F14B97C723B953C7B22392788A7CD62C1EC00D14CC23F1D94A3D100A1C200F42A8C51A00010A847176380002110EA31C713004A366006A0200C47483109C0010F8C10AE13C9CA9BDE59080325A0068A6B4CF333949EE635B495003273F76E000BCA47E2331A9DE5D698272F722200DDE801F098EDAC7131DB58E24F5C5D300627122456E58D4C01091C7A283E00ACD34CB20426500BA7F1EBDBBD209FAC75F579ACEB3E5D8FD2DD4E300565EBEDD32AD6008CCE3A492F98E15CC013C0086A5A12E7C46761DBB8CDDBD8BE656780')

    expect(packet.versionSum).toBe(871)
    expect(packet.value).toBe(68703010504n)
  })
})
