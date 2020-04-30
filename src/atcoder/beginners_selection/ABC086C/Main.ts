export class VisitPoint {
  private readonly t: number
  private readonly x: number
  private readonly y: number

  constructor (t: number, x: number, y: number) {
    this.t = t
    this.x = x
    this.y = y
  }

  equalVisitPoint (other: VisitPoint): boolean {
    return this.x === other.x && this.y === other.y && this.t === other.t
  }

  diffTime (other: VisitPoint): number {
    return this.t - other.t
  }

  canGoTo (to: VisitPoint): boolean {
    const nextPoints = this.nextPoints()
    for (let i = 0; i < nextPoints.length; i++) {
      const nextPoint = nextPoints[i]
      if (nextPoint.equalVisitPoint(to)) {
        return true
      }
      if (to.diffTime(this) > 1) {
        if (nextPoint.canGoTo(to)) {
          return true
        }
      }
    }
    return false
  }

  private nextPoints (): VisitPoint[] {
    const t = this.t + 1
    return [
      new VisitPoint(t, this.x + 1, this.y),
      new VisitPoint(t, this.x - 1, this.y),
      new VisitPoint(t, this.x, this.y + 1),
      new VisitPoint(t, this.x, this.y - 1)
    ]
  }
}
