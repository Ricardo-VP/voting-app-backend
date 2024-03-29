const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const UserModel = require("../apis/users/model/User");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

module.exports = (passport) => {
  try {
    passport.use(
      new JwtStrategy(options, function (jwt_payload, done) {
        UserModel.findOne({ _id: jwt_payload.sub }, function (err, user) {
          if (err) {
            return done(err, false);
          }
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      })
    );
  } catch (error) {
    console.log(error.message);
  }
};
