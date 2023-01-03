const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { STATUS_NOT_FOUND } = require('./constants');

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use((req, res, next) => {
  req.user = {
    _id: '63b3f6fe6e5e23670e0e7e56'
  };

  next();
});

app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.use('*', (req, res, next) => {
  return res.status(STATUS_NOT_FOUND).send({ message: `Страница не найдена` })
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})