import { makeUserMealMetricsUseCase } from '@/use-cases/factories/make-user-meal-metrics-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const userMealMetricsUseCase = makeUserMealMetricsUseCase()

  const { best_sequence, on_diet, out_of_diet, total } =
    await userMealMetricsUseCase.execute(request.user.sub)

  return reply.status(200).send({ best_sequence, on_diet, out_of_diet, total })
}
