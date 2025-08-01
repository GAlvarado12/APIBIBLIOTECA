const db = require("../models");
const Prestamo = db.Prestamo;
const Libro = db.Libro;

exports.create = async (req, res) => {
  const { libroId, estudianteId } = req.body;

  const libro = await Libro.findByPk(libroId);
  if (!libro || !libro.disponible) {
    return res.status(400).send({ mensaje: "Libro no disponible" });
  }

  const nuevo = await Prestamo.create({ libroId, estudianteId });
  await libro.update({ disponible: false });

  res.status(201).send(nuevo);
};

exports.prestamosPorEstudiante = async (req, res) => {
  const prestamos = await Prestamo.findAll({
    where: { estudianteId: req.params.id },
    include: [db.Libro]
  });
  res.send(prestamos);
};

exports.devolver = async (req, res) => {
  const prestamo = await Prestamo.findByPk(req.params.id);
  if (!prestamo) return res.status(404).send({ mensaje: "No encontrado" });

  prestamo.fechaDevolucion = new Date();
  await prestamo.save();

  const libro = await db.Libro.findByPk(prestamo.libroId);
  if (libro) await libro.update({ disponible: true });

  res.send({ mensaje: "Libro devuelto", prestamo });
};
