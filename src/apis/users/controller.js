const generateJWTtoken = require("../../utils");
const UserModel = require("./model/User");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    return res.send({
      type: "success",
      user: {
        _id: user._id,
        cedula: user.cedula,
        email: user.email,
        token: generateJWTtoken(user),
      },
    });
  } else {
    return res.status(400).send({
      type: "error",
      message: "Invalid email or password",
    });
  }
};

const register = async (req, res, next) => {
  const { cedula, email, password } = req.body;

  const userExists = await UserModel.findOne({ email });
  if (userExists) {
    console.log(userExists);
    return res.status(400).send({
      type: "error",
      message: "El usuario ya existe",
    });
  }

  const user = await UserModel.create({
    cedula,
    email,
    password,
  });
  if (user) {
    return res.status(201).json({
      _id: user._id,
      cedula: user.cedula,
      email: user.email,
      token: generateJWTtoken(user),
    });
  } else {
    return res.status(400).send({
      type: "error",
      message: "No se pudo registrar el usuario",
    });
  }
};

module.exports = {
  login,
  register,
};
