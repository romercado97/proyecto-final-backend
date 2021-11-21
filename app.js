var express = require('express');
var app = express();
var cors = require('cors');

//permitir peticiones cross origin request
app.use(cors());

app.get('/', function(request, response) {
    response.send('Hola desde el servidor express');
})

var user_routes = require('./routes/user');
var transaction_routes = require('./routes/transaction');

app.use(express.urlencoded({extended: true})); //me permite leer el body encriptado


app.use('/api', [
    user_routes,
    transaction_routes,
])

module.exports = app;