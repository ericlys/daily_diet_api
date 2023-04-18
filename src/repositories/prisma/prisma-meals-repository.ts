import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import {
  MealMetrics,
  MealsRepository,
  UpdateMealParams,
} from '../meals-repository'

export class PrismaMealsRepository implements MealsRepository {
  async create(data: Prisma.MealUncheckedCreateInput) {
    const meal = await prisma.meal.create({
      data,
    })

    return meal
  }

  async findById(id: string) {
    const meal = await prisma.meal.findUnique({
      where: { id },
    })

    return meal
  }

  async update(params: UpdateMealParams) {
    const meal = await prisma.meal.update({
      where: { id: params.id },
      data: params,
    })

    return meal
  }

  async findManyByUserId(userId: string, page: number) {
    const meals = await prisma.meal.findMany({
      where: { user_id: userId },
      take: 20,
      skip: (page - 1) * 20,
    })

    return meals
  }

  async delete(id: string) {
    await prisma.meal.delete({
      where: {
        id,
      },
    })
  }

  async getMetricsByUserId(userId: string) {
    const result = await prisma.$queryRaw<MealMetrics[]>`
      SELECT
        COUNT(*) AS total,
        SUM(on_diet::integer) AS on_diet,
        COUNT(*) - SUM(on_diet::integer) AS out_of_diet,
        MAX(diet_sequence) AS best_sequence
      FROM (
        SELECT
          *,
          ROW_NUMBER() OVER (ORDER BY date_time) - ROW_NUMBER() OVER (PARTITION BY on_diet::integer ORDER BY date_time) AS diet_sequence
        FROM meals
        WHERE user_id = ${userId}
      ) AS meal_sequence
    `

    return {
      total: Number(result[0].total),
      on_diet: Number(result[0].on_diet),
      out_of_diet: Number(result[0].out_of_diet),
      best_sequence: Number(result[0].best_sequence),
    }
  }
}
