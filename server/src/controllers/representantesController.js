const { prisma } = require("../config/prisma.js");
const {insertRepresentante} = require("../service/representantesService.js");

const getRepresentantes = async (req, res, next) => {
  try {
    const response = await prisma.representantes.findMany({
      include: {
        patrocinador: {
          include: {
            infantes: true,
          },
        },
        relacionparentesco: true,
      },
    });
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
    const response = await prisma.representantes.findUniqueOrThrow({
      where: {
        Representante_id: parseInt(req.params.id),
      },
      include: {
        patrocinador: {
          include: {
            infantes: true,
          },
        },
        relacionparentesco: true,
      },
    });
    res.status(200).json({
      status: "OK",
      data: { representante: response },
    });
  } catch (error) {
    next(error);
  }
};

const postRepresentante = async (req, res, next) => {
  //TODO: add validation

  //modelo o interfaz de representante

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

const putRepresentante = async (req, res) => {};

const deleteRepresentante = async (req, res) => {};

module.exports = {
  getRepresentantes,
  getRepresentante,
  postRepresentante,
  putRepresentante,
  deleteRepresentante,
};
