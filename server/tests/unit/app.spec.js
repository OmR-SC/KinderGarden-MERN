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
const mockRequest = {};
const mockResponse = {
  status: jest.fn(() => mockResponse),
  json: jest.fn(() => mockResponse),
};
const mockNext = jest.fn();
const validator = require("express-validator");
const { validateResult } = require("../../src/utils/handleValidator");
const { validaCedula } = require("../../src/utils/cedulaValidator");

describe("utils", () => {
  describe("handleValidator", () => {
    describe("validateResult function", () => {
      describe("there are no errors", () => {
        it("should call mockNext function", () => {
          validator.validationResult.mockReturnValueOnce({
            isEmpty: () => true,
          });

          validateResult(mockRequest, mockResponse, mockNext);
          expect(mockNext).toHaveBeenCalled();
          expect(mockNext).toHaveBeenCalledTimes(1);
          expect(validator.validationResult).toHaveBeenCalled();
          expect(validator.validationResult).toHaveBeenCalledWith(mockRequest);
          expect(mockResponse.status).not.toHaveBeenCalled();
        });
      });
      describe("there are validation errors", () => {
        it("sould return 403 status code and an error array", () => {
          validateResult(mockRequest, mockResponse, mockNext);
          expect(validator.validationResult).toHaveBeenCalled();
          expect(validator.validationResult).toHaveBeenCalledWith(mockRequest);
          expect(mockResponse.status).toHaveBeenCalled();
          expect(mockResponse.status).toHaveBeenCalledTimes(1);
          expect(mockResponse.status).toHaveBeenCalledWith(403);
          expect(mockResponse.json).toHaveBeenCalledWith({
            status: "FAILED",
            errors: expect.any(Array),
          });
          expect(mockNext).not.toHaveBeenCalled();
        });
      });
    });
  });
  describe("cedulaValidator", () => {
    describe("validaCedula", () => {
      describe("given cedula is valid", () => {
        it("should return true", () => {
          const response = validaCedula("40225999347");

          expect(response).toBe(true);
        });
      });
      describe("given cedula is not valid", () => {
        it("should return false", () => {
          expect(validaCedula("40225999346")).toBe(false);
          expect(validaCedula("40225999348")).toBe(false);
          expect(validaCedula("00109789542")).toBe(false);
        });
      });
    });
  });
});
