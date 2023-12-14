import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'socials_old'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('profile_id').unsigned().references('id').inTable('profiles').onDelete('CASCADE')
      table.integer('event_id').unsigned().references('id').inTable('events').onDelete('CASCADE')
      table.string('soundcloud', 255).nullable()
      table.string('instagram', 255).nullable()
      table.string('apple', 255).nullable()
      table.string('spotify', 255).nullable()
      table.string('discord', 255).nullable()
      table.string('youtube', 255).nullable()
      table.string('twitch', 255).nullable()
      table.string('snapchat', 255).nullable()
      table.string('facebook', 255).nullable()
      table.string('x', 255).nullable()
      table.string('tiktok', 255).nullable()
      table.string('bandcamp', 255).nullable()
      table.string('patreon', 255).nullable()
      table.string('apple_music', 255).nullable()
      table.string('amazon_music', 255).nullable()
      table.string('google_play', 255).nullable()
      table.string('tidal', 255).nullable()
      table.string('mixcloud', 255).nullable()
      table.string('reverbnation', 255).nullable()
      

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
