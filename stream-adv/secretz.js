/**
 * TODO:
 */

const { Transform } = require('stream');
const fs = require('fs');
const crypto = require('crypto');

const tar = require('tar');
const concat = require('concat-stream');

const algorithm = process.argv[2];
const key = process.argv[3];
const initialization = process.argv[4];

if (
    algorithm === undefined &&
    key === undefined &&
    initialization === undefined
) {
    console.error('error');
    process.exit(2);
}

// const myTransform = new Transform()

const decipher = crypto.createDecipheriv(algorithm, key, initialization);

const parser = new tar.Parse();

parser.on('entry', function(entry) {

    if (entry.type !== 'File') {
        return entry.resume();
    }

    const cipher = crypto.createHash('md5', { 'encoding': 'hex' });

    entry
        .pipe(cipher)
        .pipe(concat(function(buffer) {
            process.stdout.write(`${buffer.toString()} ${entry.path}\n`)
        }));
        // .pipe(process.stdout);
        // .pipe(new Transform({
        //     'transform': function (chunk, enc, cb) {
        //         cb(null, `${chunk.toString()} ${entry.path}\n`)
        //     }
        // }))
});

process.stdin
    .pipe(decipher)
    .pipe(parser);