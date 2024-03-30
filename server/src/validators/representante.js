const { check, body, param } = require("express-validator");
const { validateResult } = require("../utils/handleValidator");
const {
  validatorCreatePatrocinador,
  validatorUpdatePatrocinador,
} = require("./patrocinador");
const {
  validatorCreateRelacionParentesco,
  validatorUpdateRelacionParentesco,
} = require("./relacionparentesco");
const { validaCedula } = require("../utils/cedulaValidator");

const validatorCreateRepresentante = [
  check("Cedula")
    .exists()
    .bail()
    .withMessage("You must use the field 'Cedula'")
    .notEmpty()
    .bail()
    .withMessage("The field 'Cedula' cannot be null or undefined")
    .isLength({ min: 11, max: 11 })
    .withMessage("The field 'Cedula' should have 11 characters of length")
    .custom((ced) => validaCedula(ced))
    .withMessage("Insert a valid Cedula"),

  check("Nombre")
    .exists()
    .bail()
    .withMessage("You should use the field 'Nombre'")
    .isString()
    .bail()
    .withMessage("The field 'Nombre' should be a valid string")
    .notEmpty()
    .bail()
    .withMessage("The field 'Nombre' cannot be null or undefined")
    .bail()
    .isLength({ min: 2, max: 20 })
    .bail()
    .withMessage("The field 'Nombre' must have a length between 2 and 20")
    .isAlpha()
    .withMessage(
      "This field 'Nombre' must contain only alphabetical characters"
    ),
  check("A_Paterno")
    .optional()
    .isString()
    .bail()
    .withMessage("The field 'A_Paterno' should be a valid string")
    .notEmpty()
    .bail()
    .withMessage("The field 'A_Paterno' cannot be null or undefined")
    .isLength({ min: 2, max: 20 })
    .bail()
    .withMessage("The field 'A_Paterno' must have a length between 2 and 20")
    .isAlpha()
    .withMessage(
      "This field 'A_Paterno' should contain only alphabetical characters"
    ),
  check("A_Materno")
    .optional()
    .isString()
    .bail()
    .withMessage("The field 'A_Materno' should be a valid string")
    .notEmpty()
    .bail()
    .withMessage("The field 'A_Materno' cannot be null or undefined")
    .isLength({ min: 2, max: 20 })
    .bail()
    .withMessage("The field 'A_Materno' must have a length between 2 and 20")
    .isAlpha()
    .withMessage(
      "This field 'A_Materno' should contain only alphabetical characters"
    ),
  check("Calle")
    .optional()
    .isString()
    .bail()
    .withMessage("The field 'Calle' should be a valid string")
    .notEmpty()
    .bail()
    .withMessage("The field 'Calle' cannot be null or undefined")
    .isLength({ min: 2, max: 20 })
    .withMessage("The field 'Calle' must have a length between 2 and 20"),
  check("Numero")
    .optional()
    .notEmpty()
    .bail()
    .withMessage("You must use the field 'Numero'")
    .isNumeric()
    .withMessage("The field 'Numero' should be a number"),
  check("DireccionId")
    .optional()
    .notEmpty()
    .bail()
    .withMessage("The field 'DireccionId' cannot be null or undefined")
    .isInt({ min: 1 })
    .withMessage("The field 'DireccionId' cannot be zero or negative"),
  check("Telefono_id")
    .exists()
    .bail()
    .withMessage("You must use the field 'Telefono_id'")
    .isString()
    .bail()
    .withMessage("The field 'Telefono_id' should be a valid string")
    .notEmpty()
    .bail()
    .withMessage("The field 'Telefono_id' cannot be null or undefined")
    .isMobilePhone()
    .withMessage("Insert a valid phone number"),

  async (req, res, next) => {
    if (req.body.patrocinador?.length > 0) {
      await validatorCreatePatrocinador(req, res, next);
    }
    next();
  },
  async (req, res, next) => {
    if (req.body.relacionparentesco?.length > 0) {
      await validatorCreateRelacionParentesco(req, res, next);
    }
    next();
  },

  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validatorUpdateRepresentante = [
  param("id")
    .notEmpty()
    .bail()
    .withMessage("You must use the field 'Representante_id'")
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
    .bail()
    .withMessage("You must use the field 'Nombre'")
    .isString()
    .bail()
    .withMessage("The field 'Nombre' should be a valid string")
    .notEmpty()
    .bail()
    .withMessage("The field 'Nombre' cannot be null or undefined")
    .bail()
    .isLength({ min: 2, max: 20 })
    .bail()
    .withMessage("The field 'Nombre' must have a length between 2 and 20")
    .isAlpha()
    .withMessage(
      "This field 'Nombre' must contain only alphabetical characters"
    ),
  check("A_Paterno")
    .optional()
    .isString()
    .bail()
    .withMessage("The field 'A_Paterno' should be a valid string")
    .notEmpty()
    .bail()
    .withMessage("The field 'A_Paterno' cannot be null or undefined")
    .isLength({ min: 2, max: 20 })
    .bail()
    .withMessage("The field 'A_Paterno' must have a length between 2 and 20")
    .isAlpha()
    .withMessage(
      "This field 'A_Paterno' should contain only alphabetical characters"
    ),
  check("A_Materno")
    .optional()
    .isString()
    .bail()
    .withMessage("The field 'A_Materno' should be a valid string")
    .notEmpty()
    .bail()
    .withMessage("The field 'A_Materno' cannot be null or undefined")
    .isLength({ min: 2, max: 20 })
    .bail()
    .withMessage("The field 'A_Materno' must have a length between 2 and 20")
    .isAlpha()
    .withMessage(
      "This field 'A_Materno' should contain only alphabetical characters"
    ),
  check("Calle")
    .optional()
    .isString()
    .bail()
    .withMessage("The field 'Calle' should be a valid string")
    .notEmpty()
    .bail()
    .withMessage("The field 'Calle' cannot be null or undefined")
    .isLength({ min: 2, max: 20 })
    .withMessage("The field 'Calle' must have a length between 2 and 20"),
  check("Numero")
    .optional()
    .notEmpty()
    .bail()
    .withMessage("You must use the field 'Numero'")
    .isNumeric()
    .withMessage("The field 'Numero' should be a number"),
  check("DireccionId")
    .optional()
    .notEmpty()
    .bail()
    .withMessage("The field 'DireccionId' cannot be null or undefined")
    .isInt({ min: 1 })
    .withMessage("The field 'DireccionId' cannot be zero or negative"),
  check("Telefono_id")
    .exists()
    .bail()
    .withMessage("You must use the field 'Telefono_id'")
    .isString()
    .bail()
    .withMessage("The field 'Telefono_id' should be a valid string")
    .notEmpty()
    .bail()
    .withMessage("The field 'Telefono_id' cannot be null or undefined")
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
    .withMessage("You should use the field 'Representante_id'")
    .toInt()
    .bail()
    .withMessage("The param 'Representante_id' should be a number")
    .isInt({ min: 1 })
    .bail()
    .withMessage("The param 'Representante_id' cannot be zero or negative"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
module.exports = {
  validatorCreateRepresentante,
  validatorUpdateRepresentante,
  validatorIdParameterRepresentante,
};
