'use strict'

const Mail = use('Mail')
const User = exports = module.exports = {}

User.sendWelcomeEmail = function * (user) {
  yield Mail.send('emails.welcome', user, message => {
    message.to(user.email, user.username)
    message.from('insbgportal.com')
    message.subject('Welcome to the insbgportal')
  })
}


User.updateStatus = function * (user, table) {
	console.log('User.updateStatus',user.id,table.id)
}
