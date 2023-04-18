import { MealsRepository } from './meals-repository'

interface MealMetrics {
  on_diet: number
  out_of_diet: number
  best_sequence: number
}

export interface MetricsRepository extends MealsRepository {
  getMetricsByUserId(userId: string): Promise<MealMetrics>
}
