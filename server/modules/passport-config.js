const JwtStrategy = require("passport-jwt").Strategy;
const User = require("../models/User");

const opts = {
  jwtFromRequest: (req) => req?.cookies["token"] || null,
  secretOrKey: process.env.SECRET,
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (payload, done) =>
      User.findById(payload.id)
        .then((user) =>
          done(null, user ? { id: user.id, email: user.email } : null)
        )
        .catch((err) => console.error(err))
    )
  );
};
