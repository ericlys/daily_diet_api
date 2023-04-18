import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { GetMealUseCase } from '../get-meal'

export function makeGetMealUseCase() {
  const mealsRepository = new PrismaMealsRepository()
  const authenticateUseCase = new GetMealUseCase(mealsRepository)

  return authenticateUseCase
}
