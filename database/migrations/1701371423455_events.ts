import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'events'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('slug').unique()
      table.integer('headliner_id').unsigned().references('id').inTable('profiles')
      table.integer('supporting_id').unsigned().references('id').inTable('profiles')
      // NEW
      table.string('title', 255).notNullable()
      table.string('type', 255).nullable()
      table.string('subtitle', 255).nullable()
      table.string('venue', 255).nullable()
      table.string('street', 255).nullable()
      table.string('city', 255).nullable()
      table.string('state', 255).nullable()
      table.string('zip', 255).nullable()
      table.dateTime('start_date').notNullable()
      table.dateTime('end_date').notNullable()
      table.boolean('is_claimed').defaultTo(true) // user has claimed this event // manual process
      table.string('cover_image', 255).nullable()
      table.string('profile_image', 255).nullable()
      table.string('location', 255).nullable()
      table.string('website', 255).nullable()
      table.string('ticket_link', 255).nullable()
      table.integer('ticket_price', 255).nullable()
      table.string('description', 255).nullable()
      table.text('body').nullable()
      table.boolean('is_private').defaultTo(false)
      table.string('featured_video', 255).nullable()
      table.string('featured_song', 255).nullable()
      table.boolean('is_published').defaultTo(false)
      table.boolean('is_recurring').defaultTo(false)
      table.boolean('is_featured').defaultTo(false)

      //OLD

      table.integer('created_by').unsigned().references('id').inTable('users')
      table.integer('updated_by').unsigned().references('id').inTable('users')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('published_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.dateTime("deleted_at").defaultTo(null)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
