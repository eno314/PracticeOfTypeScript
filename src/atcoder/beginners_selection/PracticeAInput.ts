export class PracticeAInput {
  private readonly a: number
  private readonly b: number
  private readonly c: number
  private readonly s: string

  constructor (a: number, b: number, c: number, s: string) {
    if (!this.isValidNumberProperty(a)) {
      throw new Error('a violates constraint.')
    }
    if (!this.isValidNumberProperty(b)) {
      throw new Error('b violates constraint.')
    }
    if (!this.isValidNumberProperty(c)) {
      throw new Error('c violates constraint.')
    }
    if (!this.isValidStringProperty(s)) {
      throw new Error('s violates constraint.')
    }

    this.a = a
    this.b = b
    this.c = c
    this.s = s
  }

  private isValidNumberProperty (num: number): boolean {
    if (!Number.isInteger(num)) {
      return false
    }

    return num >= 1 && num <= 1000
  }

  private isValidStringProperty (str: string): boolean {
    return str.length >= 1 && str.length <= 100
  }

  toOutputString (): string {
    return ''
  }
}
