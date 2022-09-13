const axios = require('axios').default;
const https = require('https');
const { createHash } = require('crypto');

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

const url = 'https://visas.migracion.gob.pa/SIVA/verif_citas_ven';

let sha = undefined;
let tries = 0;

async function sleep(timeout) {
  return new Promise((resolve, _) => {
    setTimeout(() => resolve(), timeout);
  });
}

async function useInterval() {
  console.log('# Try:', tries);

  const { data } = await axios.get(url, { httpsAgent });
  const temporarySHA = createHash('sha256').update(data.toString()).digest('hex');

  if (sha !== temporarySHA) {
    console.log(Date.now(), 'change detected');
    sha = temporarySHA;

    if (tries > 0) {
      console.log(data);

      return;
    }

  } else {
    console.log(Date.now(), temporarySHA);
  }

  await sleep(60000);

  tries++;
  useInterval();
}

useInterval()
  .catch((error) => {
    console.log('Something was wrong!');
    console.error(error);
  });