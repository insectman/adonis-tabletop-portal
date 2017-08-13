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

}

module.exports = Table
