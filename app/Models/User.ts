import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import{
  column,
  beforeSave,
  BaseModel,
  beforeFetch,
  beforeFind,
  belongsTo,
  BelongsTo,
  computed,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm'

import { compose } from '@ioc:Adonis/Core/Helpers'
import { AutoPreload } from '@ioc:Adonis/Addons/AutoPreload'
import { softDelete, softDeleteQuery } from 'App/Services/SoftDelete'
import Role from './Role'
import Roles from 'App/Enums/Roles'
import Profile from './Profile'
import Event from './Event'

export default class User extends compose(BaseModel, AutoPreload) {
  public serializeExtras: boolean = true
  // public static $with = ['profile'] as const

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
  public roleId: number

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @column()
  public emailVerified: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime({ serializeAs: null})
  public deletedAt: DateTime

  @column.dateTime({ serializeAs: null})
  public bannedAt: DateTime

  @computed()
  public get isAdmin() {
    return this.roleId === Roles.ADMIN
  }
  @computed()
  public get isMod() {
    return this.roleId === Roles.MOD
  }
  @computed()
  public get isUser() {
    return this.roleId === Roles.USER
  }

  @computed()
    public get roleName() {
      return Roles[this.roleId]
  }

  @belongsTo(() => Role)
  public role: BelongsTo<typeof Role>

  @hasMany(() => Profile)
  public profile: HasMany<typeof Profile>

  @hasMany(() => Event)
  public event: HasMany<typeof Event>

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
