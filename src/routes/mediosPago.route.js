const express = require("express");
const esAdministrador = require("../middlewares/isAdm.middlewares");
const router = express.Router();

const {obtenerMediospago,crearMediospago,actualizarMediospago,eliminarMediospago} = require("../controllers/mediosPago.controller");
const verificar = require("../middlewares/token.middkeware");


/**
 * @swagger
 * /mediosPago:
 *  get:
 *      summary: Obtener todos los medios de pago disponibles.
 *      tags: [Medios de pago]
 *      
 *      responses:
 *          200:
 *              description: Lista de Medios de pago disponibles en el sistema.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/getMediospago'
 *          400:
 *              description: el usuario no ha inicido sesion
*/

router.get('/', verificar, obtenerMediospago);


/**
 * @swagger
 * /mediosPago/crear:
 *  post:
 *      summary: Crea un medio de pago en el sistema si el usuario es administrador.
 *      tags: [Medios de pago]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/postMediospago'
 *      responses:
 *          201:
 *              description: Medio de pago creado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/getMediospago'
 *          204:
 *              description: el medio de pago ya existe
 *          400:
 *              description: faltan parametros para crear el medio de pago.
*/

router.post('/crear', esAdministrador, crearMediospago);


/**
 * @swagger
 * '/mediosPago/{medioPagoId}':
 *  put:
 *      summary: Modifica la informacion del medio de pago si el usuario es administrador.
 *      tags: [Medios de pago]
 *      parameters:
 *        - in: path
 *          name: medioPagoId
 *          description: ID del medio de pago a editar
 *          required: true
 *          schema:
 *              type: string
 *              example: 613f6c82ebaad4343808a498
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/postMediospago'
 *      responses:
 *          200:
 *              description: producto actualizado
 *          400:
 *              description: no se ha encontrado el medio de pago.
 *          500:
 *              description: el medio de pago no se ha podido actualizar
*/
router.put('/:id', esAdministrador, actualizarMediospago);
/**
 * @swagger
 * /mediosPago/Eliminar/{medioPagoId}:
 *  delete:
 *      summary: elimina un medio de pago si el usuario es administrador.
 *      tags: [Medios de pago]
 *      parameters:
 *        - in: path
 *          name: medioPagoId
 *          description: ID del medio de pago a eliminar.
 *          required: true
 *          schema:
 *              type: string
 *              example: 613f6c82ebaad4343808a498
 *      responses:
 *          200:
 *              description: Medio de pago eliminado exitosamente
 *          400:
 *              description: no se encontro el medio de pago.
 *          401:
 *              description: el usuario no esta autorizado para realizar cambios en esta cuenta o no ha inicado sesion en su cuenta
 * */

router.delete('/Eliminar/:id', esAdministrador, eliminarMediospago);

/**
 * @swagger
 * tags:
 *  name: Medios de pago
 *  description: Seccion de medios de pago
 * 
 * components: 
 *  schemas:
 *      getMediospago:
 *          type: object
 *          required:
 *              -email
 *              -contrasena
 *          properties:
 *              id:
 *                  type: string
 *                  description: ID del medio de pago
 *              nombre:
 *                  type: string
 *                  description: nombre del medio de pago
 *          example:
 *              id: 612a6f6c89fc9e3f70bbeced    
 *              nombre: efectivo
 *      postMediospago:
 *          type: object
 *          required:
 *              -correo
 *              -contrasena
 *          properties:
 *              nombre:
 *                  type: string
 *                  description: nombre del medio de pago
 *          example:
 *              nombre: nequi
 */


module.exports = router;