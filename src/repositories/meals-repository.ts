import { Prisma, Meal } from '@prisma/client'

export interface UpdateMealParams {
  id: string
  name?: string
  description?: string
  date_time?: Date
  on_diet?: boolean
}

export interface MealMetrics {
  on_diet: number
  out_of_diet: number
  best_sequence: number
}

export interface MealsRepository {
  create(data: Prisma.MealUncheckedCreateInput): Promise<Meal>
  findById(id: string): Promise<Meal | null>
  update(params: UpdateMealParams): Promise<Meal>
  findManyByUserId(userId: string, page: number): Promise<Meal[]>
  delete(id: string): Promise<void>
  getMetricsByUserId(userId: string): Promise<MealMetrics>
}
