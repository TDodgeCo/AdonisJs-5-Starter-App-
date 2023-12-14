import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Env from '@ioc:Adonis/Core/Env'

export default class DevPolicy extends BasePolicy {
    public async devOrAdmin(user: User) {
		return Env.get('NODE_ENV') == 'development' || user.roleId == 1
	}
}
