'use strict'

const Lucid = use('Lucid')

class Table extends Lucid {

	static scopeOpened (builder) {
	    builder.where({
	    	isClosed : 0,
	    	haveStarted : 0
	    });
//	    builder.whereRaw('tokenExpires > NOW()');
	}

	users() {

		return this.hasMany('App/Model/User')

	}

	game() {

		return this.belongsTo('App/Model/Game')

	}
}

module.exports = Table
