var crypto = require('crypto');
var password = crypto.createHash('sha256').update('passwod').digest('hex')
console.log(password)
