import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { GetUserMealsUseCase } from '../get-user-meals'

export function makeGetUserMealsUseCase() {
  const mealsRepository = new PrismaMealsRepository()
  const authenticateUseCase = new GetUserMealsUseCase(mealsRepository)

  return authenticateUseCase
}
