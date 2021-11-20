var express = require('express');

var userController = require('../controllers/user');

var api = express.Router(); //(creo que es la prpiedad de express de por rutiar las funciones)

var ensureAuth = require('../middlewares/authentication');

api.post('/add-user', ensureAuth, userController.addUser);

api.get('/user/:id', ensureAuth,userController.getUser);

api.get('/users', ensureAuth,  userController.getUsers);

//user login
api.post('/login', userController.login);


module.exports = api;