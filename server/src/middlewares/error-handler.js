const { Prisma } = require("@prisma/client");

const errorHandlingAfterRoute = (error, req, res, next) => {
  //TODO: Make a personalized error handling
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2025") {
      error.status = 404;
    }
  }

  res.status(error?.status || 500).json({
    status: "FAILED",
    data: { error: error?.message || error },
  });
};

module.exports = { errorHandlingAfterRoute };
