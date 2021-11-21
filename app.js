var express = require('express');
var app = express();
var cors = require('cors');

<<<<<<< HEAD
//permitir peticiones cross origin request
app.use(cors());
=======
app.use(cors()); // para permitir peticiones desde puerto 3000
app.use(express.json()) // para parsear automaticamente los json
>>>>>>> 794d68e228657f559610bb914dd982a3861ba5b8

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