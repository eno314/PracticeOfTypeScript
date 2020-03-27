import { PracticeA } from './PracticeA'
import { PracticeAInput } from './PracticeAInput'

jest.mock('./PracticeAInput')

describe('execute', () => {
  const outputString = 'output string'
  const inputString = 'input string'

  const mockInputLoader = jest.fn(() => inputString)
  const mockInputParser = jest.fn(_ => new PracticeAInput(0, 0, 0, 'test'))
  const mockOutputPrinter = jest.fn(_ => _)

  beforeAll(() => {
    (PracticeAInput as jest.Mock).mockImplementation(() => {
      return {
        toOutputString: (): string => {
          return outputString
        }
      }
    })
  })

  test('入力値を読み込み、入力値をパースして、出力値に変換し、出力する', () => {
    const practiceA = new PracticeA(mockInputLoader, mockInputParser, mockOutputPrinter)
    practiceA.execute()

    // verify mockInputLoader
    expect(mockInputLoader.mock.calls.length).toBe(1)
    // verify mockInputParser
    expect(mockInputParser.mock.calls.length).toBe(1)
    expect(mockInputParser.mock.calls[0][0]).toBe(inputString)
    // verify mockOutputPrinter
    expect(mockOutputPrinter.mock.calls.length).toBe(1)
    expect(mockOutputPrinter.mock.calls[0][0]).toBe(outputString)
  })
})
