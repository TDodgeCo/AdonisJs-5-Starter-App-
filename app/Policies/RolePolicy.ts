import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Roles from 'App/Enums/Roles'

export default class RolePolicy extends BasePolicy {
	public async user(user: User) {
		return user.roleId >= Roles.USER
	}
	public async isUser(user: User) {
		return user.isUser
	}
	public async mod(user: User) {
		return user.roleId >= Roles.MOD
	}
	public async isMod(user: User) {
		return user.isMod
	}
	public async admin(user: User) {
		return user.roleId == Roles.ADMIN
	}
	public async isAdmin(user: User) {
		return user.isAdmin
	}
}