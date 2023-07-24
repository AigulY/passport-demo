const User = require('../models/User');
const bcrypt = require('bcryptjs')
const passport = require('passport');

const signUpUser = {
  signUpForm: (req, res) => {
    res.render('sign-up-form');
  },
  signUp: async (req, res, next) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      await User.create({
        username: req.body.username,
        password: hashedPassword,
      });
      res.redirect('/');
    } catch (err) {
      return next(err);
    }
  },
};

const loginUser = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/',
  failureMessage: true,
});

const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/');
  });
};

module.exports = { 
  signUpUser, 
  loginUser, 
  logoutUser,
}