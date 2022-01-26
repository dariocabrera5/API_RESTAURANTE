const express = require("express");
const esAdministrador = require("../middlewares/isAdm.middlewares");
const router = express.Router();
const verificar = require('../middlewares/token.middkeware');
const {obtenerPedidos,crearPedido,actualizarPedido,anadirProductos,eliminarPedidos,actualizarEstado} = require('../controllers/pedido.controller')


/**
 * @swagger
 * /pedidos:
 *  get:
 *      summary: Obtener todos los pedidos creados si el usuario es administrador.
 *      tags: [Pedidos]
 *      
 *      responses:
 *          200:
 *              description: Lista de pedidos todos los usuarios.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/getHistorialpedidos'
 *          400:
 *              description: no se encontraron pedidos.
 *          401:
 *              description: el usuario no esta autorizado o no ha iniciado sesion.
*/

router.get('/', esAdministrador, obtenerPedidos)

/**
 * @swagger
 * /pedidos/crear:
 *  post:
 *      summary: crea un nuevo pedido en el sistema
 *      tags: [Pedidos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/postPedidos'
 *      responses:
 *          201:
 *              description: pedido creado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/getpedidos'
 *          400:
 *              description: no se pudo crear el pedido por falta de informacion.
 *          401:
 *              description: el usuario no esta autorizado o no ha iniciado sesion.
 * */

router.post('/crear', verificar, crearPedido);

/**
 * @swagger
 * /pedidos/anadirProductos/{id_pedido}:
 *  post:
 *      summary: agrega un producto a un pedido abierto
 *      tags: [Pedidos]
 *      parameters:
 *        - in: path
 *          name: id_pedido
 *          description: ID del pedido a eliminar
 *          required: true
 *          schema:
 *              type: string
 *              example: 613f70556cb1a3279046c24b
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/postPedidosproducto'
 *      responses:
 *          201:
 *              description: los productos se añadieron correctamente su nuevo precio es xxxx
 *          400:
 *              description: no se pudo añadir el producto por falta de informacion.
 *          401:
 *              description: el usuario no esta autorizado o no ha iniciado sesion.
 * */

router.post('/anadirProductos/:id', verificar, anadirProductos);

/**
 * @swagger
 * /pedidos/editar/{pedidoId}:
 *  put:
 *      summary: actualiza un pedido por ID si el pedido esta abierto.
 *      tags: [Pedidos]
 *      parameters:
 *        - in: path
 *          name: pedidoId
 *          description: ID del pedido a editar
 *          required: true
 *          schema:
 *              type: string
 *              example: 612a80f6a5dbbf45b8da4fff
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/putPedido'
 *      responses:
 *          200:
 *              description: pedido editado exitosamente
 *          400:
 *              description: no se encontro el pedido o el pedido ya esta cerrado.
 *          401:
 *              description: el usuario no esta autorizado o no ha iniciado sesion.
 * */

router.put('/editar/:id', verificar, actualizarPedido);

/**
 * @swagger
 * /pedidos/editarEstado/{pedidoId}:
 *  put:
 *      summary: actualiza el estado de un pedido por ID si el usuario es administrador.
 *      tags: [Pedidos]
 *      parameters:
 *        - in: path
 *          name: pedidoId
 *          description: ID del pedido a editar
 *          required: true
 *          schema:
 *              type: string
 *              example: 612a80f6a5dbbf45b8da4fff
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/putEstado'
 *      responses:
 *          200:
 *              description: pedido editado exitosamente
 *          400:
 *              description: no se encontro el pedido o el pedido ya esta cerrado.
 *          401:
 *              description: el usuario no esta autorizado o no ha iniciado sesion.
 * */


router.put('/editarEstado/:id', esAdministrador,actualizarEstado)
/**
 * @swagger
 * /pedidos/eliminar/{pedidoId}:
 *  delete:
 *      summary: elimina un pedido por ID si el pedido esta abierto.
 *      tags: [Pedidos]
 *      parameters:
 *        - in: path
 *          name: pedidoId
 *          description: ID del pedido a eliminar
 *          required: true
 *          schema:
 *              type: string
 *              example: 612bbc71f54c024524f51e92
 *      responses:
 *          200:
 *              description: pedido eliminado exitosamente
 *          400:
 *              description: no se encontro el pedido.
 *          401:
 *              description: el usuario no esta autorizado o no ha iniciado sesion.
 * */

router.delete('/eliminar/:id', verificar, eliminarPedidos);

/**
 * @swagger
 * tags:
 *  name: Pedidos
 *  description: Seccion de Pedidos
 * 
 * components: 
 *  schemas:
 *      getHistorialpedidos:
 *          type: object
 *          required:
 *              -email
 *              -contrasena
 *          properties:
 *              contrasena:
 *                  type: string
 *                  description: Contrasena del usuario
 *              medioPago:
 *                  type: string
 *                  description: medio de pago del pedido.
 *              direccion:
 *                  type: string
 *                  description: direccion de envio del pedido.
 *              producto:
 *                  type: array
 *                  description: productos seleccionados por el usuario.
 *              correo:
 *                  type: string
 *                  description: correo del usuario que realizo el pedido.
 *              estado:
 *                  type: string
 *                  description: estado del pedido.
 *              id:
 *                  type: string
 *                  description: ID del pedido
 *          example:    
 *              medioPago: efectivo
 *              direccion: cra4 #11-23
 *              producto:
 *                  nombre: cocacola
 *                  precio: 2600
 *                  descripcion: bebida gaseosa
 *                  id: 1
 *                  cantidad: 1
 *              correo: dario@gmail.com
 *              estado: cerrado
 *              id: 1
 *      getpedidos:
 *          type: object
 *          required:
 *              -email
 *              -contrasena
 *          properties:
 *              medioPago: 
 *                  type: string
 *                  description: medio de pago del pedido.
 *              direccion: 
 *                  tyoe: string
 *                  description: direccion de envio del pedido
 *              producto:
 *                  type: array
 *                  description: lista de productos del pedido
 *              correo:
 *                  type: string
 *                  description: Email del usuario que realizo el pedido.
 *              estado:
 *                  type: string
 *                  description: estado del pedido.
 *              id:
 *                  type: string
 *                  description: ID del pedido.
 *          example: 
 *              estado: abierto/cerrado
 *              id: 612a80f6a5dbbf45b8da4fff 
 *              emailUsuario: user@gmail.com  
 *              medioPago: efectivo
 *              direccion: cra4 #11-23
 *              producto: []
 *      postPedidos:
 *          type: object
 *          required:
 *              -correo
 *              -contrasena
 *          properties:
 *              medioPago:
 *                  type: number
 *                  description: ID del medio de pago que desea seleccionar.
 *              direccion:
 *                  type: string
 *                  description: direccion del pedido, este campo es opcional, si no se llena se tomara la direccion ingresada en el registro                 
 *          example:
 *              medioPago: efectivo
 *              direccion: "Calle 38 # 77-31"
 *      postPedidosproducto:
 *          type: object
 *          required:
 *              -correo
 *              -contrasena
 *          properties:
 *              nombres:
 *                  type: array
 *                  description: nombre del producto a agregar.
 *              cantidades:
 *                  type: array
 *                  description: cantidad del producto a agregar
 *              newEstado:
 *                  type: string
 *                  description: estado del pedido                 
 *          example:
 *              nombres: ["perro caliente","salchipapa"]
 *              cantidades: [2,2]
 *              newEstado: cerrado
 *      putEstado:
 *          type: object
 *          required:
 *              correo:
 *              contrasena:
 *          properties:
 *              newEstado:
 *                  type: string
 *                  description: nuevo estado del  pedido
 *          example:
 *              newEstado: confirmado
 *      putPedido:
 *          type: object
 *          required:
 *              correo:
 *              contrasena:
 *          properties:
 *              newEstado:
 *                  type: string
 *                  description: nuevo estado del  pedido
 *              newDireccion:
 *                  type: string
 *                  description: nueva direccion del pedido
 *              newMedioPago:
 *                  type: string
 *                  description: nuevo medio de pago del pedido
 *          example:
 *              newEstado: confirmado
 *              newDireccion: pasto
 *              newMedioPago: efectivo  
 */

module.exports = router;