import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany, } from '@ioc:Adonis/Lucid/Orm'
import Profile from './Profile'

export default class Social extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string
  
  @column()
  public logoUrl: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Profile)
  public profileSocials: ManyToMany<typeof Profile>
}
