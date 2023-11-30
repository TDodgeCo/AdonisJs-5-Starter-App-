import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Profile from './Profile'
import Event from './Event'

export default class Social extends BaseModel {

  public serializeExtras: boolean = true

  @column({ isPrimary: true })
  public id: number

  @column()
  public profileId: number

  @column()
  public eventId: number

  @column()
  public soundcloud: string
  
  @column()
  public spotify: string

  @column()
  public youtube: string
  
  @column()
  public instagram: string

  @column()
  public facebook: string

  @column()
  public x: string

  @column()
  public tiktok: string

  @column()
  public bandcamp: string

  @column()
  public patreon: string

  @column()
  public appleMusic: string

  @column()
  public amazonMusic: string

  @column()
  public googlePlay: string

  @column()
  public tidal: string

  @column()
  public mixcloud: string

  @column()
  public reverbnation: string

  @column()
  public snapchat: string

  @column()
  public twitch: string

  @column()
  public discord: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Profile)
  public profile: BelongsTo<typeof Profile>

  @belongsTo(() => Event)
  public event: BelongsTo<typeof Event>

}
