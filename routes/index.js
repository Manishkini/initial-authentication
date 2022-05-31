const express = require('express');
const router = express.Router();
const passport = require('passport');

const homeController = require('../controllers/homeController');

router.get('/', homeController.home);
router.get('/reset-password', homeController.resetPassword);
router.use('/auth', require('./auth'));

module.exports = router;
