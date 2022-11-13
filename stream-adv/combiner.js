/**
 * TODO:
 */

const { Transform } = require('stream');
const { createGzip } = require('zlib');

const split2 = require('split2'); // TODO: check why Split2
const combine = require('stream-combiner');

const library = new Map();
const formattedLibrary = [];

let currentGenre;

function toJSON (value) {
    return JSON.stringify(`${value}\n`);
}

const bookTransformation = new Transform({
    'transform': function(chunk, _enc, cb) {
        const data = JSON.parse(chunk.toString());

        if (!data.type) {
            cb('JSON error');
        }

        if (data.type === 'genre') {
            library.set(data.name, []);
            
            currentGenre = data.name;
        } else {
            const books = library.get(currentGenre);
            
            library.set(currentGenre, [ ...books, data.name ]);
        }

        cb();
    },
    'final': function(cb) {
        const entries = Array.from(library.entries());

        entries.forEach(([name, books]) => {
            formattedLibrary.push({
                'name': name,
                'books': books
            });
        });

        formattedLibrary.forEach((collection) => {
            console.log(toJSON(collection));
            this.push(toJSON(collection));
        });

        cb();
    }
});

module.exports = function() {
    return combine(
        split2(),
        bookTransformation,
        createGzip()
    )
};