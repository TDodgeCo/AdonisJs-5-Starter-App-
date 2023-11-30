import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


export default class DashboardController {

    /** Returns DashboardView */
    public async ingress({ view }: HttpContextContract) {
        return view.render('dashboard/dashboardView')
    }
    

    /** Returns AccountView */
    public async getAccountView({ view }: HttpContextContract) {
        return view.render('dashboard/accountView')
    }
}