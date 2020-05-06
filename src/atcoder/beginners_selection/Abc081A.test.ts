import { abc081A, loadInput, printOutput } from './Abc081A'

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
