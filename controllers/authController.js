const User = require('../models/user');
const Crypto = require('crypto-js');
const jwt = require('jsonwebtoken');

module.exports.signIn = (req, res) => {
  res.render('sign-in', {
    title: 'Authentication | Sign in page',
    layout: 'auth-layout',
  });
};

module.exports.signUp = (req, res) => {
  res.render('sign-up', {
    title: 'Authentication | Sign up page',
    layout: 'auth-layout',
  });
};

module.exports.create = (req, res) => {
  try {
    if (req.body.password === req.body.confirmPassword) {
      User.findOne(
        {
          email: req.body.email,
        },
        (err, user) => {
          if (err) {
            console.log('Error while finding user', err);
            return;
          }
          if (!user) {
            User.create(
              {
                name: req.body.name,
                email: req.body.email,
                password: Crypto.AES.encrypt(
                  req.body.password,
                  'keepmarchingforwardking'
                ).toString(),
              },
              (err, newUser) => {
                if (err) {
                  console.log('Error while creating user', err);
                  return;
                }
                if (newUser) {
                  return res.redirect('/auth/sign-in');
                }
                return res.redirect('back');
              }
            );
          } else {
          }
        }
      );
    } else {
      req.flash('error', 'Password not matched!');
      return res.redirect('back');
    }
  } catch (err) {
    res.status(500).send(`something went wrong: ${err}`);
  }
};

module.exports.createSession = (req, res) => {
  try {
    User.findOne(
      {
        email: req.body.email,
      },
      (err, user) => {
        if (err) {
          console.log('Error while creating user', err);
          return;
        }
        if (user) {
          const storedPassword = Crypto.AES.decrypt(
            user.password,
            'keepmarchingforwardking'
          ).toString(Crypto.enc.Utf8);
          if (storedPassword === req.body.password) {
            res.cookie(
              'token',
              jwt.sign(user.toJSON(), 'keepmarchingforwardking', {
                expiresIn: '1h',
              })
            );
            return res.redirect('/');
          } else {
            req.flash('error', 'Password is incorrect!');
            return res.redirect('back');
          }
        }
        return res.redirect('back');
      }
    );
  } catch (err) {
    console.log('something went wrong', err);
    return;
  }
};

module.exports.endSession = (req, res) => {
  return res.status(200).send({
    message: 'Password not matched',
  });
};

module.exports.createSessionGoogle = (req, res) => {
  req.flash('success', 'Logged in successfully!');
  return res.redirect('/');
};
