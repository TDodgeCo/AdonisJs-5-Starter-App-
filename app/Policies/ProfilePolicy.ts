import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Profile from 'App/Models/Profile'
import Roles from 'App/Enums/Roles'

export default class ProfilePolicy extends BasePolicy {
	public async create(user: User) {
		return user.roleId >= Roles.USER
	}
	public async update(user: User, profile: Profile) {
		return user.roleId >= Roles.ADMIN || user.id === profile.userId
	}
	public async delete(user: User, profile: Profile) {
		return user.roleId >= Roles.ADMIN || user.id === profile.userId
	}
}
