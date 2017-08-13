'use strict'

const Lucid = use('Lucid')

class Token extends Lucid {

	static boot () { 

		super.boot()
		this.addHook('beforeCreate', 'Token.addExpirationDatetime') 
		this.addHook('beforeCreate', 'Token.addTokenBody') 

	}

	user() {

		return this.belongsTo('App/Model/User')

	}

	static scopeValid (builder) {
	    builder.where('isDeleted', 0);
	    builder.whereRaw('tokenExpires > NOW()');
	}

}

module.exports = Token
