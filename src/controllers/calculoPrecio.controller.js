const producto = require('../models/producto.model');
const pedido = require('../models/pedido.model')

async function calcularPrecio(n, nombres, cantidades,Agregar) {
    const vector = await producto.find({nombre: {$in: nombres}});
    const prices = vector.map(p => p.precio);
    //const buscarPedido = pedido.findById(idPedido);

    let precios=[];
    for (let index = 0; index < n; index++) {
        let p = prices[index];
        precios.push(p);
    }

    let precio=0;
    for (let d = 0; d < n; d++) 
    {
        let Q = cantidades[d]*precios[d];
        precio=precio+Q;   
    }
    return precio;
}
module.exports = calcularPrecio;