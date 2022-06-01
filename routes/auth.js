const express = require('express');
const router = express.Router();
const passport = require('passport');

const authController = require('../controllers/authController');

router.get('/sign-in', authController.signIn);
router.get('/sign-up', authController.signUp);

router.post('/create', authController.create);
router.post('/createSession', authController.createSession);

router.get(
  '/endSession',
  passport.authenticate('jwt', { session: false }),
  authController.endSession
);

router.post(
  '/resetPassword',
  passport.authenticate('jwt', { session: false }),
  authController.resetPassword
);

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/sign-in',
    session: false,
  }),
  authController.createSessionGoogle
);

module.exports = router;
