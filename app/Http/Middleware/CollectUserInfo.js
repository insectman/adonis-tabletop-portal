'use strict'

const Token = use('App/Model/Token')

class CollectUserInfo {

  * handle (request, response, next) {

  	const accessToken = request.param('accessToken') || (yield request.session.get('accessToken'));

  	if(!accessToken) {

  		yield next;
  		return;
  	}

  	const token = yield Token.query().valid().where('accessToken', accessToken).first();

  	//console.log(token);

  	if(!token) {
  		yield next;
  		return;
  	}

  	request.token = token;
  	request.user = yield token.user().fetch();

    yield next;
  }

}

module.exports = CollectUserInfo
