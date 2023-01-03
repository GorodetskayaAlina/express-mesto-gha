const User = require('../models/user');
const { STATUS_OK, STATUS_VALIDATION, STATUS_NOT_FOUND, STATUS_SERVER } = require('../constants');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(user => res.status(STATUS_OK).send(user))
    .catch(err => res.status(STATUS_SERVER).send({ message: `Произошла ошибка на сервере` }))
};

module.exports.getUserID = (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      if (!user) {
        return res.status(STATUS_NOT_FOUND).send({ message: `Пользователь не найден` })
      } else {
        return res.status(STATUS_OK).send(user)
      }
    })
    .catch(err => {
      if (err.name === 'CastError') {
        return res.status(STATUS_NOT_FOUND).send({ message: `Пользователь не найден` })
      } else {
        return res.status(STATUS_SERVER).send({ message: `Произошла ошибка на сервере` })
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.status(STATUS_OK).send(user))
    .catch(err => {
      if (err.name === 'ValidationError') {
        return res.status(STATUS_VALIDATION).send({ message: `Переданы некорректные данные` })
      } else { return res.status(STATUS_SERVER).send({ message: `Произошла ошибка на сервере` }) }
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true
  })
    .then(user => {
      if (!user) {
        return res.status(STATUS_NOT_FOUND).send({ message: `Пользователь не найден` })
      } else { return res.status(STATUS_OK).send(user) }
    })
    .catch(err => {
      if (err.name === 'ValidationError') {
        return res.status(STATUS_VALIDATION).send({ message: `Переданы некорректные данные` })
      } else { return res.status(STATUS_SERVER).send({ message: `Произошла ошибка на сервере` }) }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true
  })
    .then(user => {
      if (!user) {
        return res.status(STATUS_NOT_FOUND).send({ message: `Пользователь не найден` })
      } else { return res.status(STATUS_OK).send(user) }
    })
    .catch(err => {
      if (err.name === 'ValidationError') {
        return res.status(STATUS_VALIDATION).send({ message: `Переданы некорректные данные` })
      } else { return res.status(STATUS_SERVER).send({ message: `Произошла ошибка на сервере` }) }
    });
};