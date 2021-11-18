var Transaction = require("../models/Transaction");

async function addTransaction(req, res) {
  let reqTransaction = req.body;
  if (!reqTransaction.password || !reqTransaction.email) {
    return res.status(400).send({
      ok: false,
      msg: "Debe enviar todos los campos requeridos",
    });
  }

  console.log(reqTransaction);

  let transaction = new Transaction(reqTransaction);
  // Se guarda el nuevo usuario en la DB
  transaction.save((error, transaction) => {
    if (error)
      return res.status(500).send({
        ok: false,
        msg: "Error al crear usuario",
        error,
      });

    if (!transaction)
      return res.status(404).send({
        ok: false,
        msg: "No se pudo crear el usuario",
      });

    return res.status(200).send({
      ok: true,
      msg: "El usuario fue CREADO correctamente",
      transaction,
    });
  });
}

async function getTransactions(req, res) {
  // llamada a la DB
  let transactions = await Transaction.find({});

  const total = transactions.length;
  const per_page = 2;
  const total_pages = Math.ceil(total / per_page);

  res.status(200).send({
    ok: true,
    msg: "Se obtuvieron los usuarios",
    transactions,
    total,
    per_page,
    total_pages,
  });
}

function getTransaction(req, res) {
  console.log(req);
  console.log(req.params);
  const id = req.params.id;

  // llamada a la DB Transaction
  Transaction.findById(id, (error, transaction) => {
    if (error)
      return res.status(500).send({
        ok: false,
        msg: "Error al obtener usuario",
        error,
      });
    if (!transaction)
      return res.status(404).send({
        ok: false,
        msg: "Usuario NO encontrado",
        transaction,
      });
    return res.status(200).send({
      ok: true,
      msg: "Usuario obtenido CORRECTAMENTE de la DB",
      transaction,
    });
  });
}

// Transaction.find({ country: 'Jhon' })

function delTransaction(req, res) {
  const id = req.params.id;
  Transaction.findByIdAndDelete(id, (error, transactionDeleted) => {
    if (error)
      return res.status(500).send({
        ok: false,
        msg: "No se pudo borrar el usuario",
        error,
      });
    if (!transactionDeleted)
      return res.status(404).send({
        ok: false,
        msg: "Usuario no encotrado",
      });

    return res.status(200).send({
      ok: true,
      msg: "Usuario borrado correctamente",
      transactionDeleted,
    });
  });
}

module.exports = {
  addTransaction,
  getTransactions,
  getTransaction,
  delTransaction,
};
