const { prisma } = require("../config/prisma.js");
const {
  insertRepresentante,
  updateRepresentante,
  removeRepresentante,
  getAllRepresentantes,
  getOneRepresentante,
} = require("../service/representantesService.js");

const getRepresentantes = async (req, res, next) => {
  try {
    const response = await getAllRepresentantes();
    res.status(200).json({
      status: "OK",
      data: { representantes: response },
    });
  } catch (error) {
    next(error);
  }
};

const getRepresentante = async (req, res, next) => {
  try {
    const response = await getOneRepresentante(req.params.id);
    res.status(200).json({
      status: "OK",
      data: { representante: response },
    });
  } catch (error) {
    next(error);
  }
};

const postRepresentante = async (req, res, next) => {
  try {
    const response = await insertRepresentante(req.body);
    res.status(200).json({
      status: "OK",
      data: { representante: response },
    });
  } catch (error) {
    next(error);
  }
};

const putRepresentante = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const response = await updateRepresentante(req.body, id);
    res.status(200).json({ status: "OK", data: { representante: response } });
  } catch (error) {
    next(error);
  }
};

const deleteRepresentante = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const response = await removeRepresentante(id);
    res
      .status(200)
      .json({ status: "OK", data: { representanteDeleted: response } });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRepresentantes,
  getRepresentante,
  postRepresentante,
  putRepresentante,
  deleteRepresentante,
};
