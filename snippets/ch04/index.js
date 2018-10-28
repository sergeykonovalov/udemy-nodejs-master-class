const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

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
  if (!course) res.status(404).send(`The course with ID ${req.params.id} is not found.`);
  res.send(course);
});

app.post('/api/courses/', (req, res) => {
  const schema = {
    name: Joi.string().min(3).required()
  };

  const result = Joi.validate(req.body, schema);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

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
  if (!course) res.status(404).send(`The course with ID ${req.params.id} is not found.`);

  // Validate submitted course update, or return 400
  const schema = {
    name: Joi.string().min(3).required()
  };

  const result = Joi.validate(req.body, schema);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  // Update course and return it
  course.name = req.body.name;
  res.send(course);
});

app.listen(port, () => console.log(`Listening on port ${port}...`));