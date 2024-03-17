const { Router } = require("express");
const {
  getRepresentante,
  getRepresentantes,
  postRepresentante,
  putRepresentante,
  deleteRepresentante,
} = require("../../controllers/representantesController");
const {
  validatorCreateRepresentante,
  validatorUpdateRepresentante,
  validatorIdParameterRepresentante,
} = require("../../validators/representante");

const routes = Router();

/**
 * @openapi
 * /api/v1/representantes:
 *   get:
 *     summary: Get representantes
 *     description: Get all representantes
 *     tags:
 *       - Representantes
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                    type: string
 *                    example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                    representantes:
 *                      type: array
 *                      items:
 *                        $ref: "#/components/schemas/Representantes"
 *       500:
 *         description: An error ocurred
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                    type: string
 *                    example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                    error:
 *                     type: string
 *                     example: "error message"
 *
 */

routes.get("/representantes", getRepresentantes);

/**
 * @openapi
 * /api/v1/representantes/{Representante_id}:
 *   get:
 *     summary: Get representante
 *     description: Get one representante
 *     parameters:
 *        - in: path
 *          name : Representante_id
 *          description: The id of representante
 *     tags:
 *       - Representantes
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                    type: string
 *                    example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                    representante:
 *                     $ref: "#/components/schemas/Representante"
 *       404:
 *         description: An error ocurred
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                    type: string
 *                    example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                    error:
 *                     type: string
 *                     example: "error message"
 *
 */

routes.get(
  "/representantes/:id",
  validatorIdParameterRepresentante,
  getRepresentante
);

/**
 * @openapi
 * /api/v1/representantes:
 *   post:
 *      summary: Create a representante
 *      description: Create a new representante - You can create a representante without including "relacionparentesco" & "patrocinador" just omitting them.
 *      tags:
 *       - Representantes
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/CreateRepresentante"
 *      responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                    type: string
 *                    example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                    representante:
 *                     $ref: "#/components/schemas/Representante"
 *       500:
 *         description: An error ocurred
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                    type: string
 *                    example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                    error:
 *                     type: string
 *                     example: "error message"
 */
routes.post(
  "/representantes/",
  validatorCreateRepresentante,
  postRepresentante
);

/**
 * @openapi
 * /api/v1/representantes/{Representante_id}:
 *   put:
 *      summary: Update a representante
 *      description: Update a representante - You can update a representante without including "relacionparentesco" & "patrocinador" just omitting them.
 *      parameters:
 *        - in: path
 *          name : Representante_id
 *          description: The id of representante
 *      tags:
 *       - Representantes
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/UpdateRepresentante"
 *      responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                    type: string
 *                    example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                    representante:
 *                     $ref: "#/components/schemas/Representante"
 *       500:
 *         description: An error ocurred
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                    type: string
 *                    example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                    error:
 *                     type: string
 *                     example: "error message"
 */
routes.put(
  "/representantes/:id",
  validatorUpdateRepresentante,
  putRepresentante
);

/**
 * @openapi
 * /api/v1/representantes/{Representante_id}:
 *   delete:
 *      summary: Delete a representante
 *      description: Delete a representante.
 *      tags:
 *       - Representantes
 *      parameters:
 *        - in: path
 *          name: Representante_id
 *          description: The id of representante
 *      responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                    type: string
 *                    example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                    representanteDeleted:
 *                     $ref: "#/components/schemas/Representante"
 *       404:
 *         description: An error ocurred
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                    type: string
 *                    example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                    error:
 *                     type: string
 *                     example: "error message"
 *
 */
routes.delete(
  "/representantes/:id",
  validatorIdParameterRepresentante,
  deleteRepresentante
);

module.exports = routes;
