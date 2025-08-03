// Importamos los módulos necesarios
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Configuración de CORS
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// Parseo de solicitudes tipo JSON
app.use(bodyParser.json());

// Parseo de solicitudes tipo x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Importamos los modelos Sequelize
const db = require("./api-biblioteca/models");
db.sequelize.sync();
// Si deseas reiniciar las tablas cada vez que el servidor arranca, usa esto:
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// Ruta raíz
app.get("/", (req, res) => {
  res.json({ message: "API BIBLIOTECA 2025" });
});

// Rutas de la API
require("./api-biblioteca/routes/estudiante.routes")(app);
require("./api-biblioteca/routes/libro.routes")(app);
require("./app/routes/prestamo.routes")(app);

// Definir puerto y arrancar el servidor
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

