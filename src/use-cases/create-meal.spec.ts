import { MealsRepository } from '@/repositories/meals-repository'
import { CreateMealUseCase } from './create-meal'
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'

let mealsRepository: MealsRepository
let sut: CreateMealUseCase

describe('Create Meal Use Case', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new CreateMealUseCase(mealsRepository)
  })

  it('should be able to create a new meal', async () => {
    const { meal } = await sut.execute({
      name: 'Meal Test',
      description: 'Meal description',
      on_diet: true,
      user_id: 'fake_user_id',
    })

    expect(meal.id).toEqual(expect.any(String))
  })

  it('should be able to create a new meal in diet', async () => {
    const { meal } = await sut.execute({
      name: 'Meal Test',
      description: 'Meal description',
      on_diet: true,
      user_id: 'fake_user_id',
    })

    expect(meal.id).toEqual(expect.any(String))
    expect(meal).toEqual(expect.objectContaining({ on_diet: true }))
  })

  it('should be able to create a new meal out of the diet', async () => {
    const { meal } = await sut.execute({
      name: 'Meal Test',
      description: 'Meal description',
      on_diet: false,
      user_id: 'fake_user_id',
    })

    expect(meal.id).toEqual(expect.any(String))
    expect(meal).toEqual(expect.objectContaining({ on_diet: false }))
  })
})
