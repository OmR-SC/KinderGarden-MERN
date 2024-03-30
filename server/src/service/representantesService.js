const { prisma } = require("../config/prisma");

const getAllRepresentantes = async () => {
  return await prisma.representantes.findMany({
    include: {
      patrocinador: {
        include: {
          infantes: true,
        },
      },
      relacionparentesco: {
        include: { parentesco: true },
      },
    },
  });
};
const getOneRepresentante = async (id) => {
  return await prisma.representantes.findUniqueOrThrow({
    where: {
      Representante_id: parseInt(id),
    },
    include: {
      patrocinador: {
        include: {
          infantes: true,
        },
      },
      relacionparentesco: {
        include: { parentesco: true },
      },
    },
  });
};
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
      relacionparentesco: {
        include: {
          parentesco: true,
        },
      },
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
      relacionparentesco: {
        include: {
          parentesco: true,
        },
      },
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

const removeRepresentante = async (id) =>
  await prisma.representantes.delete({
    include: {
      patrocinador: {
        include: {
          infantes: true,
        },
      },
      relacionparentesco: {
        include: {
          parentesco: true,
        },
      },
    },
    where: {
      Representante_id: id,
    },
  });

module.exports = {
  getAllRepresentantes,
  getOneRepresentante,
  insertRepresentante,
  updateRepresentante,
  removeRepresentante,
};
