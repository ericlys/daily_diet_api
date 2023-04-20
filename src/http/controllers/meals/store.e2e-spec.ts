import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/teste/create-and-authenticate-user'

describe('Store Meal (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('should be able to store meals', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/meals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Meal test',
        description: 'meal on diet',
        on_diet: true,
        date_time: new Date().toString(),
      })

    const mealsResponse = await request(app.server)
      .get('/meals')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(mealsResponse.body.meals).toEqual([
      expect.objectContaining({
        id: expect.any(String),
        name: 'Meal test',
        description: 'meal on diet',
        on_diet: true,
        date_time: expect.any(String),
        user_id: expect.any(String),
      }),
    ])
  })
})
