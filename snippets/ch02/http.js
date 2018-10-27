const http = require('http');
const server = http.createServer();

server.on('connection', (socket) => {
  console.log(socket);
});

server.listen(3000);