import { MealsRepository } from '@/repositories/meals-repository'
import { DeleteMealUseCase } from './delete-meal'
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { ResourceNotFoundError } from './erros/resource-not-found-error'

let mealsRepository: MealsRepository
let sub: DeleteMealUseCase

describe('Delete Meal Use Case', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sub = new DeleteMealUseCase(mealsRepository)
  })

  it('should be able delete a meal', async () => {
    const { id } = await mealsRepository.create({
      name: 'Meal Test',
      description: 'Meal description',
      on_diet: true,
      user_id: 'fake_user_id',
    })

    await sub.execute({ id })

    const mealExists = await mealsRepository.findById(id)

    expect(mealExists).toBeNull()
  })

  it('should throw an error if the meal does not exists', async () => {
    await expect(sub.execute({ id: 'fake-id' })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
