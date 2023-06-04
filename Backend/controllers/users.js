const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ConflictError = require('../errors/conflict-error');
const UnauthorizedError = require('../errors/unauthorized-error');
const { CREATE_CODE } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  const {
    email, login, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      login,
      password: hash,
    }))
    .then((newUser) => {
      res.status(CREATE_CODE).send({
        email: newUser.email,
        login: newUser.login,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else if (err.code === 11000) {
        next(new ConflictError('Пoльзователь уже зарегистрирован'));
      } else {
        next(err);
      }
    });
};

const logIn = (req, res, next) => {
  const { login, password } = req.body;
  return User.findUserByCredentials(login, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('По данному _id информация не найдена');
      }
      res.send(user);
    })
    .catch(next);
};

const changeUserInfo = (req, res, next) => {
  const { _id } = req.user;
  const { email, login } = req.body;
  User.findOne({ email: `${email}` })
    .then((userWithMail) => {
      if (!userWithMail || (userWithMail._id.toString() === _id)) {
        User.findOne({ login: `${login}` })
          .then((userWithLogin) => {
            if (!userWithLogin || (userWithLogin._id.toString() === _id)) {
              User.findByIdAndUpdate(
                _id,
                { email, login },
                { new: true, runValidators: true },
              )
                .then((user) => {
                  if (!user) {
                    throw new NotFoundError('По данному _id информация не найдена');
                  }
                  res.send(user);
                })
                .catch(next);
            } else {
              throw new ConflictError('Пoльзователь с таким логином уже зарегистрирован');
            }
          })
          .catch(next);
      } else {
        throw new ConflictError('Пoльзователь с таким email уже зарегистрирован');
      }
    })
    .catch(next);
};

const changeUserPassword = (req, res, next) => {
  const { password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.findByIdAndUpdate(
      req.user._id,
      { password: hash },
      { new: true, runValidators: true },
    ))
    .then((user) => {
      if (!user) {
        throw new NotFoundError('По данному _id информация не найдена');
      }
      res.send({
        email: user.email,
        login: user.login,
      });
    })
    .catch(next);
};

const checkUserPassword = (req, res, next) => {
  const { password } = req.body;
  User.findById(req.user._id).select('+password')
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Пароль неверный!');
          }
          res.send({
            _id: user._id,
            email: user.email,
            login: user.login,
          });
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  createUser,
  logIn,
  getUser,
  changeUserInfo,
  changeUserPassword,
  checkUserPassword,
};
