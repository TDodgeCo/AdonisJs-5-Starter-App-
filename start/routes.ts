/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
import './routes/authRoutes'
import './routes/devRoutes'

Route.get('/', async ({ view }) => {
  return view.render('home')
})
Route.get('/events', async ({ view }) => {
  return view.render('pages/events')
})
Route.get('/creators', async ({ view }) => {
  return view.render('pages/creators')
})



Route.group(() => {
  Route.get('/', 'DashboardController.ingress').as('dashboard.ingress')
  Route.get('/account', 'DashboardController.getAccountView').as('dashboard.account.show')
  Route.get('/profile', 'DashboardController.getProfileView').as('dashboard.profile.show')
  Route.get('/events', 'DashboardController.getEventsView').as('dashboard.events.show')
})
  .prefix('/dashboard')
  .middleware('auth')