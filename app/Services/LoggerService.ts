import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HttpContext from '@ioc:Adonis/Core/HttpContext'

export const log = (msgTitle: string) => {
    const ctx = HttpContext.get() as HttpContextContract
    ctx.logger.info({ url: ctx.request.url(), referrer: ctx.request.header('referrer'), user: ctx.auth.user?.id, handler: ctx.route?.handler, routeName: ctx.route?.name, routePattern: ctx.route?.pattern}, msgTitle)
}