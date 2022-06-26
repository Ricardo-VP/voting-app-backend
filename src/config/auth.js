const UserModel = require("../apis/users/model/User");
const passport = require("passport");

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, async (err, token) => {
    if (err || !token) {
      return res.status(401).send({
        type: "unauthorized",
        message: "Debes iniciar sesion",
      });
    }

    try {
      const user = await UserModel.findOne({ _id: token.sub });
      req.user = user;
    } catch (error) {
      return res.status(401).send({
        type: "unauthorized",
        message: "Debes iniciar sesion",
      });
    }

    next();
  })(req, res, next);
};

module.exports = auth;
