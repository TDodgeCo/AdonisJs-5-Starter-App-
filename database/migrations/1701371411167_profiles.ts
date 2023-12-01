import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'profiles'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('title', 255).notNullable().unique()
      table.string('slug').unique()
      table.string('cover_image', 255).nullable()
      table.string('avatar', 255).nullable()
      table.string('location', 255).nullable()
      table.string('website', 255).nullable()
      table.string('featured_video', 255).nullable()
      table.string('featured_song', 255).nullable()
      table.integer('soundcloud_id').nullable()
      table.boolean('is_primary_profile').defaultTo(true)
      table.boolean('is_artist').defaultTo(false)
      table.boolean('is_verified_artist').defaultTo(false)
      table.boolean('is_claimed').defaultTo(true) // user has claimed this profile
      table.boolean('artist_consent').defaultTo(false) // user consents to having their music shared on the site
      table.text('bio').nullable()
      table.boolean('is_private').defaultTo(false)
      
      table.boolean('is_featured').defaultTo(false)

      // OLD
      table.integer('created_by').unsigned().references('id').inTable('users')
      table.integer('updated_by').unsigned().references('id').inTable('users')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.dateTime("deleted_at").defaultTo(null)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
