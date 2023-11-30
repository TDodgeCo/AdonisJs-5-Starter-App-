import { test } from '@japa/runner'
import User from 'App/Models/User'

test.group('Dashboard', () => {

  test('Dashboard returns 200 for roleId 3', async ({ client }) => {
    const user = await User.findByOrFail('roleId', 3)
    console.log(user.email)
    
    if (!user) return

    const response = await client.get('/dashboard').loginAs(user)
    response.assertStatus(200)
  })

  test('Dashboard returns 200 for roleId 2', async ({ client }) => {
    const user = await User.findByOrFail('roleId', 2)
    console.log(user.email)
    
    if (!user) return

    const response = await client.get('/dashboard').loginAs(user)
    response.assertStatus(200)
  })

  test('Dashboard returns 200 for roleId 1', async ({ client }) => {
    const user = await User.findByOrFail('roleId', 1)
    console.log(user.email)
    
    if (!user) return

    const response = await client.get('/dashboard').loginAs(user)
    response.assertStatus(200)
  })

  test('Dashboard/Account returns 200 for roleId 3', async ({ client }) => {
    const user = await User.findByOrFail('roleId', 3)
    console.log(user.email)
    
    if (!user) return

    const response = await client.get('/dashboard/account').loginAs(user)
    response.assertStatus(200)
  })

  test('Dashboard/Account returns 200 for roleId 2', async ({ client }) => {
    const user = await User.findByOrFail('roleId', 2)
    console.log(user.email)
    
    if (!user) return

    const response = await client.get('/dashboard/account').loginAs(user)
    response.assertStatus(200)
  })

  test('Dashboard/Account returns 200 for roleId 1', async ({ client }) => {
    const user = await User.findByOrFail('roleId', 1)
    console.log(user.email)
    
    if (!user) return

    const response = await client.get('/dashboard/account').loginAs(user)
    response.assertStatus(200)
  })

})