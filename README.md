# Api de Prueba en Javascript

_En el repositorio encontraremos una api desarrollada en Express que permite la creacion de pedidos (usuarios), y la administracion de usuarios, pedidos, metodos de pago y productos_

## Comenzando 🚀

_Estas instrucciones te permitirán correr la api en la nube._


### Pre-requisitos 📋
debera iniciar sesion en la consola de aws con los datos de usuario proporcionados. 

_Para desplegar el proyecto se necesita tener instalado_

```
puTTY

```
- este software permite conectarse a las instancias por medio de ssh

### Instalación 🔧

_El paso inicial para probar el proyecto es iniciar las instancias de amazon linux:_

```
para ello debe seleccionar la instancia 1 y la instancia 2 y dar click en el boton iniciar instancias.
```

se debe copiar la ip publica de cada instancia y pegarla en el network access de mongo atlas:_

```
https://cloud.mongodb.com/v2/611a9ee29ced363839b79617#security/network/accessList
```

_Con esto la conexion a la base de datos no tendra problemas._

_conexion de las intancias a traves de ssh con puTTY ._

1. elegir la opcion session de la lista de menu de la izqueirda
2. marcar la opcion SSH y en el host name pegar el DNS de IPv4 pública de la instancia 
3. elegir la opcion Data y en auto-login username poner ec2-user
4. elegir la opcion SSH y posteriormente la opcion Auth 
5. en private key file for authentication cargar el archivo "my_linux_key_PA.ppk" adjunto.

_con estos pasos se conectara a las instancias._

## Despliegue 📦

_Para realizar el despliegue debemos estar ubicados en la consola de cada instancia y ejecutar el siguientes comandos:_

Nota importante: la aplicacion correra automaticamente con pm2 al momento de iniciar las instancias, unicamente se debe INICIAR el servidor proxy nginx, ejecutando el siguiente comando:
```
sudo nginx
```
finalmente se debe ingresar al sitio web a traves de la siguiente direccion 

[https://myprojectsprint3.ml/api/api-docs/](https://myprojectsprint3.ml/api/api-docs/)


## Construido con 🛠️

* [Node.js](https://nodejs.org/es/docs/) - Entorno de programación
* [Express](https://maven.apache.org/) - Framework de Javascript
* [Swagger](https://swagger.io/docs/) - Usado para documentar la API
* [AWS](https://aws.amazon.com/) - Usado para montar la api en la nube

## algunos datos a tener en cuenta del funcionamiento de la api
* Para crear pedidos se debe tener en cuenta lo siguiente.

    _para crear pedidos se debe seleccionar el metodo de pago y la direccion, si la direccion se deja en blanco se tomara la     direccion del registro, el pedido se creara vacio y en estado abierto por default._

    _Despues de creado el pedido se añaden los productos en arrays, un array para nombres del producto y otro array para las cantidades y si se desea confirmar o cerrar el pedido se envia el estado "cerrado" de lo contrario se deja el estado vacio para continuar añadiendo productos al pedido o actualizarlo mas adelante._

    _Los administradores podran cambiar el estado de los pedidos. los estados de los pedidos son.
    abierto: donde el usuario puede agregar los productos que desea.

    _Cerrado: cuando el usuario confirma el pedido. a partir de este estado los usuarios administradores podran modificar el estado a: confirmado, preparando, enviando, entregado y cancelado._

    _El usuario podra borrar el pedido unicamente si esta en estado abierto._



* Las demas entidades cuentan con la opcion de obtener, crear, editar y eliminar.
para la autenticacion de usuario y administrador se uso bearer auth. para este iniciar debera crear un usuario administrador para ejecutar las acciones permitidas para este, al momento de crear este usuario se debe enviar administrador: true de lo contrario se creara por defecto en false.
* para testear la creacion de cuenta de la siguiente manera:

npm run test


## Autor ✒️

* **Hernan Dario Cabrera** - *Desarrollo y documentación de la API* - [hernan cabrera](https://gitlab.com/dariocabrera/sprints-acamica)
