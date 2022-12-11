const print = (err, contents) => { 
  if (err) console.error(err)
  else console.log(contents )
}

const opA = (cb) => {
  setTimeout(() => {
    console.log('A ends');
    cb(null, 'A')
  }, Math.floor(Math.random() * 1000))
}

const opB = (cb) => {
  setTimeout(() => {
    console.log('B ends');
    cb(null, 'B')
  }, Math.floor(Math.random() * 1000))
}

const opC = (cb) => {
  setTimeout(() => {
    console.log('C ends');
    cb(null, 'C')
  }, Math.floor(Math.random() * 1000))
}

opA((_, contentA) => {
  opB((_, contentB) => {
    opC((_, contentC) => {
      console.log(contentC, contentB, contentA);
    })
  })
})
