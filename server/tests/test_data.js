//Representantes


const representanteId = 5;
const representantePayload = {
  Representante_id: representanteId,
  Cedula: "40225999348",
  Nombre: "AName",
  A_Paterno: "Apellido",
  A_Materno: "Apellido",
  Calle: "Calle",
  Numero: 5,
  DireccionId: 5,
  Telefono_id: "8099998888",
  patrocinador: [
    {
      Infantes_id: 1,
      Cuenta: "9999999999",
    },
  ],
  relacionparentesco: [
    {
      Infante_id: 1,
      tipoParentesco: 3,
    },
  ],
};

const initialrepresentantePayload = {
  Cedula: "40225999348",
  Nombre: "AName",
  A_Paterno: "Apellido",
  A_Materno: "Apellido",
  Calle: "Calle",
  Numero: 5,
  DireccionId: 5,
  Telefono_id: "8099998888",
};

const expectedRepresentante = expect.objectContaining({
  Representante_id: expect.any(Number),
  Cedula: expect.any(String),
  Nombre: expect.any(String),
  A_Paterno: expect.any(String),
  A_Materno: expect.any(String),
  Calle: expect.any(String),
  Numero: expect.any(Number),
  DireccionId: expect.any(Number),
  Telefono_id: expect.any(String),
  patrocinador: expect.arrayContaining([
    expect.objectContaining({
      //Pagante_id: expect.any(Number),
      Infantes_id: expect.any(Number),
      Cuenta: expect.any(String),
    }),
  ]),
  relacionparentesco: expect.arrayContaining([
    expect.objectContaining({
      Infante_id: expect.any(Number),
      //Representante_id: expect.any(Number),
      tipoParentesco: expect.any(Number),
    }),
  ]),
});

const expectedRepresentantes = expect.arrayContaining([
  expect.objectContaining({
    Representante_id: expect.any(Number),
    Cedula: expect.any(String),
    Nombre: expect.any(String),
    A_Paterno: expect.any(String),
    A_Materno: expect.any(String),
    Calle: expect.any(String),
    Numero: expect.any(Number),
    DireccionId: expect.any(Number),
    Telefono_id: expect.any(String),
    patrocinador: expect.arrayContaining([
      expect.objectContaining({
        //Pagante_id: expect.any(Number),
        Infantes_id: expect.any(Number),
        Cuenta: expect.any(String),
      }),
    ]),
    relacionparentesco: expect.arrayContaining([
      expect.objectContaining({
        Infante_id: expect.any(Number),
        //Representante_id: expect.any(Number),
        tipoParentesco: expect.any(Number),
      }),
    ]),
  }),
]);

module.exports = {
    representanteId,
    representantePayload,
    initialrepresentantePayload,
    expectedRepresentante,
    expectedRepresentantes,
  };