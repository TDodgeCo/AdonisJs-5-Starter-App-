import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Roles from 'App/Enums/Roles'

export default class SocialsPolicy extends BasePolicy {
	public async create(user: User) {
		return user.roleId >= Roles.MOD
	}
	public async update(user: User) {
		return user.roleId == Roles.ADMIN
	}
	public async delete(user: User) {
		return user.roleId == Roles.ADMIN
	}
}
