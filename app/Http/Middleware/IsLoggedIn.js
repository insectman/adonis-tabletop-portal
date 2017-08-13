'use strict'

class isLoggedIn {

  * handle (request, response, next) {

  	if(!request.user) {

      response.redirect('/');

      return;
    }

    yield next;
    
  }

}

module.exports = isLoggedIn
