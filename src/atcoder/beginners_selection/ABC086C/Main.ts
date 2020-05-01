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
    return this.t - other.t
  }

  canGoTo (to: VisitPoint): boolean {
    if (this.equalPoint(to)) {
      // 同じ地点にいて残り時間が偶数なら可能だが、奇数なら不可能
      if (to.diffTime(this) % 2 === 0) {
        return true
      } else {
        return false
      }
    }
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
    if (to.diffTime(this) > 1 && next.canGoTo(to)) {
      return true
    }
    return false
  }
}
