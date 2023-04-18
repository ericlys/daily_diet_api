import { ResourceNotFoundError } from '@/use-cases/erros/resource-not-found-error'
import { makeUpdateMealUseCase } from '@/use-cases/factories/make-update-meal-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateMealParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const updateMealBodySchema = z.object({
    date_time: z.coerce.date().optional(),
    description: z.string().optional(),
    name: z.string().optional(),
    on_diet: z.boolean().optional(),
  })

  const { id } = updateMealParamsSchema.parse(request.params)
  const data = updateMealBodySchema.parse(request.body)

  const mealUseCase = makeUpdateMealUseCase()

  try {
    await mealUseCase.execute({
      id,
      ...data,
    })

    return reply.status(204).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
