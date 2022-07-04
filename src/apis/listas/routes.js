const { Router } = require("express");
const {
  obtenerListas,
  crearLista,
  actualizarLista,
  eliminarLista,
  registrarVoto,
  obtenerLista,
} = require("./controller");

const listasRouter = Router();

listasRouter.get("/", obtenerListas);
listasRouter.get("/:listaId", obtenerLista);
listasRouter.post("/", crearLista);
listasRouter.put("/:listaId", actualizarLista);
listasRouter.delete("/:listaId", eliminarLista);

listasRouter.post("/votar/:listaId", registrarVoto);

module.exports = listasRouter;
