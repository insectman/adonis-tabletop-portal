const sha256 = require('sha256');
const bcrypt = require('bcrypt');

module.exports = function(password, salt, pepper) {

	if(!salt) {

		salt = bcrypt.genSaltSync(10);
		
	}

	if(!pepper) {

		pepper = bcrypt.genSaltSync(10);
		
	}

    const hash = bcrypt.hashSync(sha256(password+salt), pepper);

    return {
      salt : salt,
      hash : hash,
      pepper : pepper
    }

}