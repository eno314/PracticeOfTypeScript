export class Square {
  private readonly value: '0' | '1'

  constructor (value: string) {
    if (value !== '0' && value !== '1') {
      throw new Error('input string violates constraint.')
    }
    this.value = value
  }

  canPlaceMarble (): boolean {
    return this.value === '1'
  }
}
