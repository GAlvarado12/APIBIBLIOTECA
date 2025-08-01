const db = require("../models");
const Estudiante = db.Estudiante;

exports.findAll = async (req, res) => {
  const data = await Estudiante.findAll();
  res.send(data);
};

exports.findOne = async (req, res) => {
  const estudiante = await Estudiante.findByPk(req.params.id);
  if (!estudiante) return res.status(404).send({ mensaje: "No encontrado" });
  res.send(estudiante);
};

exports.create = async (req, res) => {
  const nuevo = await Estudiante.create(req.body);
  res.status(201).send(nuevo);
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const actualizado = await Estudiante.update(req.body, { where: { id } });
  res.send({ mensaje: "Estudiante actualizado", actualizado });
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  await Estudiante.destroy({ where: { id } });
  res.send({ mensaje: "Estudiante eliminado" });
};
