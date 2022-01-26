const express = require("express");
require("./db");
const helmet = require('helmet')
const swaggerJsDoc = require("swagger-jsdoc")
const swaggerOptions = require("./utils/swaggerOptions")
const {obtenerConfig} = require("./config");
const swaggerUI = require("swagger-ui-express")
const PORT = obtenerConfig().port;
const usuarioRoutes = require("./routes/usuario.route");
const productoRoutes = require("./routes/producto.route"); 
const pedidosRoutes = require("./routes/pedidos.route");
const mediosPagoroutes = require("./routes/mediosPago.route")
const app = express();
app.use(express.json());

const cspDefaults = helmet.contentSecurityPolicy.getDefaultDirectives();
delete cspDefaults["upgrade-insecure-requests"];
app.use(helmet({
    contentSecurityPolicy:{directives:cspDefaults}
}));

const swaggerSpecs = swaggerJsDoc(swaggerOptions)
app.use("/api-docs", swaggerUI.serve,swaggerUI.setup(swaggerSpecs))
app.use("/usuarios",usuarioRoutes);
app.use("/mediosPago",mediosPagoroutes)
app.use("/productos",productoRoutes);
app.use("/pedidos",pedidosRoutes);


app.listen(PORT, () => {console.log('escuchando en el puerto ' + PORT)})



module.exports = app;
