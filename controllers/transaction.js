const Transaction = require("../models/transaction");
const User = require("../models/user");

async function createTransaction(req, res) {
  try {
    let newTransaction = new Transaction(req.body);
    const transaction = await newTransaction.save();

    if (!transaction)
      return res.status(401).send({
        ok: false,
        msg: "No se guardo la transacción",
      });

    return res.status(200).send({
      ok: true,
      msg: "Se creo la transacción correctamente",
      transaction,
    });
  } catch (error) {
    return res.status(500).send({
      ok: false,
      msg: "No se pudo crear la transacción",
      error,
    });
  }
}

const getMovements = async (req, res) => {
  console.log(req.query);
  const id = req.query.id;
  const start = +req.query.start || 0;
  const limit = +req.query.limit || 5;

  if (req.user.role === "STUDENT_ROLE" && (!id || req.user._id !== id)) {
    return res
      .status(401)
      .send({ ok: false, msg: "No puede acceder a las transacciones" });
  }

  

  const typeOfMovement = req.params.type;
  if (id) {
    try {
      let transactions = await Transaction.find({ student_id: id });
      let user = await User.findById(id).exec();
      console.log(transactions);
      console.log(user);
      if (!transactions || !user) {
        return res.status(404).send({
          ok: false,
          msg: "No se pudo obtener las transaccioneso usuarios",
        });
      }

      return res.status(200).send({
        ok: true,
        msg: "Transacciones y Usuario obtenidos correctamente",
        transactions,
        user,
      });
    } catch (error) {
      return res.status(500).send({
        ok: false,
        msg: "Error al obtener transacciones del usuario",
        error,
      });
    }
    
  } else {
    try {
      console.log(limit, start);
      
      const [total, transactions] = await Promise.all([
        Transaction.countDocuments(),
        Transaction.find({})
          .skip(start)
          .limit(limit)
          .sort("-value description")
          .populate("student_id", "name surname email")
          .exec(),
      ]);
      if (!transactions)
        return res.status(404).send({
          ok: false,
          msg: "No existen transacciones en la base de datos",
        });

      return res.status(200).send({
        ok: true,
        msg: "Transacciones obtenidas correctamente",
        itemsPerPage: limit,
        total: total,
        pages: Math.ceil(total / limit),
        transactions,
      });
    } catch (error) {
      return res.status(500).send({
        ok: false,
        msg: "Error al obtener transacciónes",
        error,
      });
    }

    
  }
};

const getMovementsByValue = function (req, res) {
  console.log("Entra al criteria");
  const criteria = req.params.criteria;
  console.log(criteria);
  Transaction.find({
    $or: [
      {
        $and: [{ description: "Gas" }, { created_at: { $gte: 1631833012667 } }],
      },
      {
        value: { $gte: 20000 },
      },
    ],
  })
  .exec((error, transactions) => {
    if (error)
      return res.status(500).send({
        ok: false,
        msg: "Error al obtener Transacciones",
        error,
      });
    if (!transactions)
      return res.status(404).send({
        ok: false,
        msg: "No se pudo obtener ninguna transacción con los criterios de busqueda enviados",
      });
    return res.status(200).send({
      ok: true,
      msg: `Transacciones encontradas referentes a ${criteria}`,
      count: transactions.length,
      transactions,
    });
  });
};

function updateMovement(req, res) {
  const id = req.params.id;
  const update = req.body;
  console.log(req.params);
  Transaction.findByIdAndUpdate(
    id,
    update,
    { new: true },
    (error, transactionUpdated) => {
      if (error)
        return res.status(500).send({
          ok: false,
          msg: "Error al actualizar la transacción",
          error,
        });
      if (!transactionUpdated)
        return res.status(404).send({
          ok: false,
          msg: "No se encontró la transacción a actualizar ",
        });
      return res.status(200).send({
        ok: true,
        msg: "",
        transactionUpdated,
      });
    }
  );
}

//  buscarTransacciones();

function updateInvalidDate(req, res) {
  let transactionArrayFromDB = [
    { created_at: 1632442060.957 },
    { created_at: 1632442060000 },
    { created_at: 1632442060000 },
    { created_at: 1632442060.957 },
  ];
  transactionArrayFromDB.forEach((t) => {
    let createdLength = t.created_at.toString().length;
    if (createdLength > 10) {
      if (createdLength === 14) {
        t.created_at = t.created_at.toString().replace(".", "");
        t.created_at = parseInt(t.created_at);
      }
      t.created_at = parseInt(t.created_at / 1000);
    }
  });

  console.log(transactionArrayFromDB);
}

module.exports = {
  createTransaction,
  getMovements,
  getMovementsByValue,
  updateMovement,
  updateInvalidDate,
};
