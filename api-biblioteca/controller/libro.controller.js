const db = require("../models");
const Libro = db.Libro;

exports.findAll = async (req, res) => {
  const data = await Libro.findAll();
  res.send(data);
};

exports.findOne = async (req, res) => {
  const libro = await Libro.findByPk(req.params.id);
  if (!libro) return res.status(404).send({ mensaje: "No encontrado" });
  res.send(libro);
};

exports.create = async (req, res) => {
  const nuevo = await Libro.create(req.body);
  res.status(201).send(nuevo);
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const actualizado = await Libro.update(req.body, { where: { id } });
  res.send({ mensaje: "Libro actualizado", actualizado });
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  await Libro.destroy({ where: { id } });
  res.send({ mensaje: "Libro eliminado" });
};
