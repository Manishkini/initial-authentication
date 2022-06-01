const express = require('express');
const app = express();
const port = '9633';
const cookieParser = require('cookie-parser');
const session = require('express-session');
const db = require('./config/mongoose');

const bodyParser = require('body-parser');

const passport = require('passport');
const jwtStrategy = require('./config/passport-jwt-strategy.js');
const googleStrategy = require('./config/passport-google-strategy');

const expressLayoutEjs = require('express-ejs-layouts');

const flash = require('connect-flash');
const customeMware = require('./config/middleware');

app.use(cookieParser());

app.use(
  session({
    cookie: { maxAge: 60000 },
    secret: 'your_secret',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(expressLayoutEjs);

// extract Style and script from sublayout to layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// static files
app.use(express.static('assets'));

// views
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(flash());
app.use(customeMware.sendFlash);

app.use('/', require('./routes'));

app.listen(port, (err) => {
  if (err) {
    console.log('something went wrong', err);
  }
  console.log('app is running on http://localhost:9633');
});
