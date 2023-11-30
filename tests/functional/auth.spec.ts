import { test } from '@japa/runner'

test.group('Auth', () => {
  test('/auth/login returns 200', async ({ client }) => {

    const response = await client.get('/auth/login')
    response.assertStatus(200)
  })
  test('/auth/signup returns 200', async ({ client }) => {

    const response = await client.get('/auth/signup')
    response.assertStatus(200)
  })
  test('/auth/forgot-password returns 200', async ({ client }) => {

    const response = await client.get('/auth/forgot-password')
    response.assertStatus(200)
  })
  test('/auth/reset-password returns 200', async ({ client }) => {

    const response = await client.get('/auth/reset-password')
    response.assertStatus(200)
  })
})
