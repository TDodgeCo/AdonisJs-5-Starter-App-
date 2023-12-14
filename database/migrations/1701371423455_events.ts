import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'events'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').comment('system')
      table.integer('user_id').unsigned().references('id').inTable('users').comment('assignable:admin')
      table.string('slug').unique().comment('assignable:user')
      table.integer('headliner_id').unsigned().references('id').inTable('profiles').comment('assignable:user')
      table.integer('supporting_id').unsigned().references('id').inTable('profiles').comment('assignable:user')
      // NEW
      table.string('title', 255).notNullable().comment('assignable:user')
      table.string('featured_video', 255).nullable().comment('assignable:user')
      table.string('featured_song', 255).nullable().comment('assignable:user')
      table.string('type', 255).nullable().comment('assignable:user')
      table.string('subtitle', 255).nullable().comment('assignable:user')
      table.string('venue', 255).nullable().comment('assignable:user')
      table.string('street', 255).nullable().comment('assignable:user')
      table.string('city', 255).nullable().comment('assignable:user')
      table.string('state', 255).nullable().comment('assignable:user')
      table.string('zip', 255).nullable().comment('assignable:user')
      table.boolean('is_claimed').defaultTo(true).comment('system') // user has claimed this event // manual process
      table.dateTime('start_date').notNullable().comment('assignable:user')
      table.dateTime('end_date').nullable().comment('assignable:user')
      table.string('cover_image', 255).nullable().comment('assignable:user')
      table.string('website', 255).nullable().comment('assignable:user')
      table.string('ticket_link', 255).nullable().comment('assignable:user')
      table.integer('ticket_price', 255).nullable().comment('assignable:user')
      table.string('description', 255).nullable().comment('assignable:user')
      table.text('body').nullable().comment('assignable:user')
      table.boolean('is_private').defaultTo(false).comment('assignable:user')
      table.boolean('is_published').defaultTo(false).comment('assignable:user')
      table.boolean('is_recurring').defaultTo(false).comment('assignable:user')
      table.boolean('is_featured').defaultTo(false).comment('assignable:admin')

      //OLD

      table.integer('created_by').unsigned().references('id').inTable('users').comment('system')
      table.integer('updated_by').unsigned().references('id').inTable('users').comment('system')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).comment('system')
      table.timestamp('published_at', { useTz: true }).comment('system')
      table.timestamp('updated_at', { useTz: true }).comment('system')
      table.dateTime("deleted_at").defaultTo(null).comment('system')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
