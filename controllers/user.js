var User = require('../models/user');
var bcrypt = require('bcrypt');


async function addUser (req, res) {

    if(!req.body.password || !req.body.email || !req.body.name) { //chequeamos si los datos que son requeridos obligtoriamente vienen en la requets
        return res.status(400).send({
            ok:false,
            msg:'Debe enviar todos los campos requeridos'
        })
    }

    let user = new User (req.body);
    user.email = req.body.email.toLowerCase();

    bcrypt.hash(user.password, salt, (error, hash) => {
        if (error) return res.status(500).send({
            ok:false,
            msg:'Error al guardar usuario',
            error
        });

        if (hash) {
            user.password = hash;
            user.save((error,user) => { 
                    if (error) return res.status(500).send({
                        ok: false,
                        msg: 'Error al crear usuario',
                        error
                    });
                    if (!user) return res.status(404).send({
                        ok: false,
                        msg: ' no se pudo crear el usuario',
                    })
                    user.password = undefined;
                    return res.status(200).send({
                        ok:true,
                        msg:'Usuario creado CORRECTAMENTE de la DB',
                        user
                    })
            });
        }
    })
}

function getUser(req, res) {
    // Si no me envian ID de usuario a buscar, devuelvo error por que no voy a saber de quien es que hay que buscar datos
    if (!req.params.id) {
        return res.status(401).send({
            ok: false,
            msg: 'Debe enviar un id'
        })
    }

    // Si el usuario es un cliente y el id que quiere consultar datos de la persona no son los de el, no puedo dejar pasar
    if (req.user.role === 'STUDENT_ROLE' && req.user._id !== req.params.id) {
        return res.status(401).send({
            ok: false,
            msg: 'No tiene permisos para acceder a la información de este usuario'
        })
    }

    const id = req.params.id;

    // llamada a la DB users
    User.findById(id, (error, user) => {
        if (error) return res.status(500).send({
            ok: false,
            msg: 'Error al obtener usuario',
            error
        });
        if (!user) return res.status(404).send({
            ok: false,
            msg: 'Usuario NO encontrado',
            user
        })
        return res.status(200).send({
            ok: true,
            msg: 'Usuario obtenido CORRECTAMENTE de la DB',
            user
        })
    })
}

async function getUsers(req, res) {
    //LLMADA A LA BD
    let users = await User.find ({ });
    const total = users.length;
    const per_page = 2;
    const total_pages = Math.ceil(total/per_page);

    res.status(200).send({
        ok: true,
        msg: 'Se obtuvieron los usuarios',
        users,
        total,
        per_page,
        total_pages
    })
}


module.exports = {
    addUser,
    getUser,
    getUsers
}