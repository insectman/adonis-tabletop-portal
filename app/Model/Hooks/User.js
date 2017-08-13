'use strict'

const sha256 = require('sha256');
const bcrypt = require('bcrypt');

const encrypt = require.main.require('./providers/encryptionService');

const User = exports = module.exports = {}

User.encryptPassword = function * (next) {

	// {this} belongs to model instance

	var {salt, hash, pepper} = encrypt(this.password)
	
	this.password = hash;
	this.salt = salt;
	this.pepper = pepper;

	yield next
}
