import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('username').unique()
      table.boolean('email_verified')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
