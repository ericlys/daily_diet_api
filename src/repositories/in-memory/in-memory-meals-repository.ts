import { Prisma, Meal } from '@prisma/client'
import { MealsRepository, UpdateMealParams } from '../meals-repository'
import { randomUUID } from 'crypto'

export class InMemoryMealsRepository implements MealsRepository {
  private items: Meal[] = []

  async create(data: Prisma.MealUncheckedCreateInput) {
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

  async findById(id: string) {
    const meal = this.items.find((item) => item.id === id)
    return meal ?? null
  }

  async findManyByUserId(userId: string, page: number) {
    return this.items
      .filter((item) => item.user_id === userId)
      .slice((page - 1) * 20, page * 20)
  }

  async update(params: UpdateMealParams) {
    const mealIndex = this.items.findIndex((item) => item.id === params.id)
    Object.assign(this.items[mealIndex], params)

    return this.items[mealIndex]
  }

  async delete(id: string) {
    const mealIndex = this.items.findIndex((item) => item.id === id)
    this.items.splice(mealIndex, 1)
  }
}
