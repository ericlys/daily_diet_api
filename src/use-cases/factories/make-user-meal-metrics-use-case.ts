import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { UserMealMetricsUseCase } from '../user-meal-metrics'

export function makeUserMealMetricsUseCase() {
  const mealsRepository = new PrismaMealsRepository()
  const authenticateUseCase = new UserMealMetricsUseCase(mealsRepository)

  return authenticateUseCase
}
