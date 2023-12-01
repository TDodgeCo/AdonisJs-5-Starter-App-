import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Trace {
  public async handle({ request, logger, auth, route }: HttpContextContract, next: () => Promise<void>) {
    // This middleware is used to log all requests to the server. It is used to track down bugs and to see what pages are being accessed and from where.
    logger.info(
      {
        referrer: request.header('referrer'),
        url: request.url(),
        route: route?.name || null,
        controller: route?.handler || null,
        pattern: route?.pattern || null,
        userId: auth.user?.id || null,
        userRole: auth.user?.roleId || null,
      }, 'Resource Requested')

    await next()
  }
}