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

    /** Returns ProfileView */
    public async getProfileView({ view }: HttpContextContract) {
        return view.render('dashboard/profileView')
    }

    /** Returns EventsView */
    public async getEventsView({ view }: HttpContextContract) {
        return view.render('dashboard/eventsView')
    }
}