var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;

const ensureAuth = (req, res, next) => {

    if(!req.headers.authorization) {
        return res.status(401).send({ ok: false, msg: 'Authorization FAIL: Token null'})
    }
    const token = req.headers.authorization.replace('Bearer ',''); //obtenemos solo
    jwt.verify(token, SEED, (error, jwtDecoded) => {    //el tercer parametro es una función de callback. Esto es: envío el token y la semilla, si es satisfactorio, obtengo un token decodificado y sino me devuelve un error
        if(error) return res.status(500).send({
            ok: false,
            msg: 'Autorización incorrecta', //sería "error en el token de autorización" pero no le doy tanta info al usuario
            error
        });
        req.user = jwtDecoded; //sobreescribo el req.user 
        // //console.log('Pasa a la siguiente funcion o endopoint')
        next();  //hago que pase al endpoint siguiente
    });
    // next();
}

module.exports = ensureAuth;