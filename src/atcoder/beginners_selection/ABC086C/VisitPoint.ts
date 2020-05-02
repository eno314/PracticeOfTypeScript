export class VisitPoint {
  private readonly t: number
  private readonly x: number
  private readonly y: number

  constructor (t: number, x: number, y: number) {
    this.t = t
    this.x = x
    this.y = y
  }

  diffTime (other: VisitPoint): number {
    return Math.abs(this.t - other.t)
  }

  distance (other: VisitPoint): number {
    const dx = Math.abs(this.x - other.x)
    const dy = Math.abs(this.y - other.y)
    return dx + dy
  }

  canGoTo (to: VisitPoint): boolean {
    const distance = this.distance(to)
    const dt = this.diffTime(to)
    if (distance > dt) {
      // 辿り着けない
      return false
    }
    const extraTime = dt - distance
    if (extraTime % 2 === 0) {
      return true
    } else {
      return false
    }
  }
}
