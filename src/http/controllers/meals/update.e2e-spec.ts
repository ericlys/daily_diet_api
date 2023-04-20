import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/teste/create-and-authenticate-user'

describe('Update Meal (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('should be able to update meal', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/meals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Meal',
        description: 'meal on diet',
        on_diet: true,
        date_time: new Date().toString(),
      })

    const mealsResponse = await request(app.server)
      .get('/meals')
      .set('Authorization', `Bearer ${token}`)
      .send()

    const { id } = mealsResponse.body.meals[0]

    await request(app.server)
      .put(`/meals/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Meal edited',
        description: 'off-diet meal',
        on_diet: false,
        date_time: new Date().toString(),
      })

    const response = await request(app.server)
      .get(`/meals/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.body.meal).toEqual(
      expect.objectContaining({
        id,
        name: 'Meal edited',
        description: 'off-diet meal',
        on_diet: false,
        date_time: expect.any(String),
      }),
    )
  })
})
