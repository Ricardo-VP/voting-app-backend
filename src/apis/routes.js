const { Router } = require("express");
const auth = require("../config/auth");

const listasRouter = require("./listas/routes");
const usersRouter = require("./users/routes");

const router = Router();

router.use("/auth", usersRouter);
router.use("/listas", auth, listasRouter);

module.exports = router;
 