const moongose = require("mongoose");

const listaSchema = moongose.Schema(
  {
    nombre: String,
    presidente: String,
    vicepresidente: String,
    otrosPuestos: [
      {
        puesto: String,
        nombre: String,
      },
    ],
    votos: Number,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ListaModel = moongose.model("listas", listaSchema);

module.exports = ListaModel;
