const representanteService = require("../../src/service/representantesService");
const {
  postRepresentante,
  getRepresentantes,
  getRepresentante,
  putRepresentante,
  deleteRepresentante,
} = require("../../src/controllers/representantesController");
const {
  validatorIdParameterRepresentante,
  validatorCreateRepresentante,
  validatorUpdateRepresentante,
} = require("../../src/validators/representante");

const {
  representanteId,
  representantePayload,
  initialrepresentantePayload,
  expectedRepresentante,
  expectedRepresentantes,
} = require("../test_data");

const mockRequest = {
  params: { id: 1 },
  body: initialrepresentantePayload,
};

const mockResponse = {
  status: jest.fn(() => mockResponse),
  json: jest.fn(() => mockResponse),
};

const mockNext = jest.fn();

jest.mock("../../src/service/representantesService");

jest.mock("../../src/config/prisma", () => ({
  prisma: {
    representantes: {
      findMany: jest.fn(),
      findUniqueOrThrow: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

jest.mock("express-validator", () => ({
  ...jest.requireActual("express-validator"),
  validationResult: jest.fn(() => ({
    isEmpty: jest.fn(() => false),
    array: jest.fn(() => [
      {
        type: "field",
        value: "40299887765",
        msg: "Cause of validation error",
        path: "Cedula",
        location: "body",
      },
    ]),
  })),
}));

jest.mock("../../src/utils/handleValidator");

describe("representantes", () => {
  describe("validation middleware for representante's routes", () => {
    jest.doMock("../../src/utils/handleValidator");

    const { validateResult } = require("../../src/utils/handleValidator");

    it("GET /representantes/:id should call validationResult function", () => {
      validatorIdParameterRepresentante[1](mockRequest, mockResponse, mockNext);

      expect(validateResult).toHaveBeenCalled();
      expect(validateResult).toHaveBeenCalledTimes(1);
      expect(validateResult).toHaveBeenCalledWith(
        mockRequest,
        mockResponse,
        mockNext
      );
    });

    it("POST /representantes/ should call validationResult function", () => {
      validatorCreateRepresentante[10](mockRequest, mockResponse, mockNext);

      expect(validateResult).toHaveBeenCalled();
      expect(validateResult).toHaveBeenCalledTimes(1);
      expect(validateResult).toHaveBeenCalledWith(
        mockRequest,
        mockResponse,
        mockNext
      );
    });

    it("PUT /representantes/:id should call validationResult function", () => {
      validatorUpdateRepresentante[12](mockRequest, mockResponse, mockNext);

      expect(validateResult).toHaveBeenCalled();
      expect(validateResult).toHaveBeenCalledTimes(1);
      expect(validateResult).toHaveBeenCalledWith(
        mockRequest,
        mockResponse,
        mockNext
      );
    });

    it("DELETE /representantes/:id should call validationResult function", () => {
      validatorIdParameterRepresentante[1](mockRequest, mockResponse, mockNext);

      expect(validateResult).toHaveBeenCalled();
      expect(validateResult).toHaveBeenCalledTimes(1);
      expect(validateResult).toHaveBeenCalledWith(
        mockRequest,
        mockResponse,
        mockNext
      );
    });
  });

  describe("representantes controller", () => {
    describe("getRepresentantes", () => {
      describe("the service is working correctly", () => {
        it("should return all representantes", async () => {
          representanteService.getAllRepresentantes.mockResolvedValueOnce([]);

          await getRepresentantes(mockRequest, mockResponse, mockNext);
          expect(mockNext).not.toHaveBeenCalled();
          expect(mockResponse.status).toHaveBeenCalled();
          expect(mockResponse.status).toHaveBeenCalledWith(200);
          expect(mockResponse.status).toHaveBeenCalledTimes(1);
          expect(mockResponse.json).toHaveBeenCalledWith({
            status: "OK",
            data: { representantes: [] },
          });

          mockResponse.status.mockClear();
          mockResponse.json.mockClear();
          mockNext.mockClear();

          representanteService.getAllRepresentantes.mockResolvedValueOnce([
            representantePayload,
          ]);
          await getRepresentantes(mockRequest, mockResponse, mockNext);
          expect(mockNext).not.toHaveBeenCalled();
          expect(mockResponse.status).toHaveBeenCalled();
          expect(mockResponse.status).toHaveBeenCalledWith(200);
          expect(mockResponse.status).toHaveBeenCalledTimes(1);
          expect(mockResponse.json).toHaveBeenCalledWith({
            status: "OK",
            data: {
              representantes: expectedRepresentantes,
            },
          });
        });
      });

      describe("the service is not working correctly", () => {
        it("should call the mockNext function with the error as an argument", async () => {
          representanteService.getAllRepresentantes.mockRejectedValueOnce(
            new Error()
          );

          await expect(getRepresentantes(mockRequest, mockResponse, mockNext))
            .rejects;
          expect(mockNext).toHaveBeenCalled();
          expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
          expect(mockNext).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe("getRepresentante", () => {
      describe("the service is working correctly", () => {
        it("should return the representante", async () => {
          representanteService.getOneRepresentante.mockResolvedValueOnce(
            representantePayload
          );

          await getRepresentante(mockRequest, mockResponse, mockNext);
          expect(mockNext).not.toHaveBeenCalled();
          expect(mockResponse.status).toHaveBeenCalled();
          expect(mockResponse.status).toHaveBeenCalledWith(200);
          expect(mockResponse.status).toHaveBeenCalledTimes(1);

          expect(mockResponse.json).toHaveBeenCalledWith({
            status: "OK",
            data: {
              representante: expectedRepresentante,
            },
          });
        });
      });

      describe("the service has rejected the request", () => {
        it("should call the mockNext function with the error as an argument", async () => {
          representanteService.getOneRepresentante.mockRejectedValueOnce(
            new Error()
          );

          await expect(getRepresentante(mockRequest, mockResponse, mockNext))
            .rejects;
          expect(mockResponse.status).not.toHaveBeenCalled();
          expect(mockNext).toHaveBeenCalled();
          expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
          expect(mockNext).toHaveBeenCalledTimes(1);
        });
      });
    });
    describe("postRepresentante", () => {
      describe("given representantes has been accepted by the service", () => {
        it("should create a representante", async () => {
          representanteService.insertRepresentante.mockResolvedValueOnce(
            representantePayload
          );
          await postRepresentante(mockRequest, mockResponse, mockNext);
          expect(mockNext).not.toHaveBeenCalled();
          expect(mockResponse.status).toHaveBeenCalled();
          expect(mockResponse.status).toHaveBeenCalledTimes(1);
          expect(mockResponse.status).toHaveBeenCalledWith(200);
          expect(mockResponse.json).toHaveBeenCalledWith({
            status: "OK",
            data: {
              representante: expectedRepresentante,
            },
          });
        });
      });
      describe("given representante has been rejected by the service", () => {
        it("should call the mockNext function with the error as an argument", async () => {
          representanteService.insertRepresentante.mockRejectedValueOnce(
            new Error()
          );

          await expect(postRepresentante(mockRequest, mockResponse, mockNext))
            .rejects;
          expect(mockResponse.status).not.toHaveBeenCalled();
          expect(mockNext).toHaveBeenCalled();
          expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
          expect(mockNext).toHaveBeenCalledTimes(1);
        });
      });
    });
    describe("putRepresentante", () => {
      describe("given representantes has been accepted by the server", () => {
        it("should update the representante", async () => {
          representanteService.updateRepresentante.mockResolvedValueOnce(
            representantePayload
          );
          await putRepresentante(mockRequest, mockResponse, mockNext);
          expect(mockNext).not.toHaveBeenCalled();
          expect(mockResponse.status).toHaveBeenCalled();
          expect(mockResponse.status).toHaveBeenCalledTimes(1);
          expect(mockResponse.status).toHaveBeenCalledWith(200);
          expect(mockResponse.json).toHaveBeenCalledWith({
            status: "OK",
            data: {
              representante: expectedRepresentante,
            },
          });
        });
      });
      describe("given representante has been rejected by the service", () => {
        it("should call the mockNext function with the error as an argument", async () => {
          representanteService.updateRepresentante.mockRejectedValueOnce(
            new Error()
          );

          await expect(putRepresentante(mockRequest, mockResponse, mockNext))
            .rejects;
          expect(mockResponse.status).not.toHaveBeenCalled();
          expect(mockNext).toHaveBeenCalled();
          expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
          expect(mockNext).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe("deleteRepresentante", () => {
      describe("the service has accepted the request", () => {
        it("should return the deleted representante", async () => {
          representanteService.removeRepresentante.mockResolvedValueOnce(
            representantePayload
          );

          await deleteRepresentante(mockRequest, mockResponse, mockNext);
          expect(mockNext).not.toHaveBeenCalled();
          expect(mockResponse.status).toHaveBeenCalled();
          expect(mockResponse.status).toHaveBeenCalledWith(200);
          expect(mockResponse.status).toHaveBeenCalledTimes(1);
          expect(mockResponse.json).toHaveBeenCalledWith({
            status: "OK",
            data: {
              representanteDeleted: expectedRepresentante,
            },
          });
        });
      });

      describe("the service has rejected the request", () => {
        it("should call the mockNext function with the error as an argument", async () => {
          representanteService.removeRepresentante.mockRejectedValueOnce(
            new Error()
          );

          await expect(deleteRepresentante(mockRequest, mockResponse, mockNext))
            .rejects;
          expect(mockResponse.status).not.toHaveBeenCalled();
          expect(mockNext).toHaveBeenCalled();
          expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
          expect(mockNext).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe("representantes service", () => {
    jest.dontMock("../../src/service/representantesService");
    const {
      getAllRepresentantes,
      getOneRepresentante,
      insertRepresentante,
      updateRepresentante,
      removeRepresentante,
    } = require("../../src/service/representantesService");

    const { prisma } = require("../../src/config/prisma");

    describe("getAllRepresentantes", () => {
      describe("the prisma ORM has accepted the request", () => {
        it("should return all representantes", async () => {
          prisma.representantes.findMany.mockResolvedValueOnce([
            representantePayload,
          ]);

          const response = await getAllRepresentantes();
          expect(prisma.representantes.findMany).toHaveBeenCalled();
          expect(prisma.representantes.findMany).toHaveBeenCalledWith(
            expect.objectContaining({
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
            })
          );
          expect(prisma.representantes.findMany).toHaveBeenCalledTimes(1);

          expect(response).toEqual(expectedRepresentantes);
        });
      });

      describe("the prisma ORM has rejected the request", () => {
        it("should throw an exception", async () => {
          prisma.representantes.findMany.mockRejectedValueOnce(
            new Error("Prisma Error")
          );
          await expect(getAllRepresentantes()).rejects.toThrow(
            new Error("Prisma Error")
          );
          expect(prisma.representantes.findMany).toHaveBeenCalled();
          expect(prisma.representantes.findMany).toHaveBeenCalledWith(
            expect.objectContaining({
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
            })
          );
          expect(prisma.representantes.findMany).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe("getRepresentante", () => {
      describe("the prisma ORM has accepted the request", () => {
        it("should return the representante", async () => {
          prisma.representantes.findUniqueOrThrow.mockResolvedValueOnce(
            representantePayload
          );

          const response = await getOneRepresentante(representanteId);
          expect(prisma.representantes.findUniqueOrThrow).toHaveBeenCalled();
          expect(prisma.representantes.findUniqueOrThrow).toHaveBeenCalledWith(
            expect.objectContaining({
              where: {
                Representante_id: parseInt(representanteId),
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
            })
          );
          expect(prisma.representantes.findUniqueOrThrow).toHaveBeenCalledTimes(
            1
          );
          expect(response).toEqual(expectedRepresentante);
        });
      });

      describe("the prisma ORM has rejected the request", () => {
        it("should throw an exception", async () => {
          prisma.representantes.findUniqueOrThrow.mockRejectedValueOnce(
            new Error("Prisma Error")
          );

          await expect(
            getOneRepresentante(Number.MAX_SAFE_INTEGER)
          ).rejects.toThrow(new Error("Prisma Error"));
          expect(prisma.representantes.findUniqueOrThrow).toHaveBeenCalled();
          expect(prisma.representantes.findUniqueOrThrow).toHaveBeenCalledWith(
            expect.objectContaining({
              where: {
                Representante_id: parseInt(Number.MAX_SAFE_INTEGER),
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
            })
          );
          expect(prisma.representantes.findUniqueOrThrow).toHaveBeenCalledTimes(
            1
          );
        });
      });
    });
    describe("create a representante", () => {
      describe("given representante has been accepted by the ORM", () => {
        it("should create the representante", async () => {
          prisma.representantes.create.mockResolvedValueOnce(
            representantePayload
          );

          const response = await insertRepresentante(
            initialrepresentantePayload
          );
          expect(prisma.representantes.create).toHaveBeenCalled();
          expect(prisma.representantes.create).toHaveBeenCalledWith(
            expect.objectContaining({
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
              data: expect.any(Object),
            })
          );
          expect(prisma.representantes.create).toHaveBeenCalledTimes(1);

          expect(response).toEqual(expectedRepresentante);
        });
      });
      describe("given representante has been rejected by the ORM", () => {
        it("should throw an exception", async () => {
          prisma.representantes.create.mockRejectedValueOnce(
            new Error("Prisma Error")
          );

          await expect(
            insertRepresentante(Number.MAX_SAFE_INTEGER)
          ).rejects.toThrow(new Error("Prisma Error"));
          expect(prisma.representantes.create).toHaveBeenCalled();
          expect(prisma.representantes.create).toHaveBeenCalledWith(
            expect.objectContaining({
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
              data: expect.any(Object),
            })
          );
          expect(prisma.representantes.create).toHaveBeenCalledTimes(1);
        });
      });
    });
    describe("update a representante", () => {
      describe("given representante has been accepted by the ORM", () => {
        it("should update the representante", async () => {
          prisma.representantes.update.mockResolvedValueOnce(
            representantePayload
          );

          const response = await updateRepresentante(
            representantePayload,
            representanteId
          );
          expect(prisma.representantes.update).toHaveBeenCalled();
          expect(prisma.representantes.update).toHaveBeenCalledWith(
            expect.objectContaining({
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
                Representante_id: representantePayload.Representante_id,
              },
              data: expect.any(Object),
            })
          );
          expect(prisma.representantes.update).toHaveBeenCalledTimes(1);

          expect(response).toEqual(expectedRepresentante);
        });
      });
      describe("given representante has been rejected by the ORM", () => {
        it("should throw an exception", async () => {
          prisma.representantes.update.mockRejectedValueOnce(
            new Error("Prisma Error")
          );

          await expect(
            updateRepresentante(representantePayload, representanteId)
          ).rejects.toThrow(new Error("Prisma Error"));
          expect(prisma.representantes.update).toHaveBeenCalled();
          expect(prisma.representantes.update).toHaveBeenCalledWith(
            expect.objectContaining({
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
                Representante_id: representantePayload.Representante_id,
              },
              data: expect.any(Object),
            })
          );
          expect(prisma.representantes.update).toHaveBeenCalledTimes(1);
        });
      });
    });
    describe("removeRepresentante", () => {
      describe("the prisma ORM has accepted the request", () => {
        it("should return the deleted representante", async () => {
          prisma.representantes.delete.mockResolvedValueOnce(
            representantePayload
          );

          const response = await removeRepresentante(representanteId);
          expect(prisma.representantes.delete).toHaveBeenCalled();
          expect(prisma.representantes.delete).toHaveBeenCalledWith(
            expect.objectContaining({
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
                Representante_id: representanteId,
              },
            })
          );
          expect(prisma.representantes.delete).toHaveBeenCalledTimes(1);

          expect(response).toEqual(expectedRepresentante);
        });
      });

      describe("the prisma ORM has rejected the request", () => {
        it("should throw an exception", async () => {
          prisma.representantes.delete.mockRejectedValueOnce(
            new Error("Prisma Error")
          );

          await expect(removeRepresentante(representanteId)).rejects.toThrow(
            new Error("Prisma Error")
          );
          expect(prisma.representantes.delete).toHaveBeenCalled();
          expect(prisma.representantes.delete).toHaveBeenCalledWith(
            expect.objectContaining({
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
                Representante_id: representanteId,
              },
            })
          );
          expect(prisma.representantes.delete).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});
