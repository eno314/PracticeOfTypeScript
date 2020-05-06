import { parseInput } from './InputParser'
import { Squares } from './Squares'

describe('入力値をマスs1,s2,s3にパースする', () => {
  test.each([
    ['100', new Squares('1', '0', '0')],
    ['010', new Squares('0', '1', '0')],
    ['001', new Squares('0', '0', '1')]
  ])('%oをパースすると%oになる', (input: string, expected: Squares) => {
    const actual = parseInput(input)
    expect(actual).toEqual(expected)
  })
})

describe('入力値の形式が不正の場合、例外を投げる', () => {
  describe('入力値の文字列長が3未満の場合', () => {
    testOnInvalidFormat([
      [''],
      ['1'],
      ['10']
    ])
  })

  describe('s1に当たる文字が0か1ではない場合', () => {
    testOnInvalidFormat([
      [' 00'],
      ['211']
    ])
  })

  describe('s2に当たる文字が0か1ではない場合', () => {
    testOnInvalidFormat([
      ['0 0'],
      ['121']
    ])
  })

  describe('s3に当たる文字が0か1ではない場合', () => {
    testOnInvalidFormat([
      ['00 '],
      ['112']
    ])
  })

  function testOnInvalidFormat (testCases: string[][]): void {
    test.each(testCases)('%oをパースすると例外を投げる', (input: string) => {
      expect(() => {
        parseInput(input)
      }).toThrowError('invalid format input')
    })
  }
})
