const jwt = require('jsonwebtoken');
const SEED = require('../config/config').SEED;

function generateJWT(user) {
    // Generar token basado en objeto usuario logueado
    return new Promise((resolve, reject) => {
        jwt.sign(
            user.toJSON(), //Payload
            SEED, //Semilla o privateKey
            {expiresIn: (60*60*24), algorithm: 'HS512'}, //Options
            (error, token) => {
                if(error) {
                    // Deniego la promesa y envío un error
                    console.log(error)
                    reject(error);
                } 
                console.log(token)
                // Resuelvo la promisa satisfactoriamente y devuelvo el token
                resolve(token)
            }
        )
    })
    
}


module.exports = {
    generateJWT
}