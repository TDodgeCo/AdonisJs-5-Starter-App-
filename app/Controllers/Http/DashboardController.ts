import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ResourceService from 'App/Services/ResourceService'


export default class DashboardController {

    /** Returns DashboardView */
    public async ingress({ view }: HttpContextContract) {
        return view.render('dashboard/dashboardView')
    }
    

    /** Returns AccountView */
    public async getAccountView({ view }: HttpContextContract) {
        return view.render('dashboard/accountView')
    }

    /** Returns ProfileView */
    public async getAdminDataView({ view, params }: HttpContextContract) {
        const param = params.resource
        console.log(param)
        const resources = await ResourceService.getManyResources(param)
        const count = await ResourceService.getRawResourceCounts()
        return view.render('dashboard/admin/dataView', { resources, count })
    }
}