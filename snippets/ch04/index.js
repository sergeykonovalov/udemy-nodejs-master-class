const express = require('express');
const app = express();

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

app.listen(port, () => console.log(`Listening on port ${port}...`));