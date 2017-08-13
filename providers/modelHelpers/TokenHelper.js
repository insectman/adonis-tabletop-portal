const moment = require('moment');

const TokenHelper = exports = module.exports = {}

TokenHelper.getProlongedExpirationDate = function() {

	return moment(new Date()).add(3, 'days').format("YYYY-MM-DD HH:mm:ss");

}