const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Express is up');
});

app.listen(3000, () => console.log('Listening...'));