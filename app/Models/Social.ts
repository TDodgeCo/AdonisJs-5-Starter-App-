import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany, } from '@ioc:Adonis/Lucid/Orm'
import Profile from './Profile'
import Event from './Event'

export default class Social extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string
  
  @column()
  public logoUrl: string

  @column()
  public icon: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Profile, {
    pivotColumns: ['url'],
  })
  public profileSocials: ManyToMany<typeof Profile>

  @manyToMany(() => Event, {
    pivotColumns: ['url'],
  })
  public eventSocials: ManyToMany<typeof Event>
}
