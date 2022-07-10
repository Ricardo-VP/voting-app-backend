const { Router } = require("express");
const {
  login,
  register,
  verificarVoto,
  obtenerTodos,
  borrarTodos,
} = require("./controller");

const usersRouter = Router();

usersRouter.get("/obtener-todos", obtenerTodos);
usersRouter.delete("/eliminar-todos", borrarTodos);

usersRouter.post("/login", login);
usersRouter.post("/register", register);

usersRouter.get("/voto-estado/:userId", verificarVoto);

module.exports = usersRouter;
