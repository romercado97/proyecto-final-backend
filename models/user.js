var mongoose = require ('mongoose');

const Schema = mongoose.Schema;

var rolesValidos = [
    'STUDENT_ROLE',
    'TEACHER_ROLE',
    'ADMIN_ROLE'
]
const UserSchema = new Schema ({
    name: {type:String, required: true},
    // surname: {type: String, required: true},
    id:{type: Number, required:true},
    email:{type:String, required: true, unique:true},
    password:{type: String, required: true},
    dir: String,
    dir_num: Number,
    role: {type: String, required: true, enum: rolesValidos},
    //avatar: { type: String, default: 'default.png'}
})


module.exports = mongoose.model('User', UserSchema);