import { abc081A, loadInput, parseInput, printOutput } from './Abc081A'
import { Squares } from './ABC081A/Squares'

describe('入力値をマスs1,s2,s3にパースする', () => {
  test.each([
    ['100', new Squares('1', '0', '0')],
    ['010', new Squares('0', '1', '0')],
    ['001', new Squares('0', '0', '1')]
  ])('parseInputはSquaresを返す', (input: string, expected: Squares) => {
    const actual = parseInput(input)
    expect(actual).toEqual(expected)
  })
})

describe('入力値の形式が不正の場合、例外を投げる', () => {
  test.each([
    [''],
    ['1'],
    ['10']
  ])('parseInputは、入力値の文字列長が3未満の場合、例外を投げる', (input: string) => {
    expect(() => {
      parseInput(input)
    }).toThrowError('input format is invalid.')
  })
})

describe('s1,s2,s3が制約に合致しない場合、例外を投げる', () => {
  test.each([
    [' 00'],
    ['211']
  ])('parseInputは、s1に当たる文字が0か1ではない場合、例外を投げる', (input: string) => {
    expect(() => {
      parseInput(input)
    }).toThrowError('input string violates constraint.')
  })

  test.each([
    ['0 0'],
    ['121']
  ])('parseInputは、s2に当たる文字が0か1ではない場合、例外を投げる', (input: string) => {
    expect(() => {
      parseInput(input)
    }).toThrowError('input string violates constraint.')
  })

  test.each([
    ['00 '],
    ['112']
  ])('parseInputは、s3に当たる文字が0か1ではない場合、例外を投げる', (input: string) => {
    expect(() => {
      parseInput(input)
    }).toThrowError('input string violates constraint.')
  })
})

describe('入力値を読み込む', () => {
  test('loadInputは、inputLoaderを呼び出しその値を返す', () => {
    const input = '100'
    const inputLoader = jest.fn(() => input)

    const actual = loadInput(inputLoader)

    expect(actual).toBe(input)
  })
})

describe('出力値を出力する', () => {
  test('printOutputは、outputPrinterを呼び出す', () => {
    const output = '1'
    const outputPrinter = jest.fn(_ => _)

    printOutput(output, outputPrinter)

    expect(outputPrinter.mock.calls.length).toBe(1)
    expect(outputPrinter.mock.calls[0][0]).toBe(output)
  })
})

describe.each([
  ['000', '0'],
  ['100', '1'],
  ['110', '2'],
  ['111', '3']
])('結合テスト', (input: string, expected: string) => {
  test(`abc081Aは"${input}"を渡すと"${expected}"を返す`, () => {
    const actual = abc081A(input)
    expect(actual).toEqual(expected)
  })
})
