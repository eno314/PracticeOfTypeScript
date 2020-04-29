const conditions = ['dream', 'dreamer', 'erase', 'eraser']

export function isMatchedTheConditionRecursively (target: string): boolean {
  if (conditions.includes(target)) {
    return true
  }
  const nextTargets = conditions.filter(condition => target.startsWith(condition))
    .map(condition => target.slice(condition.length))
  for (let i = 0; i < nextTargets.length; i++) {
    if (isMatchedTheConditionRecursively(nextTargets[i])) {
      return true
    }
  }
  return false
}

export function isMatchedTheCondition (input: string): boolean {
  return isMatchedTheConditionRecursively(input)
}

export function main (inputLoader: () => string, outputPrinter: (outputString: string) => void): void {
  const inputs = inputLoader().split('\n')
  if (isMatchedTheCondition(inputs[0])) {
    outputPrinter('YES')
  } else {
    outputPrinter('NO')
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
