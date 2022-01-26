const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index")
const Usuario = require("../models/usuario.model")
chai.should();
chai.use(chaiHttp);

describe("registro de usuario", ()=>{

    describe('POST/registrar de forma exitosa', ()=>{
        it('debe devolver un 201 en status', (done)=>{
            const usuario = {
                nombre:"test",
                apellido:"test",
                correo:"test@test.com",
                telefono:"test",
                direccion:"test",
                contraseña:"test",
                administrador:false
            };
            chai.request(app)
                .post("/usuarios/nuevos")
                .send(usuario)
                .end((err,response)=>{
                    response.should.have.status(201);
                    done();
                })
        })
        after(async ()=>{
            await Usuario.deleteOne({correo:"test@test.com"});
        })
    })
})