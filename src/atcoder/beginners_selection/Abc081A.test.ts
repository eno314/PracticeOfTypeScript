import { InputParser, Squares } from './Abc081A'

describe('入力値をマスs1,s2,s3にパースする', () => {
  const parser = new InputParser()

  test.each([
    ['100', new Squares('1', '0', '0')],
    ['010', new Squares('0', '1', '0')],
    ['001', new Squares('0', '0', '1')]
  ])('parse of InputPrser should return Squares.', (input: string, expected: Squares) => {
    const actual = parser.parse(input)
    expect(actual).toEqual(expected)
  })
})
