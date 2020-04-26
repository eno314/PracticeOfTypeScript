export class Card {
  private readonly value: number

  constructor (value: number) {
    this.value = value
  }
}

export class CardList {
  private readonly cards: Card[]

  constructor (cards: Card[]) {
    this.cards = cards
  }

  sumScore (): number {
    return 0
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
  const cards = cardsString.split(' ').map(cardString => new Card(parseNumberString(cardString)))
  if (n !== cards.length) {
    throwError()
  }

  return new CardList(cards)
}

export function executeGame (cardList: CardList): [CardList, CardList] {
  return [new CardList([1]), new CardList([1])]
}

export function calculateAnswer (aliceCardList: CardList, bobCardList: CardList): number {
  return 0
}

export function main (inputLoader: () => string, outputPrinter: (outputString: string) => void): void {
  const cardList = parseInput(inputLoader())
  const [aliceCardList, bobCardList] = executeGame(cardList)
  const answer = calculateAnswer(aliceCardList, bobCardList)
  outputPrinter(String(answer))
}
