import { MealsRepository } from '@/repositories/meals-repository'

interface UserMealMetricsUseCaseResponse {
  on_diet: number
  out_of_diet: number
  best_sequence: number
}

export class UserMealMetricsUseCase {
  constructor(private mealRepository: MealsRepository) {}

  async execute(userId: string): Promise<UserMealMetricsUseCaseResponse> {
    const { on_diet, out_of_diet, best_sequence } =
      await this.mealRepository.getMetricsByUserId(userId)

    return { on_diet, out_of_diet, best_sequence }
  }
}
