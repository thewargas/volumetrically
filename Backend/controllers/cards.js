const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');
const { CREATE_CODE } = require('../utils/constants');

const createCard = (req, res, next) => {
  const { _id } = req.user;
  const {
    name,
    fileWeight,
    description,
  } = req.body;
  Card.create({
    name,
    fileWeight,
    description,
    owner: _id,
  })
    .then((card) => {
      res.status(CREATE_CODE).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const getAllCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .populate('likes')
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

const getLikedCards = (req, res, next) => {
  const { _id } = req.user;

  Card.find({ likes: _id })
    .populate('owner')
    .populate('likes')
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findById({ _id: req.params.cardId })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('По данному _id информация не найдена');
      }
      if (card.owner.toString() !== (req.user._id)) {
        throw new ForbiddenError('Вы не можете удалить чужую карточку');
      }
      card.deleteOne()
        .then((deletedcard) => res.send(deletedcard))
        .catch(next);
    })
    .catch(next);
};

const addLikeCard = (req, res, next) => {
  const { _id } = req.user;
  Card.findByIdAndUpdate(
    { _id: req.params.cardId },
    { $addToSet: { likes: _id } },
    { new: true },
  )
    .populate('owner')
    .populate('likes')
    .then((card) => {
      if (!card) {
        throw new NotFoundError('По данному _id информация не найдена');
      }
      res.send(card);
    })
    .catch(next);
};

const removeLikeCard = (req, res, next) => {
  const { _id } = req.user;

  Card.findByIdAndUpdate(
    { _id: req.params.cardId },
    { $pull: { likes: _id } },
    { new: true },
  )
    .populate('owner')
    .populate('likes')
    .then((card) => {
      if (!card) {
        throw new NotFoundError('По данному _id информация не найдена');
      }
      res.send(card);
    })
    .catch(next);
};

module.exports = {
  createCard,
  getAllCards,
  getLikedCards,
  deleteCard,
  addLikeCard,
  removeLikeCard,
};
