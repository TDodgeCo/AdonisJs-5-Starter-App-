import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeFetch,
  beforeFind,
  BelongsTo,
  belongsTo,
  computed,
  column,
  hasOne,
  HasOne
} from '@ioc:Adonis/Lucid/Orm'
import { compose } from '@ioc:Adonis/Core/Helpers'
import { AutoPreload } from '@ioc:Adonis/Addons/AutoPreload'
import { softDelete, softDeleteQuery } from 'App/Services/SoftDelete'
import User from './User'
import Social from './SocialOld'
import EventType from './EventType'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'

export default class Event extends compose(BaseModel, AutoPreload) {
  public serializeExtras: boolean = true
  public static $with = ['social'] as const

   // SOFT DELETE STUFF
   @beforeFind()
   public static softDeletesFind = softDeleteQuery
 
   @beforeFetch()
   public static softDeletesFetch = softDeleteQuery
 
   public async delete(column?: string) {
     await softDelete(this, column)
   }
  
  // END SOFT DELETE STUFF

  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number | null

  @column()
  public socialId: number | null

  @column()
  @slugify({
    strategy: 'dbIncrement',
    fields: ['title']
  })
  public slug: string

  @column()
  public title: string

  @column()
  public type: string

  @column()
  public subtitle: string

  @column()
  public venue: string

  @column()
  public street: string

  @column()
  public city: string

  @column()
  public state: string

  @column()
  public zip: string

  @column()
  public startDate: DateTime

  @column()
  public endDate: DateTime

  @column()
  public isClaimed: boolean

  @column()
  public coverImage: string

  @column()
  public website: string

  @column()
  public ticketLink: string

  @column()
  public ticketPrice: number

  @column()
  public description: string

  @column()
  public body: string

  @column()
  public isPrivate: boolean

  @column()
  public featuredVideo: string

  @column()
  public featuredSong: string

  @column()
  public isPublished: boolean

  @column()
  public isRecurring: boolean

  @column()
  public isFeatured: boolean

  @column()
  public eventTypeId: number

  @column()
  public createdBy: number | null

  @column()
  public updatedBy: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime({ serializeAs: null})
  public deletedAt: DateTime

  @computed()
    public get eventTypeName() {
      return EventType[this.eventTypeId]
  }

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasOne(() => Social)
  public social: HasOne<typeof Social>
}
