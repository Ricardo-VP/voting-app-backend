const generateJWTtoken = require("../../utils");
const UserModel = require("./model/User");

const login = async (req, res, next) => {
  const { cedula, password } = req.body;

  const user = await UserModel.findOne({ cedula });
  if (user && (await user.matchPassword(password))) {
    return res.send({
      type: "success",
      user: {
        _id: user._id,
        cedula: user.cedula,
        admin: user.esAdmin,
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
  const { cedula, password, esAdmin } = req.body;

  const userExists = await UserModel.findOne({ cedula });
  if (userExists) {
    return res.status(400).send({
      type: "error",
      message: "El usuario ya existe",
    });
  }

  const user = await UserModel.create({
    cedula,
    password,
    esAdmin,
  });
  if (user) {
    return res.status(201).json({
      _id: user._id,
      cedula: user.cedula,
      admin: user.esAdmin,
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
