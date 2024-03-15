/**
 * @openapi
 * components:
 *   schemas:
 *     RelacionParentesco:
 *      type: object
 *      properties:
 *       Infante_id:
 *        type: integer
 *        example: 6
 *       Representante_id:
 *        type: integer
 *        example: 3
 *       tipoParentesco:
 *        type: integer
 *        example: 2
 *       parentesco:
 *        $ref: "#/components/schemas/Parentesco"
 *     CreateRelacionParentesco:
 *      type: object
 *      properties:
 *       Infante_id:
 *         type: integer
 *       tipoParentesco:
 *         type: integer 
 *     UpdateRelacionParentesco:
 *      type: object
 *      properties:
 *       Representante_id:
 *         type: integer
 *       Infante_id:
 *         type: integer
 *       tipoParentesco:
 *         type: integer 
 * 
 */
