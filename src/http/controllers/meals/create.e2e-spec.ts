import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/teste/create-and-authenticate-user'

describe('Create Meal (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('should be able to create meal', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/meals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Meal test',
        description: 'meal on diet',
        on_diet: true,
        date_time: new Date().toString(),
      })

    expect(response.statusCode).toEqual(204)
  })
})
