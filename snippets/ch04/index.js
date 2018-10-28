const express = require('express');
const app = express();
const Joi = require('joi');
const logger = require('./logger');
const helmet = require('helmet');
const morgan = require('morgan');

app.use(express.json());
app.use(express.urlencoded({ extended: true})); // key1=value1&key2=value2; only used for POST forms
app.use(express.static('public'));
app.use(helmet());
app.use(morgan('tiny'));
app.use(logger);

const port = process.env.PORT || 3000;
const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' }
];

app.get('/', (req, res) => {
  res.send('Express is up');
});

app.get('/api/courses/', (req, res) => {
  res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(course => course.id === parseInt(req.params.id));
  if (!course) return res.status(404).send(`The course with ID ${req.params.id} is not found.`);
  res.send(course);
});

app.post('/api/courses/', (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
  // Try to find course, or return 404
  const course = courses.find(course => course.id === parseInt(req.params.id));
  if (!course) return res.status(404).send(`The course with ID ${req.params.id} is not found.`);

  // Validate submitted course update, or return 400
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Update course and return it
  course.name = req.body.name;
  res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find(course => course.id === parseInt(req.params.id));
  if (!course) return res.status(404).send(`The course with ID ${req.params.id} is not found.`);

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

app.listen(port, () => console.log(`Listening on port ${port}...`));

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(course, schema);
}