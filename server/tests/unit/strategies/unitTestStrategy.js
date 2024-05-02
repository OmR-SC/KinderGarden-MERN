class TestContext {
  constructor(strategy) {
    this.strategy = strategy;
  }
  setup() {
    this.strategy.setup();
  }

  run(mockRequest, mockResponse, mockNext) {
    this.strategy.run(mockRequest, mockResponse, mockNext);
  }

  setTestStrategy(strategy) {
    this.strategy = strategy;
  }

  cleanup() {
    this.strategy.cleanup();
  }
}

class ValidationTestStrategy extends TestContext {
  constructor(validator) {
    super();
    this.validator = validator;
  }

  setup() {
    jest.doMock("../../../src/utils/handleValidator");
    this.validateResult =
      require("../../../src/utils/handleValidator").validateResult;
  }

  run(mockRequest, mockResponse, mockNext) {
    this.validator(mockRequest, mockResponse, mockNext);

    expect(this.validateResult).toHaveBeenCalled();
    expect(this.validateResult).toHaveBeenCalledTimes(1);
    expect(this.validateResult).toHaveBeenCalledWith(
      mockRequest,
      mockResponse,
      mockNext
    );
  }

  setValidationFunction(validator) {
    this.validator = validator;
  }
}

class ServiceErrorHandlingStrategy extends TestContext {
  constructor(controller, service) {
    super();
    this.controller = controller;
    this.service = service;
  }
  async run(mockRequest, mockResponse, mockNext) {
    this.service.mockRejectedValueOnce(new Error("Service Error"));

    await expect(
      this.controller(mockRequest, mockResponse, mockNext)
    ).resolves.toBeUndefined();
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).not.toHaveBeenCalled();
  }

  setControllerAndService(controller, service) {
    this.controller = controller;
    this.service = service;
  }
}

module.exports = {
  TestContext,
  ValidationTestStrategy,
  ServiceErrorHandlingStrategy,
};
