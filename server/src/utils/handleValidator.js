const { validationResult } = require("express-validator");

const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  } else {
    res.status(403).json({ status: "FAILED", errors: errors.array() });
  }
};

module.exports = { validateResult };
