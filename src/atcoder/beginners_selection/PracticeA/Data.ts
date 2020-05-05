import { validateRange } from '../../libs/InputParserLibrary'

export class Data {
  static readonly MIN_NUMBER = 1
  static readonly MAX_NUMBER = 1000

  static readonly MIN_STRING_LENGTH= 1
  static readonly MAX_STRING_LENGTH= 100

  private readonly a: number
  private readonly b: number
  private readonly c: number
  private readonly s: string

  constructor (a: number, b: number, c: number, s: string) {
    validateRange(a, Data.MIN_NUMBER, Data.MAX_NUMBER)
    validateRange(b, Data.MIN_NUMBER, Data.MAX_NUMBER)
    validateRange(c, Data.MIN_NUMBER, Data.MAX_NUMBER)
    validateRange(s.length, Data.MIN_STRING_LENGTH, Data.MAX_STRING_LENGTH)
    this.a = a
    this.b = b
    this.c = c
    this.s = s
  }

  toString (): string {
    return `${this.a + this.b + this.c} ${this.s}`
  }
}
