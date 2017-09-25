'use strict'

const Lucid = use('Lucid')

class Game extends Lucid {

	tables() {

		return this.hasMany('App/Model/Table')

	}

}

module.exports = Game
