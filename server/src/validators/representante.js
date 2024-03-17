const { check, body, param } = require("express-validator");
const { validateResult } = require("../utils/handleValidator");
const { validatorUpdatePatrocinador } = require("./patrocinador");
const { validatorUpdateRelacionParentesco } = require("./relacionparentesco");
const { validaCedula } = require("../utils/cedulaValidator");

const validatorCreateRepresentante = [
  check("Cedula")
    .exists()
    .notEmpty()
    .isLength({ min: 11, max: 11 })
    .withMessage("Cedula must have 11 characters of length")
    .custom((ced) => validaCedula(ced))
    .withMessage("Insert a valid Cedula"),

  check("Nombre")
    .exists()
    .notEmpty()
    .isString()
    .isLength({ min: 2, max: 20 })
    .isAlpha(),
  check("A_Paterno")
    .optional()
    .notEmpty()
    .isString()
    .isLength({ min: 2, max: 20 })
    .isAlpha(),
  check("A_Materno")
    .optional()
    .notEmpty()
    .isString()
    .isLength({ min: 2, max: 20 })
    .isAlpha(),
  check("Calle").optional().notEmpty().isString().isLength({ min: 2, max: 20 }),
  check("Numero").optional().notEmpty().isNumeric(),
  check("DireccionId")
    .optional()
    .notEmpty()
    .isInt({ min: 1 })
    .withMessage("The value cannot be zero or negative"),
  check("Telefono_id")
    .exists()
    .notEmpty()
    .isString()
    .isMobilePhone()
    .withMessage("Insert a valid phone number"),

  check("patrocinador.*.Infantes_id")
    .optional()
    .isInt({ min: 1 })
    .withMessage("The value cannot be zero or negative"),
  check("patrocinador.*.Cuenta").optional().notEmpty().isString(),

  check("relacionparentesco.*.Infante_id")
    .optional()
    .isInt({ min: 1 })
    .withMessage("The value cannot be zero or negative"),
  check("relacionparentesco.*.tipoParentesco")
    .optional()
    .isInt({ min: 1 })
    .withMessage("The value cannot be zero or negative"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validatorUpdateRepresentante = [
  param("id")
    .notEmpty()
    .bail()
    .withMessage("You must use the param 'Representante_id'")
    .toInt()
    .isInt({ min: 1 })
    .bail()
    .withMessage("The value cannot be zero or negative"),
  check("Representante_id")
    .notEmpty()
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
    }),

  check("Cedula")
    .exists()
    .notEmpty()
    .isLength({ min: 11, max: 11 })
    .withMessage("Cedula must have 11 characters of length")
    .custom((ced) => validaCedula(ced))
    .withMessage("Insert a valid Cedula"),

  check("Nombre")
    .exists()
    .notEmpty()
    .isString()
    .bail()
    .isLength({ min: 2, max: 20 })
    .isAlpha(),
  check("A_Paterno")
    .optional()
    .notEmpty()
    .isString()
    .bail()
    .isLength({ min: 2, max: 20 })
    .isAlpha(),
  check("A_Materno")
    .optional()
    .notEmpty()
    .isString()
    .bail()
    .isLength({ min: 2, max: 20 })
    .isAlpha(),
  check("Calle")
    .optional()
    .notEmpty()
    .isString()
    .bail()
    .isLength({ min: 2, max: 20 }),
  check("Numero").optional().notEmpty().isNumeric(),
  check("DireccionId")
    .optional()
    .notEmpty()
    .isInt({ min: 1 })
    .withMessage("The value cannot be zero or negative"),
  check("Telefono_id")
    .exists()
    .notEmpty()
    .isString()
    .isMobilePhone()
    .withMessage("Insert a valid phone number"),

  async (req, res, next) => {
    if (req.body.patrocinador?.length > 0) {
      await validatorUpdatePatrocinador(req, res, next);
    }
    next();
  },
  async (req, res, next) => {
    if (req.body.relacionparentesco?.length > 0) {
      await validatorUpdateRelacionParentesco(req, res, next);
    }
    next();
  },

  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validatorIdParameterRepresentante = [
  param("id")
    .notEmpty()
    .bail()
    .withMessage("You must use the param 'Representante_id'")
    .toInt()
    .isInt({ min: 1 })
    .bail()
    .withMessage("The value cannot be zero or negative"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
module.exports = {
  validatorCreateRepresentante,
  validatorUpdateRepresentante,
  validatorIdParameterRepresentante,
};
