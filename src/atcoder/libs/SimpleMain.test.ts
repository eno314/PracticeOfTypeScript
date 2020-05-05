import { defaultInputLoader, defaultOutputPrinter, SimpleMain } from './SimpleMain'

const outputString = 'ouput string'
const mockTranslator = jest.fn(_ => outputString)

class StubSimpleMain extends SimpleMain {
  translate (input: string): string {
    return mockTranslator(input)
  }
}

describe('入力値から出力値を生成して出力するシンプルなAtCoderの問題用のMain', () => {
  describe('実行時のワークフロー', () => {
    const inputString = 'input string'
    const mockInputLoader = jest.fn(() => inputString)
    const mockOutputPrinter = jest.fn(_ => _)

    const main = new StubSimpleMain(mockInputLoader, mockOutputPrinter)

    test('入力値を読み込み、入力値を変換し、変換した結果を出力する', () => {
      main.execute()

      verifyInputLoaderCalled()
      verifyTranslatorCalled()
      verifyOutputPrinterCalled()
    })

    function verifyInputLoaderCalled (): void {
      expect(mockInputLoader.mock.calls.length).toBe(1)
    }

    function verifyTranslatorCalled (): void {
      expect(mockTranslator.mock.calls.length).toBe(1)
      expect(mockTranslator.mock.calls[0][0]).toBe(inputString)
    }

    function verifyOutputPrinterCalled (): void {
      expect(mockOutputPrinter.mock.calls.length).toBe(1)
      expect(mockOutputPrinter.mock.calls[0][0]).toBe(outputString)
    }
  })
})

describe('inputLoaderとoutputPrinterのデフォルト値', () => {
  test('inputLoaderとoutputPrinterを指定せずにSimpleMainをインスタンス化すると、デフォルト値が設定される', () => {
    const expected = new StubSimpleMain(defaultInputLoader, defaultOutputPrinter)

    const actual = new StubSimpleMain()

    expect(actual).toEqual(expected)
  })
})
