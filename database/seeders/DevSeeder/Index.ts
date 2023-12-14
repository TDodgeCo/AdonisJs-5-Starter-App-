import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Logger from '@ioc:Adonis/Core/Logger'

export default class DevSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    Logger.info('Running DevSeeder...')
    await import('./DevUser')
  }
}
