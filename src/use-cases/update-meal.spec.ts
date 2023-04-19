import { MealsRepository } from '@/repositories/meals-repository'
import { UpdateMealUseCase } from './update-meal'
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { ResourceNotFoundError } from './erros/resource-not-found-error'
import { randomUUID } from 'crypto'

let mealsRepository: MealsRepository
let sup: UpdateMealUseCase

describe('Update Meal Use Case', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sup = new UpdateMealUseCase(mealsRepository)
  })

  it('should be able to update a meal', async () => {
    const user_id = randomUUID()

    const meal = await mealsRepository.create({
      name: 'Name test',
      description: 'Description test',
      on_diet: false,
      date_time: new Date(),
      user_id,
    })

    const newDate = new Date()

    const { meal: updatedMeal } = await sup.execute({
      id: meal.id,
      user_id,
      name: 'Edited name',
      description: 'Edited description test',
      date_time: newDate,
      on_diet: true,
    })

    expect(updatedMeal).toEqual(
      expect.objectContaining({
        id: meal.id,
        description: 'Edited description test',
        name: 'Edited name',
        on_diet: true,
        date_time: newDate,
        user_id: meal.user_id,
      }),
    )
  })

  it('should be able to update diet meal to off-diet', async () => {
    const user_id = randomUUID()

    const meal = await mealsRepository.create({
      name: 'On diet',
      description: 'Meal on diet',
      on_diet: true,
      date_time: new Date(),
      user_id,
    })

    const { meal: mealOffDiet } = await sup.execute({
      id: meal.id,
      user_id,
      name: 'Off diet',
      description: 'Meal off-diet',
      on_diet: false,
    })

    expect(mealOffDiet).toEqual(
      expect.objectContaining({
        id: meal.id,
        name: 'Off diet',
        description: 'Meal off-diet',
        on_diet: false,
      }),
    )
  })

  it('should not be able to update a meal with wrong id', async () => {
    await expect(() =>
      sup.execute({
        user_id: 'user-id-test',
        id: 'fake-id',
        name: 'Edited name',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
