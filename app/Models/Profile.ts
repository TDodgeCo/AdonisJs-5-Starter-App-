import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  beforeFetch,
  beforeFind,
  belongsTo,
  BelongsTo,
  hasOne,
  HasOne,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import { compose } from '@ioc:Adonis/Core/Helpers'

import { AutoPreload } from '@ioc:Adonis/Addons/AutoPreload'
import { softDelete, softDeleteQuery } from 'App/Services/SoftDelete'
import User from './User'
import Social from './SocialOld'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'

export default class Profile extends compose(BaseModel, AutoPreload) {
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
  public title: string

  @column()
  @slugify({
    strategy: 'dbIncrement',
    fields: ['title']
  })
  public slug: string

  @column()
  public isPrimaryProfile: boolean

  @column()
  public isArtist: boolean

  @column()
  public isVerifiedArtist: boolean

  @column()
  public isClaimed: boolean
  //
  // Just have them log in with Soundcloud.
  //
  @column()
  public artistConsent: boolean

  @column()
  public soundcloudId: number

  @column()
  public coverImage: string

  @column()
  public avatar: string

  @column()
  public location: string

  @column()
  public website: string

  @column()
  public bio: string

  @column()
  public isPrivate: boolean

  @column()
  public featuredVideo: string

  @column()
  public featuredSong: string

  @column()
  public isFeatured: boolean

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

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  // @hasOne(() => Social)
  // public social: HasOne<typeof Social>

  @manyToMany(() => Social, {
    pivotColumns: ['url'],
  })
  public profileSocials: ManyToMany<typeof Social>

}
