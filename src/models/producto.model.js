const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    descripcion:{
        type: String
    }
});
module.exports = mongoose.model('productos', productoSchema)
/*const productos = [{
    nombre:"cocacola",
    precio:2600,
    descripcion:"bebida gaseosa",
    id:1
},
{
    nombre:"cerveza",
    precio: 4000,
    descripcion:"bebida alcoholica",
    id:2
},
{
    nombre:"bandeja paisa",
    precio: 12000,
    descripcion:"bandeja con arroz, frijol, chicharron, carne molida, platano maduro, huevo,aguacate",
    id:3
},
{
    nombre:"churrasco",
    precio: 10000,
    descripcion:"carne, papas a la francesa, chimichurri, papa asada, arepa",
    id:4
},
{
    nombre:"sancocho",
    precio: 8000,
    descripcion:"sancocho de gallina, porcion de arroz, arepa ",
    id:5
},
{
    nombre:"hamburguesa",
    precio: 10000,
    description:"tocineta, queso....",
    id:6
}
]

const obtenerProductos = ()=>{
    productos.forEach(p=>{delete p.cantidad})
    return productos
}

const agregarProductos = (productoNuevo)=>{
    const existe = productos.some(producto => producto.nombre == productoNuevo.nombre);
    const indice = productos.length
        if(existe){
             return false
        }else{
            productoNuevo.id = indice +1;
            productos.forEach(u => {
                if(u.id == productoNuevo.id){
                    productoNuevo.id+=1
                }
                else{
                    productoNuevo.id = productoNuevo.id
                }
            })
            productos.push(productoNuevo);
            return productoNuevo
        } 
}

const editarProductos = (id,nuevoProducto) =>{
    const modificarProducto = productos.find(p => p.id == parseInt(id));
    if (modificarProducto){
        modificarProducto.nombre = nuevoProducto.nombre?nuevoProducto.nombre:modificarProducto.nombre
        modificarProducto.precio = nuevoProducto.precio?nuevoProducto.precio:modificarProducto.precio
        modificarProducto.descripcion = nuevoProducto.descripcion?nuevoProducto.descripcion:modificarProducto.descripcion       
        return modificarProducto
            }
    else{
        return false
    }
} 
const eliminarProductos = (id)=>{
    const indice = productos.findIndex(p => p.id===parseInt(id))
    if(indice!==-1){
        productos.splice(indice,1)
        return true
    }else{
        false
    }
}

module.exports = {obtenerProductos,agregarProductos,editarProductos,eliminarProductos}*/