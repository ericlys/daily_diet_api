import { MealsRepository } from '@/repositories/meals-repository'
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { randomUUID } from 'crypto'
import { GetMealUseCase } from './get-meal'
import { ResourceNotFoundError } from './erros/resource-not-found-error'

let mealsRepository: MealsRepository
let sup: GetMealUseCase

describe('Get Meal Use Case', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sup = new GetMealUseCase(mealsRepository)
  })

  it('should be able to fetch a meal data', async () => {
    const user_id = randomUUID()

    const { id } = await mealsRepository.create({
      name: 'Meal test',
      description: 'Meal test description',
      on_diet: true,
      date_time: new Date(),
      user_id,
    })

    const { meal } = await sup.execute(user_id, id)

    expect(meal).toEqual(
      expect.objectContaining({
        id,
        name: 'Meal test',
        description: 'Meal test description',
        on_diet: true,
      }),
    )
  })

  it('should throw an error if the meal data does not exists', async () => {
    await expect(() =>
      sup.execute('fake-user-id', 'fake-id'),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
