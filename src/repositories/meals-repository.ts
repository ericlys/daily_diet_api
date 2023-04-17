import { Prisma, Meal } from '@prisma/client'

export interface UpdateMealParams {
  id: string
  name?: string
  description?: string
  date_time?: Date
  on_diet?: boolean
}

export interface MealsRepository {
  create(data: Prisma.MealUncheckedCreateInput): Promise<Meal>
  findById(id: string): Promise<Meal | null>
  update(params: UpdateMealParams): Promise<Meal>
  delete(id: string): Promise<void>
}
