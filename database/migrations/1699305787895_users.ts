import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().comment('system')
      table.integer('role_id').unsigned().references('id').inTable('roles').onDelete('CASCADE').comment('assignable:admin')
      table.string('email', 255).notNullable().unique().comment('assignable:user')
      table.string('password', 180).notNullable().comment('assignable:user')
      table.string('remember_me_token').nullable().comment('system')
      // NEW
      table.boolean('is_suspended').defaultTo(false).comment('assignable:admin')
      table.boolean('is_banned').defaultTo(false).comment('assignable:admin')


      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable().comment('system')
      table.timestamp('updated_at', { useTz: true }).notNullable().comment('system')
      table.timestamp("banned_at").defaultTo(null).comment('system')
      table.dateTime("deleted_at").defaultTo(null).comment('system')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
