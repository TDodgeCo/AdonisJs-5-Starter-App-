import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import{
  column,
  beforeSave,
  BaseModel,
  belongsTo,
  BelongsTo,
  computed
} from '@ioc:Adonis/Lucid/Orm'

import Role from './Role'
import Roles from 'App/Enums/Roles'

import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'

export default class User extends BaseModel {
  public serializeExtras: boolean = true

  @column()
  @slugify({
    strategy: 'dbIncrement',
    fields: ['username']
  })
  public slug: string

  @column({ isPrimary: true })
  public id: number

  @column()
  public roleId: number

  @column()
  public username: string

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

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
