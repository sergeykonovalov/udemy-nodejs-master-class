const EventEmitter = require('events');

class Logger extends EventEmitter {
  log(message) {
    console.log(message);
    this.emit('messageLogged', {id: 123, text: "Text"});
  }
}

module.exports = Logger;