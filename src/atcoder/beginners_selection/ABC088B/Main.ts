export class CardList {
  private readonly cards: number[]

  constructor (cards: number[]) {
    this.cards = cards
  }

  sumScore (): number {
    return 0
  }
}

export function parseInput (input: string): CardList {
  return new CardList([1])
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
