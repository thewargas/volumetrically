const cardsRouter = require('express').Router();
const {
  createCardValidation,
  cardValidation,
} = require('../middlewares/routesValidation');
const {
  createCard,
  getAllCards,
  deleteCard,
  addLikeCard,
  removeLikeCard,
} = require('../controllers/cards');

cardsRouter.get('/', getAllCards);

cardsRouter.post('/', createCardValidation, createCard);

cardsRouter.delete('/:cardId', cardValidation, deleteCard);

cardsRouter.put('/:cardId/likes', cardValidation, addLikeCard);

cardsRouter.delete('/:cardId/likes', cardValidation, removeLikeCard);

module.exports = cardsRouter;
