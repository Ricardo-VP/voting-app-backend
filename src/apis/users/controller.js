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
        votoRegistrado: user.votoRegistrado,
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
  const { cedula, password, esAdmin, votoRegistrado } = req.body;

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
    votoRegistrado,
  });
  if (user) {
    return res.status(201).json({
      _id: user._id,
      cedula: user.cedula,
      admin: user.esAdmin,
      votoRegistrado: user.votoRegistrado,
      token: generateJWTtoken(user),
    });
  } else {
    return res.status(400).send({
      type: "error",
      message: "No se pudo registrar el usuario",
    });
  }
};

const verificarVoto = async (req, res) => {
  const { userId } = req.params;

  await UserModel.findById(userId)
    .then((user) => {
      return res.send({
        type: "success",
        habilitado: !user?.votoRegistrado,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.send({
        type: "error",
        message: "No se encontró el usuario con id " + userId,
      });
    });
};

module.exports = {
  login,
  register,
  verificarVoto,
};
