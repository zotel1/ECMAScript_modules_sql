#### ECMAScript Modules SQL
-Descripción
-Este proyecto es una API RESTful construida con ECMAScript Modules y utiliza MySQL como base de datos. Proporciona una arquitectura modular con carpetas bien organizadas para facilitar el mantenimiento y la escalabilidad.

Tecnologías utilizadas:
-ECMAScript Modules
-MySQL
-Estructura del Proyecto
####El proyecto sigue una estructura organizada para facilitar el desarrollo y la comprensión del código:

-controllers: Contiene controladores responsables de manejar la lógica de la aplicación.
-middlewares: Almacena middleware para procesar solicitudes antes de llegar a los controladores.
-models: Define los modelos de datos de la aplicación.
-routes: Contiene las rutas de la API RESTful.
-schemas: Incluye esquemas de base de datos.
-test: Contiene pruebas para garantizar la integridad del código.
-views: Puede incluir vistas si se utiliza algún motor de plantillas.
-web: Puede contener archivos estáticos o recursos web.

####Configuración:

####Instalación de dependencias:
bash
-npm install

####Configuración de la base de datos:

####Para usar mysql:
-models/mysql/movie.js

const DEFAULT_CONFIG = {
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: '*ingresa-tu-contraseña*',
    database: 'moviesdb'
}

####Para usar entorno local:
-models/local-file-system/movie.js

####Para usar mongodb:
-models/mongodb/movie.js

####Ejecutar la aplicación:
bash
-node run mysql
-node run local

####Ejecutar pruebas:
bash
-npx test
