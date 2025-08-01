module.exports = app => {
  const libros = require("../controller/libro.controller.js");
  const router = require("express").Router();

  router.get("/", libros.findAll);
  router.get("/:id", libros.findOne);
  router.post("/", libros.create);
  router.put("/:id", libros.update);
  router.delete("/:id", libros.delete);

  app.use("/api/libros", router);
};
