export class VisitPoint {
  private readonly t: number
  private readonly x: number
  private readonly y: number

  constructor (t: number, x: number, y: number) {
    this.t = t
    this.x = x
    this.y = y
  }

  canGoTo (to: VisitPoint): boolean {
    return this.canGoToByDistanceAndTime(to)
  }

  private canGoToByDistanceAndTime (to: VisitPoint): boolean {
    const diffTime = this.diffTime(to)
    const distance = this.distance(to)
    if (!this.canArrive(diffTime, distance)) {
      return false
    }
    const extraTime = diffTime - distance
    return this.canBackToSamePoint(extraTime)
  }

  private diffTime (other: VisitPoint): number {
    return Math.abs(this.t - other.t)
  }

  private distance (other: VisitPoint): number {
    const dx = Math.abs(this.x - other.x)
    const dy = Math.abs(this.y - other.y)
    return dx + dy
  }

  private canArrive (diffTime: number, distance: number): boolean {
    return diffTime >= distance
  }

  private canBackToSamePoint (time: number): boolean {
    return time % 2 === 0
  }
}
