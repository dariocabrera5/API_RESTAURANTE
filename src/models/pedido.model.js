const mongoose = require("mongoose");

const pedidoSchema = new mongoose.Schema({
    emailUsuario: {
        type: String,
        required: true
    },
    direccion: String,
    productos: [{
        nombres: {
            type: Array,
            required: true
        },
        cantidades: {
            type: Array,
            default:1
        },
        precio: {
            type: Number,
            required: true
        }
    }],
    medioPago: {
        type: String,
        required:true
    },
    estado: {
        type: String,
        required: true,
        default: 'Abierto'
    }
});

module.exports = mongoose.model("pedidos",pedidoSchema);

/*const { obtenerMediospago } = require("./mediosPago.model")
const { obtenerProductos } = require("./producto.model")
const { obtenerUsuarios } = require("./usuario.model")

const pedidos = [
    {
        medioPago:"efectivo",
        direccion:"cra4 #11-23",
        producto: [ {
            id: 1,
            nombre: "cocacola",
            precio: 2600,
            descripcion: "bebida gaseosa",
            cantidad: 1
        },
        {
            id:2,
            nombre:"cerveza",
            precio: 4000,
            descripcion:"bebida alcoholica",
            cantidad:2
        }],
        correo:"dario@gmail.com",
        estado:"cerrado",
        id:1
    },
    {
        medioPago:"efectivo",
        direccion:"cra4 #11-23",
        producto: [ {
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
        }],
        correo:"kathe@gmail.com",
        estado:"cerrado",
        id:2
    }
]

const obtenerPedidos = () =>{
    const pedidosCerrados = pedidos.filter(p=> p.estado!=="abierto")
    if(pedidosCerrados){
        return pedidosCerrados
    }
    else{
        return false
    }
}

const agregarPedidos = (pedidoNuevo,correo)=>{
    const buscar =obtenerUsuarios().find(u => u.correo === correo)
    const pedidoAbierto= pedidos.some(p => p.estado === "abierto" && p.correo==correo)
    const buscarMediopago = obtenerMediospago().find(m => m.id == pedidoNuevo.medioPago)
    const indiceId = pedidos.length
    if(buscarMediopago===undefined){
        return "medioPagonoExiste"
    }else{    
    if(pedidoAbierto===false){
        if(pedidoNuevo){
            pedidoNuevo.producto =[]
            pedidoNuevo.correo = buscar.correo;
            pedidoNuevo.estado="abierto"
            pedidoNuevo.medioPago = buscarMediopago.nombre
            pedidoNuevo.id = indiceId + 1;
            buscar.correo = pedidoNuevo.correo? pedidoNuevo.correo:buscar.correo;
            if(pedidoNuevo.direccion==""){
                pedidoNuevo.direccion=buscar.direccion
            }else{
            pedidoNuevo.direccion=pedidoNuevo.direccion
            }
            pedidos.forEach(u => {
                if(u.id == pedidoNuevo.id){
                    pedidoNuevo.id+=1
                }
                else{
                    pedidoNuevo.id = pedidoNuevo.id
                }
            })
            pedidos.push(pedidoNuevo);
            return true, pedidoNuevo
        }
        else{
            return false
        }
    }
    else{
        return "existePedidoabierto"
    }}
} 

const calcularPrecios= (pedidoExiste,buscarProducto,Producto)=>{
    const productoPedidoExiste = pedidoExiste.producto;
    productoPedidoExiste.push(buscarProducto)
    let total = 0;
    
    productoPedidoExiste.forEach(p =>{
        if(p.id===Producto.idproducto && p.cantidad==Producto.cantidad){
            p.id = buscarProducto.id
            p.nombre = buscarProducto.nombre
            p.precio = buscarProducto.precio
            p.cantidad = Producto.cantidad
        }
        else{
            p.cantidad = Producto.cantidad
        }
    })
    for(i in productoPedidoExiste){
    total+=productoPedidoExiste[i].precio*productoPedidoExiste[i].cantidad;
    }
    pedidoExiste.estado = Producto.estado? Producto.estado:pedidoExiste.estado
    return total
}

const anadirProductos = (Producto, correo)=>{
    const buscarProducto = obtenerProductos().find(p => p.id == Producto.idproducto)
    const pedidoExiste = pedidos.find(p => p.estado ==="abierto" && p.correo == correo)
    if(buscarProducto){
        if(pedidoExiste){  
            return calcularPrecios(pedidoExiste,buscarProducto,Producto)
        }
        else{
            return false
        }
    }
    else{
        return "productonoexiste"
    }
}

const historialPedidos = (correo)=>{
    const buscar = pedidos.filter(p=>p.correo==correo)
    if (correo && buscar){
        return buscar
    }else{
        return false
    }
}

const cambiarEstadopedidos = (id,nuevoEstado)=>{
    const buscarPedido = pedidos.find(p => p.id==parseInt(id))
    if(buscarPedido && buscarPedido.estado =="cerrado"||buscarPedido.estado==="confirmado"|| buscarPedido.estado==="entregado"||buscarPedido.estado==="preparando"||buscarPedido.estado ==="enviando"||buscarPedido.estado==="cancelado"){
        if(nuevoEstado.estado==="confirmado"|| nuevoEstado.estado==="entregado"||nuevoEstado.estado==="preparando"||nuevoEstado.estado ==="enviando"||nuevoEstado.estado==="cancelado"){
        buscarPedido.estado = nuevoEstado.estado? nuevoEstado.estado:buscarPedido.estado;
        return true, buscarPedido
        }else{
            return "el nuevo estado no es valido"
        }
    }
    else{
        return false
    }
}

const borrarPedido = (id,correo) => {
    const buscar = pedidos.findIndex(p => p.id === parseInt(id))
     if(buscar !== -1 && pedidos[buscar].estado ==="abierto" && pedidos[buscar].correo==correo){
        pedidos.splice(buscar,1)
        return true 
    }else{
        return false
    }
}
module.exports = {obtenerPedidos,agregarPedidos,anadirProductos,historialPedidos,cambiarEstadopedidos, borrarPedido}*/