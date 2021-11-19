var express = require('express');

var transactionController = require('../controllers/transaction');

var api = express.Router();

api.post('/transaction', transactionController.addTransaction);

api.get('/transaction/:id/:name', transactionController.getTransaction);

api.delete('/transaction/:id', transactionController.delTransaction);

api.put('/transaction/:id', transactionController.updateTransaction);

api.get('/transactions', transactionController.getTransactions);
// api.delete('/transaction/:prop/:value')

module.exports = api;
