const daydreamWords = ['dream', 'dreamer', 'erase', 'eraser']

function getTextsRemoveDaydreamWord (text: string): string[] {
  return daydreamWords.filter(word => text.startsWith(word))
    .map(word => text.slice(word.length))
}

function isDaydreamWord (text: string): boolean {
  return daydreamWords.includes(text)
}

class DaydreamText {
  private readonly text: string

  constructor (text: string) {
    this.text = text
  }

  removeDaydreamWord (): DaydreamText | null {
    const textsRemovedDaydreamWord = getTextsRemoveDaydreamWord(this.text)
    if (textsRemovedDaydreamWord.length === 0) {
      return null
    }

    for (let i = 0; i < textsRemovedDaydreamWord.length; i++) {
      const textRemovedDaydreamWord = textsRemovedDaydreamWord[i]
      if (getTextsRemoveDaydreamWord(textRemovedDaydreamWord).length > 0) {
        return new DaydreamText(textRemovedDaydreamWord)
      }
    }
    return null
  }

  equalToDaydreamWord (): boolean {
    return isDaydreamWord(this.text)
  }

  isEmpty (): boolean {
    return this.text.length === 0
  }
}

export function isMatchedTheCondition (input: string): boolean {
  if (input.length === 0) {
    return false
  }
  let daydreamText = new DaydreamText(input)
  while (!daydreamText.isEmpty()) {
    if (daydreamText.equalToDaydreamWord()) {
      return true
    }
    const nextDaydreamText = daydreamText.removeDaydreamWord()
    if (nextDaydreamText === null) {
      return false
    }
    daydreamText = nextDaydreamText
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
