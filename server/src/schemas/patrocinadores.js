/**
 * @openapi
 * components:
 *   schemas:
 *     Patrocinador:
 *      type: object
 *      properties:
 *       Pagante_id:
 *        type: integer
 *        example: 3
 *       Infantes_id:
 *        type: integer
 *        example: 6
 *       Cuenta:
 *        type: string
 *        example: "9999999"
 *       infantes:
 *         type: object
 *         $ref: "#/components/schemas/Infantes"
 *     CreatePatrocinador:
 *      type: object
 *      properties:
 *        Infantes_id:
 *          type: integer
 *        Cuenta:
 *          type: string
 * 
 * 
 */
