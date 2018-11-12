const express = require('express');
const app = express();
const Joi = require('joi');
const logger = require('./middleware/logger');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const courses = require('./routes/courses');
const home = require('./routes/home');

app.set('view engine', 'pug');

// Create debuggers and their name spaces
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

console.log(config.get('name'));
console.log(config.get('mail.host'));
console.log(config.get('mail.password'));

app.use(express.json());
app.use(express.urlencoded({ extended: true})); // key1=value1&key2=value2; only used for POST forms
app.use(express.static('public'));
app.use(helmet());
app.use(morgan('tiny'));
app.use(logger);

app.use('/api/courses', courses);
app.use('/', home);

const port = process.env.PORT || 3000;
const nodeEnv = process.env.NODE_ENV || 'development';
startupDebugger(`app: ${app.get('env')}`);

app.listen(port, () => console.log(`Listening on port ${port}, NODE_ENV: ${nodeEnv}`));
