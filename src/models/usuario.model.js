const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    contraseña: {
        type: String,
        required: true
    },
    administrador: {
        type: Boolean,
        default: false
    }
});
module.exports = mongoose.model("usuarios",usuarioSchema);