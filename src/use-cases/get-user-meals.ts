import { MealsRepository } from '@/repositories/meals-repository'
import { Meal } from '@prisma/client'

interface GetUserMealsUseCaseRequest {
  user_id: string
  page: number
}

interface GetUserMealsUseCaseResponse {
  meals: Meal[]
}

export class GetUserMealsUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    user_id,
    page,
  }: GetUserMealsUseCaseRequest): Promise<GetUserMealsUseCaseResponse> {
    const meals = await this.mealsRepository.findManyByUserId(user_id, page)

    return { meals }
  }
}
