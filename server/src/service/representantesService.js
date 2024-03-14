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

const updateRepresentante = async (
  {
    Representante_id,
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
  },
  id
) => {
  const response = await prisma.representantes.update({
    include: {
      patrocinador: {
        include: {
          infantes: true,
        },
      },
      relacionparentesco: true,
    },
    where: { Representante_id: id },
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
        deleteMany: {
          NOT: patrocinador?.map(({ Infantes_id }) => ({
            Infantes_id: Infantes_id,
          })),
        },

        upsert: patrocinador?.map(({ Pagante_id, ...pat }) => ({
          where: { Infantes_id: pat.Infantes_id },
          update: {
            Cuenta: pat.Cuenta,
          },
          create: pat,
        })),
      },
      relacionparentesco: {
        deleteMany: {
          NOT: relacionparentesco?.map(({ tipoParentesco, ...rel }) => rel),
        },
        upsert: relacionparentesco?.map(({ Representante_id, ...rel }) => ({
          where: {
            Infante_id_Representante_id: {
              Representante_id: Representante_id,
              Infante_id: rel.Infante_id,
            },
          },
          update: {
            tipoParentesco: rel.tipoParentesco,
          },
          create: rel,
        })),
      },
    },
  });

  return response;
};

module.exports = { insertRepresentante, updateRepresentante };
