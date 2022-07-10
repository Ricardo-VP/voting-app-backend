const { Router } = require("express");
const {
  login,
  register,
  verificarVoto,
  obtenerTodos,
  borrarTodos,
  borrarPorId,
} = require("./controller");

const usersRouter = Router();

usersRouter.get("/obtener-todos", obtenerTodos);
usersRouter.delete("/eliminar-todos", borrarTodos);
usersRouter.delete("/eliminar-uno/:userId", borrarPorId);

usersRouter.post("/login", login);
usersRouter.post("/register", register);

usersRouter.get("/voto-estado/:userId", verificarVoto);

module.exports = usersRouter;
