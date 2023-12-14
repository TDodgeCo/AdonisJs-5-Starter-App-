import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Event from 'App/Models/Event'
import Roles from 'App/Enums/Roles'

export default class EventsPolicy extends BasePolicy {
	public async create(user: User) {
		return user.roleId >= Roles.USER
	}
	public async update(user: User, event: Event) {
		return user.roleId >= Roles.MOD || user.id === event.userId
	}
	public async delete(user: User, event: Event) {
		return user.roleId >= Roles.ADMIN || user.id === event.userId
	}
}
