import { MealsRepository } from '@/repositories/meals-repository'
import { Meal } from '@prisma/client'
import { ResourceNotFoundError } from './erros/resource-not-found-error'

interface GetMealUseCaseResponse {
  meal: Meal
}

export class GetMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute(user_id: string, id: string): Promise<GetMealUseCaseResponse> {
    const meal = await this.mealsRepository.findByUserIdAndId(user_id, id)

    if (!meal) {
      throw new ResourceNotFoundError()
    }

    return { meal }
  }
}
