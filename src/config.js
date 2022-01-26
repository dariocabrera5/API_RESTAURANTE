const config = {
    secret: "mysecretkey",
    port: process.env.PORT||5000,
};
const obtenerConfig = ()=>{
    return config
}
module.exports = {obtenerConfig}
