'use strict'

const Validator = use('Validator')
const Event = use('Event')
const User = use('App/Model/User')
const Token = use('App/Model/Token')

class SiteController {

	* index (request, response) {

		if(request.user) {

			yield response.sendView('homeLoggedIn', { user: request.user });
			return;

		}
		else {

			yield response.sendView('homeLoggedOut');
			return;

		}
	}

	* login (request, response) {

		const userData = request.all();
		var auxUser = null;
		var user = null;

		if(userData['password'] && userData['username']) {

			auxUser = yield User.findBy('username', userData['username']);

			if(auxUser && auxUser.attributes) {

				const encrypt = require.main.require('./providers/encryptionService');

				if(auxUser.attributes.password == encrypt(userData['password'], auxUser.attributes.salt, auxUser.attributes.pepper).hash) {

					user = yield User.find(auxUser.attributes.id);

					var token = yield user.tokens().create({});

					yield request.session.put('accessToken', token.accessToken)

				}

			}

		}

		if(user) {

			request.user = user;
			response.redirect('/');

		}
		else {

			yield response.sendView('login');
			return;

		}

	}


	* signup (request, response) {

	    const userData = request.all();
	    const validation = yield Validator.validate(userData, User.rules)  
	    const confirmed = userData['password'] && (userData['password'] == userData['password_confirmation']);
	    var user;

	    if (validation.fails() || !confirmed ) { 

	      	var messages = validation.messages();
	      	var errors = {};

	      	messages.forEach((e) => {
	      		errors[e.field] = e.message;
	      	})

	      	if(!confirmed) {

	    		errors.password_confirmation = "passwords don't match";
	    	}

	      	yield response.sendView('signup', {errors : errors, userData : userData})
			return;
	    }

	    console.log(!!(yield User.findBy('username', userData.username)));

	    if(yield User.findBy('username', userData.username)) {
	    	yield response.sendView('signup', {
	    		errors : {
	    			username : 'User with this name already exists'
	    		}
	    		, userData : userData})
	    }

	    user = yield User.create({
	    	password : userData.password,
	    	username : userData.username,
	    	email : userData.email
	    });

		if(user) {

			Event.fire('user.registered', user.toJSON()) 

			response.redirect('/login');
			return;

		}
		else {

			yield response.sendView('signup')
			return;

		}

	}

	* logout (request, response) {

		if(request.user) {

			var tokens = yield request.user.tokens().fetch();

			if(tokens) {

				var tokenModels = tokens.value();
				var tokenModelsLength = tokenModels.length;

				for(let i = 0; i < tokenModelsLength; i++) {

					var token = tokenModels[i];
					token.isDeleted = 1;

					yield token.save();

				}

			}
			
			yield request.session.pull('accessToken')

		}
		
		response.redirect('/');

	}

	* test (request, response) {

		yield response.sendView('signup')
		return;

	}

}

module.exports = SiteController
