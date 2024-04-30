const { body } = require("express-validator");

const validatorCreateRelacionParentesco = async (req, res, next) => {
  await body("relacionparentesco.*.Infante_id")
    .notEmpty()
    .bail()
    .withMessage("You must use the field 'Infante_id'")
    .isNumeric()
    .bail()
    .withMessage("Must be a number")
    .isInt({ min: 1 })
    .withMessage("The value cannot be zero or negative")
    .run(req),
    await body("relacionparentesco.*.tipoParentesco")
      .notEmpty()
      .bail()
      .withMessage("You must use the field 'tipoParentesco'")
      .isNumeric()
      .bail()
      .withMessage("Must be a number")
      .isInt({ min: 1 })
      .withMessage("The value cannot be zero or negative")
      .run(req);
};

const validatorUpdateRelacionParentesco = async (req, res, next) => {
  await body("relacionparentesco.*.Representante_id")
    .notEmpty()
    .bail()
    .withMessage("You must use the field 'Representante_id'")
    .isNumeric()
    .bail()
    .withMessage("Must be a number")
    .isInt({ min: 1 })
    .bail()
    .withMessage("The value cannot be zero or negative")
    .custom((id, { req }) => {
      if (req.params.id != id) {
        throw new Error(
          "The id given in the parameter and 'Representante_id' must have the same value"
        );
      }
      return true;
    })
    .run(req),
    await body("relacionparentesco.*.Infante_id")
      .notEmpty()
      .bail()
      .withMessage("You must use the field 'Infante_id'")
      .isNumeric()
      .bail()
      .withMessage("Must be a number")
      .isInt({ min: 1 })
      .withMessage("The value cannot be zero or negative")
      .run(req),
    await body("relacionparentesco.*.tipoParentesco")
      .notEmpty()
      .bail()
      .withMessage("You must use the field 'tipoParentesco'")
      .isNumeric()
      .bail()
      .withMessage("Must be a number")
      .isInt({ min: 1 })
      .withMessage("The value cannot be zero or negative")
      .run(req);
};

module.exports = {
  validatorUpdateRelacionParentesco,
  validatorCreateRelacionParentesco,
};
