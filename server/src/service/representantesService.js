const { prisma } = require("../config/prisma");

const insertRepresentante = async ({
  Cedula,
  Nombre,
  A_Paterno,
  A_Materno,
  Calle,
  Numero,
  DireccionId,
  Telefono_id,
  patrocinador,
  relacionparentesco,
}) => {
  const response = await prisma.representantes.create({
    include: {
      patrocinador: {
        include: {
          infantes: true,
        },
      },
      relacionparentesco: true,
    },
    data: {
      Cedula,
      Nombre,
      A_Paterno,
      A_Materno,
      Calle,
      Numero,
      DireccionId,
      Telefono_id,
      patrocinador: {
        create: patrocinador,
      },
      relacionparentesco: {
        create: relacionparentesco,
      },
    },
  });
  return response;
};

module.exports = { insertRepresentante, updateRepresentante };
