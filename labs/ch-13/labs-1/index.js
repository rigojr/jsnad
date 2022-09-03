'use strict'
const assert = require('assert')
const { join, basename } = require('path')
const fs = require('fs')

const { Readable, Transform, pipeline } = require('stream');

const project = join(__dirname, 'project')

try { fs.rmdirSync(project, {recursive: true}) } catch (err) {}
const files = Array.from(Array(5), () => {
  return join(project, Math.random().toString(36).slice(2))
})

files.sort()

fs.mkdirSync(project)

for (const f of files) fs.closeSync(fs.openSync(f, 'w'))

const out = join(__dirname, 'out.txt')

async function exercise () {
  const filenames = await fs.promises.readdir('./project')
  const names = filenames.reduce((acc, current) => {
    if (acc === '') {
      return current
    }

    return acc + ',' + current;
  }, '');

  fs.writeFileSync('out.txt', names);
}

async function exerciseWithPipeline() {
  const readdirStream = await Readable
    .from(await fs.promises.readdir('./project'));

  const formattedStream = new Transform({
    transform: (chunk, encoding, callBack) => {
      callBack(null, chunk + ',');
    }
  });

  const writeableStream = fs.createWriteStream('out2.txt').write();

  pipeline(readdirStream, formattedStream, writeableStream);
}

exercise()
  .then(() => {
    assert.deepStrictEqual(
      fs.readFileSync(out).toString().split(',').map((s) => s.trim()),
      files.map((f) => basename(f))
    )
    console.log('passed!')
  })
  .catch((error) => {
    console.log(error);
  })

  exerciseWithPipeline();