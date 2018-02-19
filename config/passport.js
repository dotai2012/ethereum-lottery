const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const user = require('../model/user');
const config = require('../config/database');

module.exports = (passport) => {
  const opts = {};
  opts.jwtFromRequest = extractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = config.secret;
  passport.use(new jwtStrategy(opts, (jwt_payload, done) => {
    user.getUserID(jwt_payload._id, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    });
  }));
};
