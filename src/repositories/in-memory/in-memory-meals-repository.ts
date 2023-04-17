import { Prisma, Meal } from '@prisma/client'
import { MealsRepository, UpdateMealParams } from '../meals-repository'
import { randomUUID } from 'crypto'

export class InMemoryMealsRepository implements MealsRepository {
  private items: Meal[] = []

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

    this.items.push(meal)

    return meal
  }

  async findById(id: string): Promise<Meal | null> {
    const meal = this.items.find((item) => item.id === id)
    return meal ?? null
  }

  async update(params: UpdateMealParams): Promise<Meal> {
    const mealIndex = this.items.findIndex((item) => item.id === params.id)
    Object.assign(this.items[mealIndex], params)

    return this.items[mealIndex]
  }
}
