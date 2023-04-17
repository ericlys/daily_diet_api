import { MealsRepository } from '@/repositories/meals-repository'
import { GetUserMealsUseCase } from './get-user-meals'
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { randomUUID } from 'crypto'

let mealsRepository: MealsRepository
let sup: GetUserMealsUseCase

describe('Get User Meals Use Case', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sup = new GetUserMealsUseCase(mealsRepository)
  })

  it('should be able to fetch user meals', async () => {
    const user_id = randomUUID()

    for (let i = 1; i <= 10; i++) {
      await mealsRepository.create({
        name: `Meal ${i}`,
        description: `Meal description test ${i}`,
        on_diet: Math.random() >= 0.5,
        date_time: new Date(),
        user_id,
      })
    }

    const { meals } = await sup.execute({ user_id, page: 1 })

    expect(meals).toHaveLength(10)
  })

  it('should be able to fetch user meals with pagination', async () => {
    const user_id = randomUUID()

    for (let i = 1; i <= 22; i++) {
      await mealsRepository.create({
        name: `Meal ${i}`,
        description: `Meal description test ${i}`,
        on_diet: Math.random() >= 0.5,
        date_time: new Date(),
        user_id,
      })
    }

    const { meals } = await sup.execute({ user_id, page: 2 })

    expect(meals).toHaveLength(2)
    expect(meals).toEqual([
      expect.objectContaining({ name: 'Meal 21' }),
      expect.objectContaining({ name: 'Meal 22' }),
    ])
  })
})
