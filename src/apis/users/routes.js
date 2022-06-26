const { Router } = require("express");
const { login, register } = require("./controller");

const usersRouter = Router();

usersRouter.post("/login", login);
usersRouter.post("/register", register);

module.exports = usersRouter;
