import { throwError } from '../../libs/InputParserLibrary'

export class Square {
  private readonly value: '0' | '1'

  constructor (value: string) {
    if (value !== '0' && value !== '1') {
      throwError()
    }
    this.value = value as '0' | '1'
  }

  canPlaceMarble (): boolean {
    return this.value === '1'
  }
}
