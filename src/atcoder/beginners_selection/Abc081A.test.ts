import { InputParser, Squares } from './Abc081A'

describe('入力値をマスs1,s2,s3にパースする', () => {
  const parser = new InputParser()

  test.each([
    ['100', new Squares('1', '0', '0')],
    ['010', new Squares('0', '1', '0')],
    ['001', new Squares('0', '0', '1')]
  ])('InputParserのparseはSquaresを返す', (input: string, expected: Squares) => {
    const actual = parser.parse(input)
    expect(actual).toEqual(expected)
  })
})

describe('入力値の形式が不正の場合、例外を投げる', () => {
  const parser = new InputParser()

  test.each([
    [''],
    ['1'],
    ['10'],
    ['1001']
  ])('InputParserのparseは、入力値の文字列長が3ではない場合、例外を投げる', (input: string) => {
    expect(() => {
      parser.parse(input)
    }).toThrowError('input format is invalid.')
  })
})
