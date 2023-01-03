const Card = require('../models/card');
const {
  STATUS_OK, STATUS_VALIDATION, STATUS_NOT_FOUND, STATUS_SERVER,
} = require('../constants');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((card) => res.status(STATUS_OK).send(card))
    .catch(() => res.status(STATUS_SERVER).send({ message: 'Произошла ошибка на сервере' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(STATUS_OK).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(STATUS_VALIDATION).send({ message: 'Переданы некорректные данные' });
      } else { res.status(STATUS_SERVER).send({ message: 'Произошла ошибка на сервере' }); }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(STATUS_NOT_FOUND).send({ message: 'Карточка не найдена' });
      } else { res.status(STATUS_OK).send(card); }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(STATUS_VALIDATION).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(STATUS_SERVER).send({ message: 'Произошла ошибка на сервере' });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        res.status(STATUS_NOT_FOUND).send({ message: 'Карточка не найдена' });
      } else { res.status(STATUS_OK).send(card); }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(STATUS_VALIDATION).send({ message: 'Переданы некорректные данные' });
      } else if (err.name === 'CastError') {
        res.status(STATUS_VALIDATION).send({ message: 'Переданы некорректные данные' });
      } else { res.status(STATUS_SERVER).send({ message: 'Произошла ошибка на сервере' }); }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        res.status(STATUS_NOT_FOUND).send({ message: 'Карточка не найдена' });
      } else { res.status(STATUS_OK).send(card); }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(STATUS_VALIDATION).send({ message: 'Переданы некорректные данные' });
      } else if (err.name === 'CastError') {
        res.status(STATUS_VALIDATION).send({ message: 'Переданы некорректные данные' });
      } else { res.status(STATUS_SERVER).send({ message: 'Произошла ошибка на сервере' }); }
    });
};
