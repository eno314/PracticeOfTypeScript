import { VisitPoint } from './VisitPoint'

export class TravelPlan {
  static readonly FIRST_POINT = new VisitPoint(0, 0, 0)

  private readonly visitPoints: VisitPoint[]

  constructor (visitPoints: VisitPoint[]) {
    this.visitPoints = visitPoints
  }

  canDo (): boolean {
    return this.canDoByConparingVisitPoints()
  }

  private canDoByConparingVisitPoints (): boolean {
    let current = TravelPlan.FIRST_POINT
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
