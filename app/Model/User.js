'use strict'

const Lucid = use('Lucid')

class User extends Lucid {

	static boot () { 

		super.boot()
		this.addHook('beforeCreate', 'User.encryptPassword') 

	}

	static get rules () { 

		return {

			username: 'required|unique:users|min:3',
			email: 'required|email|unique:users',
			password: 'required|min:8',

		}

	}

	tokens() {

		return this.hasMany('App/Model/Token')

	}

	tables() {

		return this.hasMany('App/Model/Table')

	}

	static scopeActive (builder) {

	    builder.where('isDeleted', '0')

	}

}

module.exports = User
