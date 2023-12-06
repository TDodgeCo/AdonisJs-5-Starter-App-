import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'event_types'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 50).notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })

    this.defer(async (db) => {
      await db.table(this.tableName).multiInsert([
        {
          id: 1,
          name: 'Show'
        },
        {
          id: 2,
          name: 'Stream'
        },
        {
          id: 3,
          name: 'Festival'
        },
        {
          id: 4,
          name: 'Party'
        },
        {
          id: 5,
          name: 'Popup'
        },
        {
          id: 6,
          name: 'Workshop'
        },
        {
          id: 7,
          name: 'Class'
        },
        {
          id: 8,
          name: 'Meetup'
        },
        {
          id: 9,
          name: 'Other'
        }
      ])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
