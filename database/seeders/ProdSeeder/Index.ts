import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Logger from '@ioc:Adonis/Core/Logger'

export default class ProdSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    Logger.info('Running ProdSeeder...')
    await import('./ProdUser')
  }
}
