const { Router } = require("express");
const listasRouter = require("./listas/routes");

const router = Router();

router.use("/listas", listasRouter);

module.exports = router;
