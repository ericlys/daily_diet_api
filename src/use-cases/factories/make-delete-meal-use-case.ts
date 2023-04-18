import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { DeleteMealUseCase } from '../delete-meal'

export function makeDeleteMealUseCase() {
  const mealsRepository = new PrismaMealsRepository()
  const authenticateUseCase = new DeleteMealUseCase(mealsRepository)

  return authenticateUseCase
}
