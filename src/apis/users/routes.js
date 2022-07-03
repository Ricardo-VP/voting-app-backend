const { Router } = require("express");
const { login, register, verificarVoto } = require("./controller");

const usersRouter = Router();

usersRouter.post("/login", login);
usersRouter.post("/register", register);

usersRouter.get("/voto-estado/:userId", verificarVoto);

module.exports = usersRouter;
