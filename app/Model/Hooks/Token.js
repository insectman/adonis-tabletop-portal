'use strict'

const Token = exports = module.exports = {}

const TokenHelper = require.main.require('./providers/modelHelpers/TokenHelper');

Token.addExpirationDatetime = function * (next) {
  // {this} belongs to model instance

  this.tokenExpires = TokenHelper.getProlongedExpirationDate();

  yield next
  
}

Token.addTokenBody = function * (next) {
  // {this} belongs to model instance

  const uuidv4 = require('uuid/v4');

  this.accessToken = uuidv4();;

  yield next

}