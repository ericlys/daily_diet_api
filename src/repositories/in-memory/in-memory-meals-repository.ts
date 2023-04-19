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

  async findByUserIdAndId(userId: string, id: string) {
    const meal = this.items.find(
      (item) => item.id === id && item.user_id === userId,
    )
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

  async getMetricsByUserId(userId: string) {
    const userMeals = this.items
      .filter((item) => item.user_id === userId)
      .sort((a, b) => a.date_time.getTime() - b.date_time.getTime())

    let max = 0
    const metrics = userMeals.reduce(
      (acc, item) => {
        acc.total++
        acc[item.on_diet ? 'on_diet' : 'out_of_diet']++
        max = item.on_diet ? max + 1 : 0
        acc.best_sequence = Math.max(acc.best_sequence, max)
        return acc
      },
      {
        total: 0,
        on_diet: 0,
        out_of_diet: 0,
        best_sequence: 0,
      },
    )

    return metrics
  }
}
