export class CardList {
  private readonly cards: number[]

  constructor (cards: number[]) {
    this.cards = cards
  }

  sumScore (): number {
    if (this.cards.length === 0) {
      return 0
    }
    return this.cards.reduce((previous, current) => previous + current)
  }

  size (): number {
    return this.cards.length
  }

  getAndRemoveMax (): [number, CardList] {
    const maxCard = Math.max(...this.cards)
    const maxCardIndex = this.cards.findIndex(card => card === maxCard)
    const cardListRemovedMax = this.cards.slice(0, maxCardIndex).concat(this.cards.slice(maxCardIndex + 1))
    return [maxCard, new CardList(cardListRemovedMax)]
  }
}

export function parseInput (input: string): CardList {
  const throwError = (): void => { throw new Error('input format is invalid.') }

  const parseNumberString = (numberString: string): number => {
    if (numberString.length === 0) {
      throwError()
    }
    const numberValue = Number(numberString)
    if (Number.isNaN(numberValue) || !Number.isInteger(numberValue)) {
      throwError()
    }
    if (numberValue < 1 || numberValue > 100) {
      throwError()
    }
    return numberValue
  }

  const [nString, cardsString] = input.split('\n')
  if (cardsString === undefined) {
    throwError()
  }

  const n = parseNumberString(nString)
  const cards = cardsString.split(' ').map(cardString => parseNumberString(cardString))
  if (n !== cards.length) {
    throwError()
  }

  return new CardList(cards)
}

export function executeGame (cardList: CardList): [CardList, CardList] {
  const [aliceCards, bobCards]: [number[], number[]] = [[], []]
  let [currentCardList, maxValue]: [CardList, number] = [cardList, 0]
  for (let i = 0; i < cardList.size(); i++) {
    [maxValue, currentCardList] = currentCardList.getAndRemoveMax()
    if (i % 2 === 0) {
      aliceCards.push(maxValue)
    } else {
      bobCards.push(maxValue)
    }
  }
  return [new CardList(aliceCards), new CardList(bobCards)]
}

export function calculateAnswer (aliceCardList: CardList, bobCardList: CardList): number {
  return aliceCardList.sumScore() - bobCardList.sumScore()
}

export function main (inputLoader: () => string, outputPrinter: (outputString: string) => void): void {
  const cardList = parseInput(inputLoader())
  const [aliceCardList, bobCardList] = executeGame(cardList)
  const answer = calculateAnswer(aliceCardList, bobCardList)
  outputPrinter(String(answer))
}
