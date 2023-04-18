import { CreateMealUseCase } from '../create-meal'
import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'

export function makeCreateMealUseCase() {
  const mealsRepository = new PrismaMealsRepository()
  const authenticateUseCase = new CreateMealUseCase(mealsRepository)

  return authenticateUseCase
}
