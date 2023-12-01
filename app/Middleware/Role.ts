import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Roles from 'App/Enums/Roles'

export default class Role {
    // .middleware(['auth', 'role:admin'])
    public async handle({ auth, logger, request, response }: HttpContextContract, next: () => Promise<void>, guards: string[]) {
        const roleIds = guards.map(guard => Roles[guard.toUpperCase()])

        if (!roleIds.includes(auth.user?.roleId)) {
            logger.warn({user: auth.user?.id, userRole: auth.user?.roleId, resourceRequested: request.url()}, 'Unauthorized Access Attempt')
            return response
                .redirect()
                .withQs({ requestId: request.id() })
                .toRoute('errors.unauthorized')
            // return response.redirect().status(403).toRoute('errors.unauthorized', { requestId: request.id()})
        }

        // code for middleware goes here. ABOVE THE NEXT CALL
        await next()
    }
}