const userRouter = require('express').Router();
const {
  changeUserInfoValidation,
  passwordValidation,
} = require('../middlewares/routesValidation');
const {
  changeUserInfo,
  getUser,
  changeUserPassword,
  checkUserPassword,
} = require('../controllers/users');

userRouter.get('/me', getUser);

userRouter.patch('/me', changeUserInfoValidation, changeUserInfo);

userRouter.patch('/me/password', passwordValidation, changeUserPassword);

userRouter.post('/me/password', passwordValidation, checkUserPassword);

module.exports = userRouter;
