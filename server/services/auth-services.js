import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

// import User from '../models/user';
// import constants from '../config/constants';

import model from '../models';
const {user} = model;
import constants from '../utils/constants';

//Local Strategy Auth
const localOpts = { 
    usernameField: 'username' 
};

const localLogin = new LocalStrategy(
  localOpts,
  async (username, password, done) => {
    try {
      const user1 = await user.findOne({ where : {username: username} });

      if (!user1) {
        console.log(user1)
        return done(null, false);
      } else if (!user1.authenticateUser(password)) {
        return done(null, false);
      }

      return done(null, user1);
    } catch (e) {
      return done(e, false);
    }
  },
);

//JWT Strategy Auth
const jwtOpts = {
  // Telling Passport to check authorization headers for JWT
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  // Telling Passport where to find the secret
  secretOrKey: constants.JWT_SECRET,
};

const jwtLogin = new JWTStrategy(jwtOpts, async (payload, done) => {
  try {
    const user2 = await user.findByPk(payload._id);

    if (!user2) {
      return done(null, false);
    }

    return done(null, user2);
  } catch (e) {
    return done(e, false);
  }
});

passport.use(localLogin);
passport.use(jwtLogin);

export const authLocal = passport.authenticate('local', { session: false });
export const authJwt = passport.authenticate('jwt', { session: false });