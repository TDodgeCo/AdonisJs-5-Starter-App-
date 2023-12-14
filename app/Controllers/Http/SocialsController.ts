import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Social from 'App/Models/Social'

export default class SocialsController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({ request, bouncer, response }: HttpContextContract) {
    await bouncer.with('Social').authorize('create')
    const payload = request.only(['name', 'url', 'icon'])

    const social = await Social.firstOrCreate({ name: payload.name }, payload)
    
    return response.redirect().back()
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
