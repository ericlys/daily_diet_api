import { MealsRepository } from '@/repositories/meals-repository'
import { Meal } from '@prisma/client'

interface CreateMealUseCaseRequest {
  name: string
  description: string
  on_diet: boolean
  user_id: string
}

interface CreateMealUseCaseResponse {
  meal: Meal
}

export class CreateMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute(
    data: CreateMealUseCaseRequest,
  ): Promise<CreateMealUseCaseResponse> {
    const meal = await this.mealsRepository.create(data)

    return { meal }
  }
}
