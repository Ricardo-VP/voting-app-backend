const { Router } = require("express");
const {
  obtenerListas,
  crearLista,
  actualizarLista,
  eliminarLista,
} = require("./controller");

const listasRouter = Router();

listasRouter.get("/", obtenerListas);
listasRouter.post("/", crearLista);
listasRouter.put("/:listaId", actualizarLista);
listasRouter.delete("/:listaId", eliminarLista);

module.exports = listasRouter;
