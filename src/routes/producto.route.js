const express = require("express");
const esAdministrador = require("../middlewares/isAdm.middlewares");
const router = express.Router();
const {obtenerProductos,crearProducto,actualizarProducto,eliminarProductos} = require("../controllers/productos.controller")

/**
 * @swagger
 * /productos:
 *  get:
 *      summary: Obtener todos los productos del sistema
 *      tags: [Productos] 
 *      responses:
 *          200:
 *              description: Lista de productos del sistema
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/getProductos'
*/


router.get('/', obtenerProductos)

/**
 * @swagger
 * /productos/nuevos:
 *  post:
 *      summary: crea un nuevo producto en el sistema si el usuario es administrador.
 *      tags: [Productos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/postProductos'
 *      responses:
 *          201:
 *              description: producto creado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/getProductos'
 *          401:
 *              description: el usuario no esta autorizado o no ha iniciado sesion.
 *          400:
 *              description: el producto ya existe.
 *          500:
 *              description: el producto no se ha podido crear
 * */


router.post('/nuevos', esAdministrador, crearProducto);

/**
 * @swagger
 * /productos/{productId}:
 *  put:
 *      summary: Modifica la informacion de un producto si el usuario es administrador.
 *      tags: [Productos]
 *      parameters:
 *        - in: path
 *          name: productId
 *          description: ID del producto a editar
 *          required: true
 *          schema:
 *              type: string
 *              example: 612a60b37edc213ac4ffd9e3
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/postProductos'
 *      responses:
 *          200:
 *              description: producto actualizado
 *          401:
 *              description: el usuario no esta autorizado o no ha iniciado sesion.
 *          500:
 *              description: internal error server
*/

router.put('/:id', esAdministrador, actualizarProducto );

/**
 * @swagger
 * /productos/Eliminar/{productId}:
 *  delete:
 *      summary: elimina un producto por ID si el usuario es administrador.
 *      tags: [Productos]
 *      parameters:
 *        - in: path
 *          name: productId
 *          description: ID del producto a eliminar
 *          required: true
 *          schema:
 *              type: string
 *              example: 612a60b37edc213ac4ffd9e3
 *      responses:
 *          200:
 *              description: producto eliminado exitosamente
 *          401: 
 *              description: el usuario no esta autorizado o no ha iniciado sesion.
 *          404:
 *              description: no se encontro el producto.
 * */

router.delete('/Eliminar/:id', esAdministrador, eliminarProductos);

/**
 * @swagger
 * tags:
 *  name: Productos
 *  description: Seccion de productos
 * 
 * components: 
 *  schemas:
 *      getProductos:
 *          type: object
 *          required:
 *              -email
 *              -contrasena
 *          properties:
 *              id:
 *                  type: string
 *                  description: ID del producto 
 *              nombre:
 *                  type: string
 *                  description: nombre del producto
 *              precio: 
 *                  type: number
 *                  description: precio del producto 
 *          example:
 *              id: 612a63287edc213ac4ffd9e8    
 *              nombre: cocacola
 *              precio: 2000
 *      postProductos:
 *          type: object
 *          required:
 *              -correo
 *              -contrasena
 *          properties:
 *              nombre:
 *                  type: string
 *                  description: nombre del producto
 *              precio: 
 *                  type: number
 *                  description: precio del producto
 *          example:
 *              nombre: galletas
 *              precio: 3000
 * */

module.exports = router 