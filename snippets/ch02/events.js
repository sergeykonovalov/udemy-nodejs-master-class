const Logger = require('./logger');
const logger = new Logger();

logger.on('messageLogged', (args) => {
  console.log(`Message logged: ${args.id}, ${args.text}`);
});

logger.log('message');