const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const {
  loginValidation,
  registerValidation,
} = require('../middlewares/routesValidation');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');
const {
  createUser,
  logIn,
} = require('../controllers/users');

router.post('/signin', loginValidation, logIn);

router.post('/signup', registerValidation, createUser);

router.use(auth);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Неправильный адрес'));
});

module.exports = router;
