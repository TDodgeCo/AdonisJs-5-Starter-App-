import Route from '@ioc:Adonis/Core/Route'
import Env from '@ioc:Adonis/Core/Env'

// DEV ROUTES
if (Env.get('NODE_ENV') != 'production') {
    Route.post('/dev/login-as', 'DevController.devLoginAs').as('dev.login.as')
  }