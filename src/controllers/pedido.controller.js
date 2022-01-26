const pedido = require('../models/pedido.model');
const producto = require('../models/producto.model')
const calcularPrecio = require('../controllers/calculoPrecio.controller');
const usuario = require('../models/usuario.model');
const mediosPago = require('../models/mediosPago.model');
const jwt = require('jsonwebtoken');
const {obtenerConfig} = require("../config");

const obtenerPedidos = async (req, res) => {
    try {
        const pedidos = await pedido.find();
        if(pedidos) { res.json(pedidos) }
        else {res.status(400).json({msg: 'Faltan Datos'})}
    } catch (error) { res.status(404).json(error); }
};

const crearPedido = async (req, res) =>{
    try {
        const bearerHeader = req.headers['authorization'];
        if(bearerHeader)
        {
            const bearer = bearerHeader.split(" ");
            const token = bearer[1];
    
            //Decodificar el token
            const decoded = await jwt.verify(token, obtenerConfig().secret);
            const id = decoded.id;
            const user = await usuario.findById(id);
            
            const emailUsuario = user.correo;
            const direccion = user.direccion;
            const {medioPago} = req.body
            const inicioPedido = new pedido({ emailUsuario, direccion,medioPago});
            await inicioPedido.save();
            res.status(201).json(inicioPedido);
        }
        else { res.status(401).send({ auth: false, msg: "Ha olvidado el token" }); }
    } catch (error) { res.status(404).json(error); }
};

const anadirProductos = async (req, res) =>
{
    try {
        const {nombres, cantidades, newEstado} = req.body;

        if(nombres && cantidades){
            const Agregar = await pedido.findById(req.params.id);
            if(Agregar.estado=="Abierto"){
            const n = cantidades.length;
            const precio = await calcularPrecio(n, nombres, cantidades,Agregar);
            Agregar.productos.push({nombres,cantidades,precio});
            Agregar.estado = newEstado? newEstado:Agregar.estado
                await Agregar.save();
            let total = 0
            for(i in Agregar.productos){            
                total+=Agregar.productos[i].precio;
            }
            res.status(201).json('los productos se añadieron correctamente, su nuevo precio es: '+total)}
            else{res.status(400).json("el pedidio ya esta cerrado por favor cree un nuevo pedido")}
        } else {res.status(400).json({msg: 'Faltan Datos'}); }
    } catch (error) { res.status(404).json(error); }
};
/*const elimiinarProductos = async (req, res)=>{
    try{
        const buscarPedido = await pedido.findById(req.params.id)
        const{nombre} = req.body;
        if(buscarPedido && nombre){
            buscarPedido.findOneAndDelete(nombre)
            res.status(201).json('el usuario se ha eliminado exitosamente')
        }else{res.status(400).json({msg: 'no se ha podido eliminar el producto'})}

    }catch(error){res.status(404).json(error)}
}*/

const actualizarPedido = async (req, res) => {
    try {
        const {newDireccion, newMedioPago, newEstado} = req.body;
        id = req.params.id;
        const actualizar = await pedido.findById(id);
        if(actualizar) {
            const state = actualizar.estado;
            if(state=="Abierto"){
                actualizar.estado = newEstado? newEstado:actualizar.estado;
                actualizar.direccion = newDireccion? newDireccion:actualizar.direccion;
                actualizar.medioPago = newMedioPago? newMedioPago:actualizar.medioPago;
                await actualizar.save();
                res.status(200).json({msg: 'Pedido actualizado con exito'}); 
            } else {res.status(400).json({msg: 'los pedidos cerrados no se pueden actualizar'}); }
        } else {res.status(400).json({msg: 'no se encontro el pedido'}); }    
    } catch (error) { res.status(404).json(error); }
};
  
const actualizarEstado = async (req, res) =>{
    const {newEstado} = req.body
    id = req.params.id;
    const actualizar = await pedido.findById(id);
    if(actualizar){
        const state = actualizar.estado;
        if(state !=="Abierto"){
            actualizar.estado = newEstado? newEstado:actualizar.estado;
            await actualizar.save();
            res.status(200).json({msg: 'estado del pedido actualizado con exito'}); 
        } else {res.status(400).json({msg: 'el pedido aun sigue abierto, por favor espere a que se cierre'}); }
    }else {res.status(400).json({msg: 'no se encontro el pedido'}); }  
}
const eliminarPedidos = async (req, res) => {
    try {
        const { id } = req.params;
        await pedido.findByIdAndDelete(id);
        res.status(200).json({msg: "Pedido eliminado con exito"});    
    } catch (error) { res.status(404).json(error); }
}

module.exports = {obtenerPedidos,crearPedido,actualizarPedido,anadirProductos,eliminarPedidos, actualizarEstado}