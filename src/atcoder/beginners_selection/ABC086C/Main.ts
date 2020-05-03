import { parseInput } from './InputParser'

export function main (inputLoader: () => string, outputPrinter: (outputString: string) => void): void {
  const travelPlan = parseInput(inputLoader())
  if (travelPlan.canDo()) {
    outputPrinter('Yes')
  } else {
    outputPrinter('No')
  }
}

// 以下、AtCoder提出用のコード
// const inputLoader = (): string => {
//   return require('fs').readFileSync('/dev/stdin', 'utf8')
// }
// const outputPrinter = (output: string): void => {
//   console.log(output)
// }
// main(inputLoader, outputPrinter)
