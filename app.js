var express = require('express');
var app = express();



app.get('/', function(request, response) {
    response.send('Hola desde el servidor express');
})

var user_routes = require('./routes/user');

app.use(express.urlencoded({extended: true})); //me permite leer el body encriptado


app.use('/', [
    user_routes
])

module.exports=app;