var Transaction = require("../models/transaction");
var bcrypt = require("bcrypt");

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
        msg: "Error al crear la transacción.",
        error,
      });

    if (!transaction)
      return res.status(404).send({
        ok: false,
        msg: "No se pudo crear la transacción.",
      });

    return res.status(200).send({
      ok: true,
      msg: "La Transacción fue CREADA correctamente",
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
    msg: "Se obtuvieron las transacciónes.",
    transactions,
    total,
    per_page,
    total_pages,
  });
}

function getTransaction(req, res) {
  const id = req.params.id;

  // llamada a la DB Transaction
  Transaction.findById(id, (error, transaction) => {
    if (error)
      return res.status(500).send({
        ok: false,
        msg: "Error al obtener la Transacción.",
        error,
      });
    if (!transaction)
      return res.status(404).send({
        ok: false,
        msg: "Transacción NO encontrada",
        transaction,
      });
    return res.status(200).send({
      ok: true,
      msg: "Transacción obtenida CORRECTAMENTE de la DB",
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
        msg: "No se pudo borrar la transacción.",
        error,
      });
    if (!transactionDeleted)
      return res.status(404).send({
        ok: false,
        msg: "Transacción no encotrado",
      });

    return res.status(200).send({
      ok: true,
      msg: "Transacción borrada correctamente",
      transactionDeleted,
    });
  });
}

function putTransaction(req, res) {
  const id = req.params.id;
  Transaction.findById(id, (error, transactionPut) => {
    if (error)
      return res.status(500).send({
        ok: false,
        msg: "No se pudo modificar la transacción.",
        error,
      });
    if (!transactionPut)
      return res.status(404).send({
        ok: false,
        msg: "Transacción no encontrada",
      });

    return res.status(200).send({
      ok: true,
      msg: "Transacción modificada correctamente",
      transactionPut,
    });
  });
}

module.exports = {
  addTransaction,
  getTransactions,
  getTransaction,
  delTransaction,
  putTransaction,
};
