import { MealsRepository } from '@/repositories/meals-repository'
import { ResourceNotFoundError } from './erros/resource-not-found-error'

interface DeleteMealUseCaseRequest {
  id: string
}

export class DeleteMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({ id }: DeleteMealUseCaseRequest): Promise<void> {
    const meal = await this.mealsRepository.findById(id)

    if (!meal) {
      throw new ResourceNotFoundError()
    }

    await this.mealsRepository.delete(id)
  }
}
