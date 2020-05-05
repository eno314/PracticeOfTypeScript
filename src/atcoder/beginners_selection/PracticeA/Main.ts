import { InputParser } from './InputParser'

const inputParser = new InputParser()

export function main (inputLoader: () => string, outputPrinter: (outputString: string) => void): void {
  const data = inputParser.parse(inputLoader())
  outputPrinter(data.toString())
}
