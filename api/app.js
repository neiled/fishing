module.exports = function(app) {
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var GitHubStrategy = require('passport-github').Strategy;
var session = require('express-session');
var logger = require('morgan');

// var fishing = require('./routes/fishing')(io);
var user = require('./user');
var models = require("../models");
// var analytics = require('./lib/analytics');

// var app = express();


// Use the TwitterStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Twitter profile), and
//   invoke a callback with a user object.
passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_KEY,
    consumerSecret: process.env.TWITTER_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK
  },
  function(token, tokenSecret, profile, done) {
    models.user.findOrCreate({where: { twitterId: profile.id }}).spread(function (user) {
      // analytics.addEvent('login', {type: 'twitter'});
      return done(null, user);
    });
  }
));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK //"http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    models.user.findOrCreate({where: { gitHubId: "gh"+profile.id }}).spread(function (user) {
      // analytics.addEvent('login', {type: 'github'});
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
    done(null, user.id); // this is what gets attached to the session
});

passport.deserializeUser(function(id, done) {
    models.user.findById(id).then(function(user) {
        done(null, user);
    });
});

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'eddy catZZZ' }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// app.use("/_assets", express.static(path.join(__dirname, "build", "public"), {
//   maxAge: "200d" // We can cache them as they include hashes
// }));
// app.use("/", express.static(path.join(__dirname, 'client')));
// // app.use('/fishing', fishing);
// app.use('/user', user);

app.get('/user/current', function(req, res) {
    res.json({user: req.user});
});


app.get('/auth/twitter',  passport.authenticate('twitter'));
app.get('/auth/github',  passport.authenticate('github'));

app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/auth/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

return app;
};
