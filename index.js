const mongoose = require('mongoose');
const password = require('./config/config').MONGOPASS;  
const app = require('./app');
var PORT = 3001;

const URL = `mongodb+srv://proyectofinalro:${password}@prueba.1xmst.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

//funcion que conecta con la base de datos
(async function con(){
    try {
        await mongoose.connect (URL, {});
        console.log('La conexión a la base de datos se realizó correctamente');
        app.listen(PORT, () => {
            console.log(`servidor ejecutandose en el puerto: ${PORT}`);
        });
    }
    catch(err) {
            console.log('Error al conectar la BD', err);
    }
})();

