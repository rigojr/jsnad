/**
 * TODO:
 */

const passphrase = process.argv[2];
const initialization = process.argv[3];

const crypto = require('crypto');

if (passphrase === undefined && initialization === undefined) {
    process.exit(2);
}

const decryptStream = crypto.createDecipheriv('aes256', passphrase, initialization);

process.stdin
    .pipe(decryptStream)
    .pipe(process.stdout);