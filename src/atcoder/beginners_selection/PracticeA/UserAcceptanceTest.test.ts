import { main } from './Main'

describe('受け入れテスト', () => {
  const mockOutputPrinter = jest.fn(_ => _)

  test.each([
    ['1\n2 3\ntest', '6 test'],
    ['72\n128 256\nmyonmyon', '456 myonmyon']
  ])('入力値を読み込み、入力値をパースして、出力値に変換し、出力する', (inputString: string, expectedOutputString: string) => {
    const mockInputLoader = jest.fn(() => inputString)

    main(mockInputLoader, mockOutputPrinter)

    expect(mockInputLoader.mock.calls.length).toBe(1)
    expect(mockOutputPrinter.mock.calls.length).toBe(1)
    expect(mockOutputPrinter.mock.calls[0][0]).toBe(expectedOutputString)
  })
})
