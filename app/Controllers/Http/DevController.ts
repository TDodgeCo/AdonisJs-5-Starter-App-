import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class DevController {
    /* 
    devLoginAs - This method allows you to login as any user in the database. It should only available in development or staging environments. 
    the environment check is done in the route file.
    */
    public async devLoginAs({ request, response, logger, auth }: HttpContextContract) {
        const targetRole = request.input('targetRole')
        let targetUser = await User.findBy('roleId', targetRole)
        if (targetRole == 1) {
            const onboarded = request.input('onboarded')
            if (onboarded =='true') {
                targetUser = await User.findBy('emailVerified', true)
            } else {
                targetUser = await User.findBy('emailVerified', false)
            } 
        } 
        try {
            if (auth.isLoggedIn && targetUser) {
                await auth.logout
                await auth.loginViaId(targetUser.id)
            }
            if (targetUser) {
                await auth.loginViaId(targetUser.id)
            }
            return response.redirect().back()
        } catch (error) {
            logger.error({targetRole: targetRole, targetUser: targetUser , error: new Error(JSON.stringify(error, null, 4)) }, 'Unable to login as role')
        }
    }
}

