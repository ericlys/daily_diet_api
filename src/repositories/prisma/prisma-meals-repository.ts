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
    const metrics = await prisma.$queryRaw<MealMetrics>`
      SELECT COUNT(*) AS total_meals,
            SUM(on_diet) AS on_diet,
            SUM(1 - on_diet) AS out_of_diet,
            MAX(subseq) AS best_sequence
      FROM (
          SELECT m.*, 
            (SELECT COUNT(*) 
            FROM meal 
            WHERE user_id = m.user_id 
            AND on_diet = 1 
            AND date(timestamp) = date(m.timestamp) 
            AND timestamp <= m.timestamp) AS subseq
          FROM meal m
          WHERE m.user_id = ${userId}
      ) t
    `

    return metrics
  }
}
