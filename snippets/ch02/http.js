const http = require('http');
const server = http.createServer(function(req, res) {
  if (req.url === '/') {
    res.write('Root');
    res.end();
  }

  if(req.url === '/api/courses') {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});

// server.on('connection', (socket) => {
//   console.log(socket);
// });

server.listen(3000);