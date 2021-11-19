var express = require('express');

var userController = require('../controllers/user');

var api = express.Router(); //(creo que es la prpiedad de express de por rutiar las funciones)

api.post('/add-user', userController.addUser);

api.get('/user/:id', userController.getUser);

api.get('/users', userController.getUsers);


module.exports = api;