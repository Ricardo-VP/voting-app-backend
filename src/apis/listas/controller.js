const UserModel = require("../users/model/User");
const ListaModel = require("./model/Lista");

const obtenerListas = async (req, res) => {
  await ListaModel.find()
    .then((listas) => {
      if (listas.length === 0) {
        return res.send({
          type: "success",
          message: "No hay listas registradas",
        });
      }
      return res.send({
        type: "success",
        listas,
      });
    })
    .catch((error) => {
      return res.send(error);
    });
};

const crearLista = async (req, res) => {
  const lista = new ListaModel(req.body);

  await ListaModel.create(lista)
    .then(() => {
      return res.send({
        type: "success",
        message: "Lista creada satisfactoriamente",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.send({
        type: "error",
        message: "Error al crear la lista",
      });
    });
};

const actualizarLista = async (req, res) => {
  const { listaId } = req.params;
  const lista = req.body;

  await ListaModel.findByIdAndUpdate(listaId, lista, {
    new: true,
  })
    .then((listaActualizada) => {
      return res.send({
        type: "success",
        lista: listaActualizada,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.send({
        type: "error",
        message: "Lista no encontrada",
      });
    });
};

const eliminarLista = async (req, res) => {
  const { listaId } = req.params;

  await ListaModel.findByIdAndDelete(listaId)
    .then((lista) => {
      if (lista == null) {
        return res.send({
          type: "error",
          message: "Lista no encontrada",
        });
      }
      return res.send({
        type: "success",
        message: "Lista eliminada satisfactoriamente",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.send({
        type: "error",
        message: "No se pudo eliminar la lista",
      });
    });
};

const registrarVoto = async (req, res) => {
  const { listaId } = req.params;
  const { userId } = req.body;

  await UserModel.findById(userId)
    .then(async (user) => {
      if (user.votoRegistrado) {
        return res.send({
          type: "error",
          message: "El voto ya fué registrado",
        });
      } else {
        await ListaModel.findByIdAndUpdate(listaId, { $inc: { votos: 1 } })
          .then(() => {
            return res.send({
              type: "success",
              message: "Voto realizado satisfactoriamente",
            });
          })
          .catch((err) => {
            return res.send({
              type: "error",
              message: "No se pudo registrar el voto",
            });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.send({
        type: "error",
        message: "El usuario con el que intenta votar no fué encontrado",
      });
    });
};

module.exports = {
  obtenerListas,
  crearLista,
  actualizarLista,
  eliminarLista,
  registrarVoto,
};
