const express = require("express");
const esAdministrador = require("../middlewares/isAdm.middlewares");
const router = express.Router();
const  {obtenerUsuarios,crearUsuario,inicioSesion,eliminarUsuarios} = require("../controllers/usuarios.controller");


/**
 * @swagger
 * /usuarios/nuevos:
 *  post:
 *      security: []
 *      summary: Crea un usuario en el sistema
 *      tags: [Usuarios]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/postUsuario'
 *      responses:
 *          201:
 *              description: Usuario creado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/getUsuario'
 *          400:
 *              description: el usuario ya existe o falta informacion para crearlo.
*/

router.post('/nuevos', crearUsuario);



/**
 * @swagger
 * /usuarios/Login:
 *  post:
 *      summary: permite ingresar al usuario con su correo y contrasena y muestra su id si se encuentra registrado.
 *      tags: [Usuarios]
 *      security: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/login'
 *      responses:
 *          201:
 *              description: Usuario creado
 *          400: 
 *              description: Entradas inválidas
 *          404: 
 *              description: no se encuentra registrado
 *          401:
 *              description: usuario y contrasena incorrectos
 */

router.post('/Login', inicioSesion);

/**
 * @swagger
 * /usuarios/Eliminar/{userId}:
 *  delete:
 *      summary: el administrador puede eliminar la cuenta de un usario con el id.
 *      tags: [Usuarios]
 *      parameters:
 *        - in: path
 *          name: userId
 *          description: ID de un usuario
 *          required: true
 *          schema:
 *              type: string
 *              example: 612a4fa3addaf83804
 *      responses:
 *          200:
 *              description: Usuario eliminado exitosamente
 *          400:
 *              description: no se encontro el usuario.
 *          401:
 *              description: el usuario no esta autorizado o no ha inicado sesion en su cuenta
 * */

router.delete('/Eliminar/:id', esAdministrador, eliminarUsuarios);

/**
 * @swagger
 * /usuarios:
 *  get:
 *      summary: Obtener todos los usuarios del sistema si el usuario es administrador
 *      tags: [Usuarios]
 *      
 *      responses:
 *          200:
 *              description: Lista de usuarios del sistema
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/getUsuario'
 *          400:
 *              description: no ha iniciado sesion.
 *          401: 
 *              description: no esta autorizado.
 * 
*/

router.get('/', esAdministrador, obtenerUsuarios);

/**
 * @swagger
 * tags:
 *  name: Usuarios
 *  description: Seccion de usuarios
 * 
 * components: 
 *  schemas:
 *      getUsuario:
 *          type: object
 *          required:
 *              -email
 *              -contrasena
 *          properties:
 *              correo:
 *                  type: string
 *                  description: correo del usuario
 *              contrasena:
 *                  type: string
 *                  description: Contrasena del usuario
 *              nombre:
 *                  type: string
 *                  description: nombre del usuario.
 *              apellido:
 *                  type: string
 *                  description: apellido del usuario.
 *              telefono:
 *                  type: number
 *                  description: numero de telefono o celular del usuario.
 *              direccion:
 *                  type: string
 *                  description: direccion de residencia del usuario.
 *              administrador:
 *                  type: boolean
 *                  description: define si el usuario es adminitrador o no.   
 *              id: 
 *                  type: string
 *                  description: id del usuario                
 *          example:
 *              administrador: true/false
 *              id: 613f4f95c73ea2263486ef64    
 *              nombre: Hernan Dario
 *              apellido: cabrera
 *              correo: dario@gmail.com
 *              telefono: 3164567192
 *              direccion: calle100b#35-26
 *              contraseña: $2a$10$PI1SvUaqz4rUilgMvMCloeRV2.ipg6.fZguOFvfAY1ktOsC5ZdAIS
 *      postUsuario:
 *          type: object
 *          required:
 *              -correo
 *              -contrasena
 *          properties:
 *              usuario:
 *                  type: string
 *                  description: nombre de usuario
 *              nombre:
 *                  type: string
 *                  description: nombre y apellido completos
 *              correo: 
 *                  type: string
 *                  description: correo electronico
 *              telefono: 
 *                  type: string
 *                  description: numero de celular
 *              direccion:
 *                  type: string
 *                  description: direccion de residencia
 *              contrasena:
 *                  type: string
 *                  description: crear contrasena de usuario
 *          example:
 *              nombre: kathe
 *              apellido: cabrera
 *              correo: kathe@gmail.com
 *              telefono: 323234343
 *              direccion: aldana
 *              contraseña: kathe123
 *      login:
 *          type: object
 *          required:
 *              -correo
 *              -contrasena
 *          properties:
 *              correo:
 *                  type: string
 *                  description: correo del usuario
 *              contrasena:
 *                  type: string
 *                  description: contrasena del usuario
 *          example:
 *              correo: administrador@gmail.com
 *              contraseña: administrador123
 *                              
 *                              
 */



module.exports = router;