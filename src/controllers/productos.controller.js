const producto = require('../models/producto.model');


const obtenerProductos = async (req,res) => {
    try {
        const productos = await producto.find();
        res.json(productos)
    } catch (error) { res.status(404).json(error); }
};

const crearProducto = async (req, res) => {
    const { nombre, precio } = req.body;
    try {
        if (nombre && precio) {
            const ProductoRepetido = await producto.findOne({ nombre });
            if (ProductoRepetido) {
                res.status(400).json('El Producto ya existe');
            } else {
                const productoNuevo = new producto({
                    nombre,
                    precio
                 })
                 await productoNuevo.save();
                res.status(201).json(productoNuevo);
            }
        } else { res.status(400).json({ msg: 'Faltan datos' }); }
    } catch (error) { res.status(404).json(error); }
};

const actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, precio } = req.body;
        if (nombre && precio) {
            const updates = { ...req.body };
            const options = { new: true };
            await producto.findByIdAndUpdate(id, updates, options);
            res.status(200).json("producto actualizdo exitosamente");
        }
        else { res.status(400).json({ msg: 'Faltan datos' }); }
    } catch (error) { res.status(404).json("internal error server"); }
};

const eliminarProductos = async (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            await producto.findByIdAndDelete(id);
            res.status(200).json({msg: 'El producto fue eliminado con exito' });
        } else { res.status(400).json({ msg: 'Faltan datos' }); }
    } catch (error) { res.status(404).json("no se encontro el producto"); }
}
module.exports = {obtenerProductos,crearProducto,actualizarProducto,eliminarProductos};