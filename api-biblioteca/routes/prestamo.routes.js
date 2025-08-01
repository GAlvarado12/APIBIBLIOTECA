module.exports = app => {
  const prestamos = require("../controller/prestamo.controller.js");
  const router = require("express").Router();

  router.post("/", prestamos.create);
  router.get("/estudiante/:id", prestamos.prestamosPorEstudiante);
  router.put("/:id", prestamos.devolver);

  app.use("/api/prestamos", router);
};
