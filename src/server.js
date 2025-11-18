// Importar configuracion de la app
const app = require('./app');

// cargar variables de entorno
require('dotenv').config();

// Importar el pool para inicializar la conexión
require('./db');

// definimos el puerto
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto http://localhost:${PORT}`);
});

