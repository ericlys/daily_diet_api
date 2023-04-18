import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { create } from './create'
import { destroy } from './destroy'
import { store } from './store'
import { show } from './show'

export async function mealsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/meals', create)
  app.delete('/meals/:id', destroy)
  app.get('/meals', store)
  app.get('/meals/:id', show)
}
