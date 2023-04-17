import { Prisma, Meal } from '@prisma/client'
import { MealsRepository } from '../meals-repository'
import { randomUUID } from 'crypto'

export class InMemoryMealsRepository implements MealsRepository {
  private item: Meal[] = []

  async create(data: Prisma.MealUncheckedCreateInput): Promise<Meal> {
    const meal = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      date_time: data.date_time instanceof Date ? data.date_time : new Date(),
      on_diet: data.on_diet,
      user_id: data.user_id,
      created_at: new Date(),
    }

    this.item.push(meal)

    return meal
  }
}
