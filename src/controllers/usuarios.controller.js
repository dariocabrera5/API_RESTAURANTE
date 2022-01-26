const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {obtenerConfig} = require("../config")
const usuario = require('../models/usuario.model');


const obtenerUsuarios = async (req, res) => {
    try {
        const user = await usuario.find();
        res.json(user);
    } catch (error) { res.status(404).json(error); }  
};

const crearUsuario = async (req, res) => {
    try {
        const { nombre, apellido, correo, telefono, direccion, contraseña, administrador } = req.body;
        if (nombre && apellido && correo && telefono && direccion && contraseña) {
            const usuarioRepetido = await usuario.findOne({ correo });
            if (usuarioRepetido) {
                res.status(400).json("El Correo ya existe en la base de datos");
            } else {
                if (administrador != false) {
                    const user = new usuario({
                        nombre,
                        apellido,
                        correo,
                        telefono,
                        direccion,
                        contraseña: bcrypt.hashSync(contraseña, 10),
                        administrador
                    });
                    await user.save();
                    res.status(201).json(user);
                } else {
                    const user = new usuario({
                        nombre,
                        apellido,
                        correo,
                        telefono,
                        direccion,
                        contraseña: bcrypt.hashSync(contraseña, 10)
                    });  
                    await user.save();
                    res.status(201).json(user);
                }
            }
        } else { res.status(400).json("Faltan datos"); }
    } catch (error) { res.status(404).json(error); } 
};

const inicioSesion = async (req, res) => {
        const { correo, contraseña } = req.body;
        if (correo && contraseña) {
            const user = await usuario.findOne({ correo: req.body.correo });
            if(user==null){
                return res.status(404).json("no se encuentra registrado")
            }else{
            const contraseña = await bcrypt.compare(req.body.contraseña, user.contraseña);
            if (!contraseña) {
                return res.status(401).json("la contraseña es incorrecta");
            } else {
                const token = jwt.sign({ id: user._id }, obtenerConfig().secret, {
                    expiresIn: 60 * 60 * 24,
                });
                res.status(200).json({ auth: true, token });
            }
        }}
        else { res.status(400).json('entradas invalidas'); }
    }

const eliminarUsuarios = async (req, res) => {
    try {
        const { id } = req.params;
        if(id) {
            await usuario.findByIdAndDelete(id);
            res.status(200).json({msg: "El Usuario fue eliminado con exito"});
        } else { res.status(400).json({msg: 'Faltan datos'}); } 
    } catch (error) { res.status(404).json("no se encontro el usuariio"); } 
};

module.exports = {obtenerUsuarios,crearUsuario,inicioSesion,eliminarUsuarios}