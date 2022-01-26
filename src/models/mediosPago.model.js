const mongoose = require("mongoose");

const MediodePagoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model("medios de pago",MediodePagoSchema);
/*
    {
        nombre: "efectivo",
        id:1
    },
    {
        nombre:"nequi",
        id:2
    },
    {
        nombre:"daviplata",
        id:3
    }

]

const obtenerMediospago = () =>{
    return mediosPago
}



const crearMediospago = (nuevoMediopago) =>{
    const indice = mediosPago.length
    nuevoMediopago.id = indice +1;
    mediosPago.forEach(u => {
        if(u.id == nuevoMediopago.id){
            nuevoMediopago.id+=1
        }
        else{
            nuevoMediopago.id = nuevoMediopago.id
        }
    })
    mediosPago.push(nuevoMediopago);
    return true
}

const editarMediospago = (id, nuevoEstado) =>{
    const modificarMediospago = mediosPago.find(p => p.id == parseInt(id));
    console.log(id,modificarMediospago)
    if (modificarMediospago){
        modificarMediospago.nombre=nuevoEstado.nombre
        return true, modificarMediospago
    }
    else{
        return false
    }
}

const borrarMediospago = (id) => {
    const buscarIndice = mediosPago.findIndex(m => m.id == parseInt(id));
    if(buscarIndice!==-1){
        mediosPago.splice(buscarIndice,1)
        return true
    }
    else if(buscarIndice===-1){
        return "noExiste"
    }
    else{
        false
    }
}

module.exports = {obtenerMediospago, crearMediospago, editarMediospago, borrarMediospago}*/