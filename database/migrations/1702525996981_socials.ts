import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'socials'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').comment('system')
      table.string('name', 50).notNullable().unique().comment('assignable:user')
      table.string('logo_url', 255).nullable().defaultTo(null).comment('assignable:user')
      

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).comment('system')
      table.timestamp('updated_at', { useTz: true }).comment('system')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
