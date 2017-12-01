var crypt = require('crypto');

var cryptStream = crypt.createDecipher('aes256', process.argv[2]);

process.stdin.pipe(cryptStream).pipe(process.stdout);
