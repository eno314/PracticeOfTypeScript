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

  equalPoint (other: VisitPoint): boolean {
    return this.x === other.x && this.y === other.y
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

  canGoToWithRecursiveCall (to: VisitPoint): boolean {
    if (this.canGoToOnPlusX(to)) {
      return true
    }
    if (this.canGoToOnMinusX(to)) {
      return true
    }
    if (this.canGoToOnPlusY(to)) {
      return true
    }
    if (this.canGoToOnMinusY(to)) {
      return true
    }
    return false
  }

  private canGoToOnPlusX (to: VisitPoint): boolean {
    if (this.x + to.diffTime(this) < to.x) {
      // 届かないのでこれ以上の計算は不要
      return false
    }
    const next = new VisitPoint(this.t + 1, this.x + 1, this.y)
    return this.canGoFromNextTo(next, to)
  }

  private canGoToOnMinusX (to: VisitPoint): boolean {
    if (this.x - to.diffTime(this) > to.x) {
      // 届かないのでこれ以上の計算は不要
      return false
    }
    const next = new VisitPoint(this.t + 1, this.x - 1, this.y)
    return this.canGoFromNextTo(next, to)
  }

  private canGoToOnPlusY (to: VisitPoint): boolean {
    if (this.y + to.diffTime(this) < to.y) {
      // 届かないのでこれ以上の計算は不要
      return false
    }
    const next = new VisitPoint(this.t + 1, this.x, this.y + 1)
    return this.canGoFromNextTo(next, to)
  }

  private canGoToOnMinusY (to: VisitPoint): boolean {
    if (this.y - to.diffTime(this) > to.y) {
      // 届かないのでこれ以上の計算は不要
      return false
    }
    const next = new VisitPoint(this.t + 1, this.x, this.y - 1)
    return this.canGoFromNextTo(next, to)
  }

  private canGoFromNextTo (next: VisitPoint, to: VisitPoint): boolean {
    if (next.equalVisitPoint(to)) {
      return true
    }
    if (to.diffTime(this) > 1 && next.canGoToWithRecursiveCall(to)) {
      return true
    }
    return false
  }
}

export class TravelPlan {
  private static readonly FIRST_TRAVEL_POINT = new VisitPoint(0, 0, 0)

  private readonly visitPoints: VisitPoint[]

  constructor (visitPoints: VisitPoint[]) {
    this.visitPoints = visitPoints
  }

  canDo (): boolean {
    let current = TravelPlan.FIRST_TRAVEL_POINT
    for (let i = 0; i < this.visitPoints.length; i++) {
      const next = this.visitPoints[i]
      if (!current.canGoTo(next)) {
        return false
      }
      current = next
    }
    return true
  }
}
