import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  /** Login Routes */
  Route.get('/login', 'AuthController.getLoginView').as('auth.login.show')
  Route.post('/login', 'AuthController.emailLogin').as('auth.login.post')

  /** Logout Route */
  Route.get('/logout', 'AuthController.logout').as('auth.logout')

  /** Signup Routes */
  Route.get('/signup', 'AuthController.getSignupView').as('auth.signup.show')
  Route.post('/signup', 'AuthController.emailSignup').as('auth.signup.post')

  /** Forgot Password Routes */
  Route.get('/forgot-password', 'AuthController.getForgotPasswordView').as('auth.forgot-password.show')
  Route.post('/forgot-password', 'AuthController.forgotPasswordSubmission').as('auth.forgot-password.post')

  /** Reset Password Routes */
  Route.get('/reset-password', 'AuthController.getResetPasswordView').as('auth.reset-password.show')
  Route.post('/reset-password', 'AuthController.resetPasswordSubmission').as('auth.reset-password.post')

  /** Verify Email Route */
  Route.get('/verify-email', 'AuthController.verifyEmail').as('auth.verify-email')
}).prefix('/auth')


