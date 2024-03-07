const { prisma } = require("../service/prisma.js");

const getRepresentantes = async (req, res, next) => {
  try {
    const response = await prisma.representantes.findMany();
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
    });
    res.status(200).json({
      status: "OK",
      data: { representante: response },
    });
  } catch (error) {
    next(error);
  }
};

const postRepresentante = async (req, res) => {};

const putRepresentante = async (req, res) => {};

const deleteRepresentante = async (req, res) => {};

module.exports = {
  getRepresentantes,
  getRepresentante,
  postRepresentante,
  putRepresentante,
  deleteRepresentante,
};
