/**
 * @openapi
 * components:
 *   schemas:
 *     Representantes:
 *       type: object
 *       properties:
 *         Representante_id:
 *           type: integer
 *           example: 1
 *         Cedula:
 *           type: string
 *           example: 001786777797
 *         Nombre:
 *           type: string
 *           example: Jose
 *         A_Paterno:
 *           type: string
 *           example: Laureano
 *         A_Materno:
 *           type: string
 *           example: Cuevas
 *         Calle:
 *           type: string
 *           example: CalleY
 *         Numero:
 *           type: integer
 *           example: 43
 *         DireccionId:
 *           type: integer
 *           example: 5
 *         Telefono_id:
 *           type: string
 *           example: 8094533333
 *         patrocinador:
 *            type: array
 *            items:
 *              $ref: "#/components/schemas/Patrocinador"
 *         relacionparentesco:
 *            type: array
 *            items:
 *             $ref: "#/components/schemas/RelacionParentesco"
 *     Representante:
 *       type: object
 *       properties:
 *         Representante_id:
 *           type: integer
 *           example: 1
 *         Cedula:
 *           type: string
 *           example: 001786777797
 *         Nombre:
 *           type: string
 *           example: Jose
 *         A_Paterno:
 *           type: string
 *           example: Laureano
 *         A_Materno:
 *           type: string
 *           example: Cuevas
 *         Calle:
 *           type: string
 *           example: CalleY
 *         Numero:
 *           type: integer
 *           example: 43
 *         DireccionId:
 *           type: integer
 *           example: 5
 *         Telefono_id:
 *           type: string
 *           example: 8094533333
 *         patrocinador:
 *            type: array
 *            items:
 *              $ref: "#/components/schemas/Patrocinador"
 *         relacionparentesco:
 *            type: array
 *            items:
 *             $ref: "#/components/schemas/RelacionParentesco"
 *     CreateRepresentante:
 *       type: object
 *       required:
 *         - Cedula
 *         - Nombre
 *         - Telefono_id
 *       properties:
 *         Cedula:
 *           type: string
 *         Nombre:
 *           type: string
 *         A_Paterno:
 *           type: string
 *         A_Materno:
 *           type: string
 *         Calle:
 *           type: string
 *         Numero:
 *           type: integer
 *         DireccionId:
 *           type: integer
 *         Telefono_id:
 *           type: string
 *         patrocinador:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/CreatePatrocinador"
 *         relacionparentesco:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/CreateRelacionParentesco"
 *     UpdateRepresentante:
 *       type: object
 *       required:
 *         - Representante_id
 *         - Cedula
 *         - Nombre
 *         - Telefono_id
 *       properties:
 *         Representante_id:
 *           type: integer
 *         Cedula:
 *           type: string
 *         Nombre:
 *           type: string
 *         A_Paterno:
 *           type: string
 *         A_Materno:
 *           type: string
 *         Calle:
 *           type: string
 *         Numero:
 *           type: integer
 *         DireccionId:
 *           type: integer
 *         Telefono_id:
 *           type: string
 *         patrocinador:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/UpdatePatrocinador"
 *         relacionparentesco:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/UpdateRelacionParentesco"
 * 
 * 
 */
