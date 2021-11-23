var express = require("express");
var api = express.Router();
var transactionController = require("../controllers/transaction");
const ensureAuth = require("../middlewares/authentication");

api.post("/transaction", transactionController.createTransaction);

api.get("/movements", ensureAuth, transactionController.getMovements); //req.params.name o req.params.surname o req.params { name, surname }
api.get(
  "/movements-criteria/:criteria?",
  ensureAuth,
  transactionController.getMovementsByValue
);
api.put(
  "/movements-update/:id",
  ensureAuth,
  transactionController.updateMovement
);
api.put("/fix", ensureAuth, transactionController.updateInvalidDate);

module.exports = api;
