export class PracticeAInput {
  private readonly a: number
  private readonly b: number
  private readonly c: number
  private readonly s: string

  constructor (a: number, b: number, c: number, s: string) {
    this.a = a
    this.b = b
    this.c = c
    this.s = s
  }

  toOutputString (): string {
    return ''
  }
}
