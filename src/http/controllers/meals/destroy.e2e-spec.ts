import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/teste/create-and-authenticate-user'

describe('Destroy Meal (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('should be able to destroy a meal', async () => {
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

    const { meals } = mealsResponse.body

    const response = await request(app.server)
      .delete(`/meals/${meals[0].id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(204)
  })
})
