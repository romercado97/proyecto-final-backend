var mongoose = require ('mongoose');

const Schema = mongoose.Schema;

var CourValidos = [
    'LOGICA',
    'PROGRAMACION 1',
    'BASES DE DATOS RELACIONALES',
    'HTML',
    'CSS'
]
const CourseSchema = new Schema ({

    cursos: {type: String, required: true, enum: CourValidos},
    alumnos:{type: String}
})


module.exports = mongoose.model('Course', CourseSchema);