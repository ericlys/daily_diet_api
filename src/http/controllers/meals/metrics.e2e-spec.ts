import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/teste/create-and-authenticate-user'

describe('Metrics Meal (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('should be able to show metrics to user meals', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/meals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Meal test 1',
        description: 'meal on diet 1',
        on_diet: true,
        date_time: '2023-04-20T01:12:51.275Z',
      })

    await request(app.server)
      .post('/meals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Meal test 2',
        description: 'meal on diet 2',
        on_diet: true,
        date_time: '2023-04-20T02:12:51.275Z',
      })

    await request(app.server)
      .post('/meals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Meal test 3',
        description: 'meal on diet 3',
        on_diet: true,
        date_time: '2023-04-20T03:12:51.275Z',
      })

    await request(app.server)
      .post('/meals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Meal off-diet 1',
        description: 'off-diet meal',
        on_diet: false,
        date_time: '2023-04-20T04:12:51.275Z',
      })

    await request(app.server)
      .post('/meals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Meal test 4',
        description: 'meal on diet 4',
        on_diet: true,
        date_time: '2023-04-20T04:52:51.275Z',
      })

    const response = await request(app.server)
      .get('/meals/metrics')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.body).toEqual(
      expect.objectContaining({
        best_sequence: 3,
        on_diet: 4,
        out_of_diet: 1,
        total: 5,
      }),
    )
  })
})
