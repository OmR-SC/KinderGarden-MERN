const { body } = require("express-validator");

const validatorUpdatePatrocinador = async (req, res, next) => {
  await body("patrocinador.*.Pagante_id")
    .notEmpty()
    .bail()
    .withMessage("You must use the field 'Pagante_id'")
    .isNumeric()
    .bail()
    .withMessage("Must be a number")
    .isInt({ min: 1 })
    .bail()
    .withMessage("The value cannot be zero or negative")
    .custom((id, { req }) => {
      if (req.params.id != id) {
        throw new Error(
          "The id given in the parameter and 'Pagante_id' must have the same value"
        );
      }
      return true;
    })
    .run(req),
    await body("patrocinador.*.Infantes_id")
      .notEmpty()
      .bail()
      .withMessage("You must use the field 'Infantes_id'")
      .isNumeric()
      .bail()
      .withMessage("Must be a number")
      .isInt({ min: 1 })
      .withMessage("The value cannot be zero or negative")
      .run(req),
    await body("patrocinador.*.Cuenta")
      .notEmpty()
      .bail()
      .withMessage("You must use the field 'Cuenta'")
      .isString()
      .withMessage("'Cuenta' should be a string'")
      .run(req);
};

module.exports = { validatorUpdatePatrocinador };
