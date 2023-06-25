const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

const {
  signUpUser,
  loginUser,
  logoutUser
} = require('../controllers/auth');

const { indexUser } = require('../controllers/index');
const { restrictedUser } = require('../controllers/restricted');

router.route('/').get(indexUser);
router.get('/restricted', authMiddleware, restrictedUser);
router.route('/sign-up').get(signUpUser.signUpForm).post(signUpUser.signUp);
router.route('/log-in').post(loginUser);
router.route('/log-out').get(logoutUser);

module.exports = router;