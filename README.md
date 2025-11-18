Luis Velasquez  
Carnet 24011341  
Curso Desarrollo de APIs y NodeJS avanzado  
Tarea - Contenerización de Aplicación Node.js y Despliegue Básico  
4to Semestre - Tecnico Desarrollo Fullstack

# Acerca de la aplicacion original "API RESTful con Express.js"

## Objetivo:

Desarrollar una API RESTful usando Express.js que:

- Exponga operaciones CRUD completas sobre una entidad (puede ser productos, usuarios, tareas, etc.).
- Implemente validación de datos en los endpoints.
- Incluya al menos 5 pruebas unitarias o de integración con Jest o Mocha.

### Requisitos Técnicos:

- Usar Express.js como framework principal.
- Crear endpoints:
  - GET /entidad
  - GET /entidad/:id
  - POST /entidad
  - PUT /entidad/:id
  - DELETE /entidad/:id
- Validar datos con express-validator, Joi, o alguna otra herramienta.
- Los datos deben guardarse en una Base de Datos.
- Implementar al menos 5 pruebas (con Jest o Mocha + Supertest si hacen pruebas de integración):
  - Probar creación (POST) con datos válidos e inválidos.
  - Probar obtención (GET) de elementos.
  - Probar actualización o eliminación.

# Objetivo tarea "Contenerización de Aplicación Node.js y Despliegue Básico:"

El objetivo principal es que adquieran experiencia práctica en la contenerización de una aplicación web real utilizando Docker. Esto implica comprender cómo empaquetar una aplicación Node.js junto con todas sus dependencias en una imagen Docker portable, y documentar el proceso para asegurar un despliegue consistente y reproducible en cualquier entorno.

### Instrucciones

1. Selección de la Aplicación: Deberán utilizar una aplicación Node.js existente. Se recomienda usar el API desarrollado en la Tarea 2 (APIs RESTful con Express.JS), pero pueden optar por otra aplicación propia si esta cumple con los requisitos de un proyecto funcional.
2. Creación del Dockerfile: Deberán crear un Dockerfile robusto que defina correctamente los pasos para construir una imagen Docker que contenga y ejecute su aplicación Node.js. Esto incluye seleccionar una imagen base adecuada, copiar el código fuente, instalar dependencias y definir el comando de inicio.
3. Construcción de la Imagen: Deberán construir la imagen Docker a partir de su Dockerfile y verificar su funcionamiento de manera local, asegurando que la aplicación se ejecuta correctamente dentro del contenedor.
4. Documentación del Despliegue: Deberán documentar de forma clara y concisa los pasos necesarios para que cualquier persona pueda construir y ejecutar el contenedor en su máquina local., además de adjuntar pruebas de su ejecución funcionando.

# Documentacion de la tarea "Contenerización de Aplicación Node.js y Despliegue Básico"

## 🚀 Despliegue con Docker

Este proyecto está configurado para ejecutarse en un entorno contenedorizado utilizando Docker y Docker Compose, asegurando un despliegue consistente y aislado.

### Requisitos Previos

- [Docker](https://www.docker.com/products/docker-desktop/)
- [Node.js](https://nodejs.org/) (para la gestión del archivo `.env`)

### Pasos para la Ejecución Local

1.  **Clonar el Repositorio**

    ```bash
    git clone https://[TU-URL-DE-GITHUB]/[TU-REPO].git
    cd [TU-REPO]
    ```

2.  **Configurar Variables de Entorno**
    Cree un archivo `.env` en la raíz del proyecto basándose en el `.env.example`. Este archivo es fundamental ya que `docker-compose.yml` lo utiliza para configurar tanto la API como la base de datos.

    ```bash
    # Ejemplo de archivo .env
    POSTGRES_USER=tu_usuario_bd
    POSTGRES_PASSWORD=tu_contraseña_bd
    POSTGRES_DB=tu_nombre_de_bd
    ```

3.  **Construir y Levantar los Contenedores**
    Utilice Docker Compose para construir la imagen de la API y levantar ambos servicios (API y Base de Datos) en modo "detached" (segundo plano).

    ```bash
    docker compose up --build -d
    ```

    - `--build`: Fuerza la reconstrucción de la imagen de la API si se han hecho cambios.
    - `-d`: (Detached) Ejecuta los contenedores en segundo plano.

4.  **Verificar el Funcionamiento**
    La API estará disponible y escuchando en `http://localhost:4000`.

5.  **Detener los Servicios**
    Para detener y eliminar los contenedores y la red creada, ejecute:
    ```bash
    docker compose down
    ```
