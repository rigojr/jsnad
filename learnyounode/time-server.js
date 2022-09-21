/**
 * TODO:
 */

const net = require('net');

const port = process.argv[2];

const zeroFilledFormat = (number) => {
  if (number <= 9) {
    return `0${number}`
  }

  return number;
};

const getDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = zeroFilledFormat(currentDate.getMonth() + 1);
  const day = zeroFilledFormat(currentDate.getDate());
  const hours = zeroFilledFormat(currentDate.getHours());
  const minutes = zeroFilledFormat(currentDate.getMinutes());

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

const listener = (socket) => {
  socket.end(getDate() + '\n');
};

const server = net.createServer(listener);

server.listen(port);