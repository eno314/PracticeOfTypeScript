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

function getNextStrings (currentString: string): string[] {
  return conditions.filter(condition => currentString.startsWith(condition))
    .map(condition => currentString.slice(condition.length))
}

function getNextString (currentString: string): string | null {
  const nextStrings = getNextStrings(currentString)
  if (nextStrings.length === 0) {
    return null
  }
  for (let i = 0; i < nextStrings.length; i++) {
    const nextString = nextStrings[i]
    if (getNextStrings(nextString).length > 0) {
      return nextString
    }
  }
  return null
}

export function isMatchedTheCondition (input: string): boolean {
  if (input.length === 0) {
    return false
  }
  let currentString = input
  while (currentString.length > 0) {
    if (conditions.includes(currentString)) {
      return true
    }
    const nextString = getNextString(currentString)
    if (nextString === null) {
      return false
    }
    currentString = nextString
  }
  return false
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
