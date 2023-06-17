const { celebrate, Joi } = require('celebrate');
const { urlRegExp } = require('../utils/constants');

const loginValidation = celebrate({
  body: Joi.object().keys({
    login: Joi.string().min(2).max(30).required(),
    password: Joi.string().required(),
  }),
});

const registerValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    login: Joi.string().min(2).max(30).required(),
    password: Joi.string().required(),
  }),
});

const changeUserInfoValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    login: Joi.string().min(2).max(30).required(),
  }),
});

const createCardValidation = celebrate({
  body: Joi.object().keys({
    link: Joi.string().required().regex(urlRegExp),
    name: Joi.string().required(),
    description: Joi.string().required(),
  }),
});

const cardValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

const passwordValidation = celebrate({
  body: Joi.object().keys({
    password: Joi.string().required(),
  }),
});

module.exports = {
  loginValidation,
  registerValidation,
  changeUserInfoValidation,
  createCardValidation,
  cardValidation,
  passwordValidation,
};
