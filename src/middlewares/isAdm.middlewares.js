const usuarios = require("../models/usuario.model");
const jwt = require('jsonwebtoken');
const {obtenerConfig} = require("../config");

const esAdministrador = async (req, res, next) =>
{
    const bearerHeader = req.headers['authorization'];
    if(bearerHeader!== undefined){
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    //Decodificar el token
    const decoded = await jwt.verify(token, obtenerConfig().secret);
    const UsuarioAdministrador = await usuarios.findById(decoded.id);
    if(UsuarioAdministrador.administrador === true)
    {
        next();
    }
    else { 
        return res
        .status(401)
        .send({ auth: false, msg: "el ususario no esta autorizado" }); 
    }}else{res.status(400).json("por favor inicie sesion para continuar")}
};

module.exports = esAdministrador;