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
        let param = params.resource
        if (!param) param = 'user'
        console.log(param)
        const data = await ResourceService.getManyResources(param)
        // const records = await ResourceService.getResource(param)
        const count = await ResourceService.getRawResourceCounts()
        console.log(`count is ${count}`)
        return view.render('dashboard/admin/dataView', { data, count })
    }
}