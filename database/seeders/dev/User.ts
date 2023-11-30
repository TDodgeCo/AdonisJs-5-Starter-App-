import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run () {
    const uniqueKey = 'email'

    await User.updateOrCreateMany(uniqueKey, [
      { 
        username: 'Bumpy',
        email: 'timldodge@gmail.com',
        password: 'password',
        roleId: 3,
        emailVerified: true,
      },
      {
        username: 'ModUser',
        email: 'moduser@test.com',
        password: 'password',
        roleId: 2,
        emailVerified: true,
      },
      {
        username: 'UnverifiedUser',
        email: 'unverifieduser@test.com',
        password: 'password',
        roleId: 1,
        emailVerified: false,
      },
      {
        username: 'VerifiedUser',
        email: 'verifieduser@test.com',
        password: 'password',
        roleId: 1,
        emailVerified: true,
      }
    ])
  }
}
