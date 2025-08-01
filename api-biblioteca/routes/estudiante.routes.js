module.exports = app => {
  const estudiantes = require("../controller/estudiante.controller.js");
  const router = require("express").Router();

  router.get("/", estudiantes.findAll);
  router.get("/:id", estudiantes.findOne);
  router.post("/", estudiantes.create);
  router.put("/:id", estudiantes.update);
  router.delete("/:id", estudiantes.delete);

  app.use("/api/estudiantes", router);
};
