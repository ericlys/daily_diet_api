import { ResourceNotFoundError } from '@/use-cases/erros/resource-not-found-error'
import { makeDeleteMealUseCase } from '@/use-cases/factories/make-delete-meal-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function destroy(request: FastifyRequest, reply: FastifyReply) {
  const deleteMealBodyParams = z.object({
    id: z.string().uuid(),
  })

  const { id } = deleteMealBodyParams.parse(request.params)

  const mealUseCase = makeDeleteMealUseCase()

  try {
    await mealUseCase.execute({
      id,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }

  return reply.status(204).send()
}
