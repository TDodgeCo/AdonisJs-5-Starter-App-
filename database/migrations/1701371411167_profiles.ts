import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'profiles'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').comment('system')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE').comment('assignable:user')
      table.string('title', 255).notNullable().unique().comment('assignable:user')
      table.string('slug').unique().comment('assignable:user')
      table.string('cover_image', 255).nullable().comment('assignable:user')
      table.string('avatar', 255).nullable().comment('assignable:user')
      table.string('location', 255).nullable().comment('assignable:user')
      table.string('website', 255).nullable().comment('assignable:user')
      table.string('featured_video', 255).nullable().comment('assignable:user')
      table.string('featured_song', 255).nullable().comment('assignable:user')
      table.string('soundcloud_id').nullable().comment('assignable:user')
      table.boolean('is_primary_profile').defaultTo(true).comment('assignable:user')
      table.boolean('is_artist').defaultTo(false).comment('system')
      table.boolean('is_verified_artist').defaultTo(false).comment('assignable:admin')
      table.boolean('is_claimed').defaultTo(true).comment('system') // user has claimed this profile
      table.boolean('artist_consent').defaultTo(false).comment('system') // user consents to having their music shared on the site
      table.text('bio').nullable().comment('assignable:user')
      table.boolean('is_private').defaultTo(false).comment('assignable:user')
      
      table.boolean('is_featured').defaultTo(false).comment('assignable:admin')

      // OLD
      table.integer('created_by').unsigned().references('id').inTable('users').comment('system')
      table.integer('updated_by').unsigned().references('id').inTable('users').comment('system')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).comment('system')
      table.timestamp('updated_at', { useTz: true }).comment('system')
      table.dateTime("deleted_at").defaultTo(null).comment('system')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
