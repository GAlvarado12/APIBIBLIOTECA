const dbConfig = require("../config/db.config.js");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  pool: dbConfig.pool
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Modelos
db.Libro = require("./libro.model")(sequelize, DataTypes);
db.Estudiante = require("./estudiante.model")(sequelize, DataTypes);
db.Prestamo = require("./prestamo.model")(sequelize, DataTypes);

// Relaciones
db.Libro.hasMany(db.Prestamo, { foreignKey: "libroId" });
db.Prestamo.belongsTo(db.Libro, { foreignKey: "libroId" });

db.Estudiante.hasMany(db.Prestamo, { foreignKey: "estudianteId" });
db.Prestamo.belongsTo(db.Estudiante, { foreignKey: "estudianteId" });

module.exports = db;
