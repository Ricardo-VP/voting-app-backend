const { Router } = require("express");
const auth = require("../config/auth");

const listasRouter = require("./listas/routes");
const usersRouter = require("./users/routes");

const router = Router();

router.use("/auth", auth, usersRouter);
router.use("/listas", listasRouter);

module.exports = router;
