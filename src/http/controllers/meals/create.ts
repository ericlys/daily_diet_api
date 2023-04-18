import { makeCreateMealUseCase } from '@/use-cases/factories/make-create-meal-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createMealBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    on_diet: z.boolean(),
    date_time: z.coerce.date().optional(),
  })

  const params = createMealBodySchema.parse(request.body)

  const mealUseCase = makeCreateMealUseCase()

  await mealUseCase.execute({
    ...params,
    user_id: request.user.sub,
  })

  return reply.status(204).send()
}
