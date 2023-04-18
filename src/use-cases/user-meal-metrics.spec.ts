import { UserMealMetricsUseCase } from './user-meal-metrics'
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { MetricsRepository } from '@/repositories/metrics-repository'
import { randomUUID } from 'crypto'

let metricsRepository: MetricsRepository
let sut: UserMealMetricsUseCase

describe('User Meal Metrics Use Case', () => {
  beforeEach(() => {
    metricsRepository = new InMemoryMealsRepository()
    sut = new UserMealMetricsUseCase(metricsRepository)
  })

  it('should be able to get the user meal metrics', async () => {
    const user_id = randomUUID()

    await metricsRepository.create({
      name: 'Meal 1',
      description: 'Description meal 1',
      on_diet: true,
      date_time: new Date('2023-04-16T03:24:00'),
      user_id,
    })

    await metricsRepository.create({
      name: 'Meal 2',
      description: 'Description meal 2',
      on_diet: false,
      date_time: new Date('2023-04-16T04:24:00'),
      user_id,
    })

    await metricsRepository.create({
      name: 'Meal 3',
      description: 'Description meal 3',
      on_diet: true,
      date_time: new Date('2023-04-16T05:24:00'),
      user_id,
    })

    await metricsRepository.create({
      name: 'Meal 5',
      description: 'Description meal 4',
      on_diet: false,
      date_time: new Date('2023-04-16T07:24:00'),
      user_id,
    })

    await metricsRepository.create({
      name: 'Meal 4',
      description: 'Description meal 4',
      on_diet: true,
      date_time: new Date('2023-04-16T06:24:00'),
      user_id,
    })

    const metrics = await sut.execute(user_id)

    expect(metrics).toEqual(
      expect.objectContaining({
        on_diet: 3,
        out_of_diet: 2,
        best_sequence: 2,
      }),
    )
  })

  it('should return zero metrics when user has no meals registered', async () => {
    const metrics = await sut.execute('test-user-id')

    expect(metrics).toEqual(
      expect.objectContaining({
        on_diet: 0,
        out_of_diet: 0,
        best_sequence: 0,
      }),
    )
  })
})
