const mediosPago = require('../models/mediosPago.model');

const obtenerMediospago = async (req, res) => {
    try {
        const mediosdepago = await mediosPago.find();
        res.json(mediosdepago);
    } catch (error) { res.status(404).json(error); }
};

const crearMediospago = async (req, res) => {
    const { nombre } = req.body;
    try {
        if (nombre) {
            const mediosPagorepetido = await mediosPago.findOne({nombre});
            if (mediosPagorepetido) {
                res.status(400).json('El Medio de pago ya existe');
            } else {
                const NuevomediosPago = new mediosPago({ nombre });
                await NuevomediosPago.save();
                res.status(201).json(NuevomediosPago);
            }
        } else { res.status(400).json({ msg: 'por favor digite el nombre del pago a crear' }); }
    } catch (error) { res.status(404).json(error); }
};

const actualizarMediospago = async (req, res) => {
    try {
        const { nombre } = req.body;
        if (nombre) {
            const { id } = req.params;
            const updates = { ...req.body };
            const options = { new: true };
            await mediosPago.findByIdAndUpdate(id, updates, options);
            res.status(200).json({ msg: 'Medio de Pago editado con exito' });
        } else { res.status(400).json({ msg: 'Faltan datos' }); }
    } catch (error) { res.status(404).json(error); }
};

const eliminarMediospago = async (req, res) => {
    try {
        const { id } = req.params;
        await mediosPago.findByIdAndDelete(id);
        res.status(200).json({ msg: 'El medio de pago fue eliminado con exito' });
    } catch (error) { res.status(404).json(error); }
};
module.exports = {obtenerMediospago,crearMediospago,actualizarMediospago,eliminarMediospago}