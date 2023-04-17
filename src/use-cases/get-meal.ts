import { MealsRepository } from '@/repositories/meals-repository'
import { Meal } from '@prisma/client'
import { ResourceNotFoundError } from './erros/resource-not-found-error'

interface GetMealUseCaseResponse {
  meal: Meal
}

export class GetMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute(id: string): Promise<GetMealUseCaseResponse> {
    const meal = await this.mealsRepository.findById(id)

    if (!meal) {
      throw new ResourceNotFoundError()
    }

    return { meal }
  }
}
