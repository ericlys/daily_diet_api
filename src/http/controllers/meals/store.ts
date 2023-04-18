import { makeGetUserMealsUseCase } from '@/use-cases/factories/make-get-user-meals-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function store(request: FastifyRequest, reply: FastifyReply) {
  const storyMealQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = storyMealQuerySchema.parse(request.query)

  const userMealsUseCase = makeGetUserMealsUseCase()

  const { meals } = await userMealsUseCase.execute({
    user_id: request.user.sub,
    page,
  })

  return reply.status(200).send({ meals })
}
