import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('name').unique().comment('assignable:user')
      table.boolean('email_verified').comment('system')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
