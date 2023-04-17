import { MealsRepository } from '@/repositories/meals-repository'
import { ResourceNotFoundError } from './erros/resource-not-found-error'
import { Meal } from '@prisma/client'

interface UpdateMealUseCaseRequest {
  id: string
  name?: string
  description?: string
  date_time?: Date
  on_diet?: boolean
}

interface UpdateMealUseCaseResponse {
  meal: Meal
}

export class UpdateMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute(
    params: UpdateMealUseCaseRequest,
  ): Promise<UpdateMealUseCaseResponse> {
    const mealExists = await this.mealsRepository.findById(params.id)

    if (!mealExists) {
      throw new ResourceNotFoundError()
    }

    const meal = await this.mealsRepository.update(params)

    return { meal }
  }
}
