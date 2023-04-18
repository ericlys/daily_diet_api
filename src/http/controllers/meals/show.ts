import { ResourceNotFoundError } from '@/use-cases/erros/resource-not-found-error'
import { makeGetMealUseCase } from '@/use-cases/factories/make-get-meal-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function show(request: FastifyRequest, reply: FastifyReply) {
  const showMealParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = showMealParamsSchema.parse(request.params)

  const mealUseCase = makeGetMealUseCase()

  try {
    const { meal } = await mealUseCase.execute(id)

    return reply.status(200).send({ meal })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
