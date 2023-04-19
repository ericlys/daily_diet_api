import { MealsRepository } from '@/repositories/meals-repository'
import { ResourceNotFoundError } from './erros/resource-not-found-error'

interface DeleteMealUseCaseRequest {
  user_id: string
  id: string
}

export class DeleteMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({ user_id, id }: DeleteMealUseCaseRequest): Promise<void> {
    const meal = await this.mealsRepository.findByUserIdAndId(user_id, id)

    if (!meal) {
      throw new ResourceNotFoundError()
    }

    await this.mealsRepository.delete(id)
  }
}
