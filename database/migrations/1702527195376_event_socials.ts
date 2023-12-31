import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'event_socials'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('event_id').unsigned().references('id').inTable('events').onDelete('CASCADE')
      table.integer('social_id').unsigned().references('id').inTable('socials').onDelete('CASCADE')
      table.unique(['event_id', 'social_id'])
      table.string('url', 255).nullable().defaultTo(null)
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
