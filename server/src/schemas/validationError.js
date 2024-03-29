/**
 * @openapi
 * components:
 *   schemas:
 *     ValidationError:
 *      type: object
 *      properties:
 *       status:
 *        type: string
 *        example: FAILED
 *       errors:
 *         type: array
 *         items:
 *          type: object
 *          properties:
 *            type:
 *              type: string
 *              example: field
 *            value:
 *              type: string
 *              example: 40299887765
 *            msg: 
 *              type: string
 *              example: Cause of validation error
 *            path: 
 *              type: string
 *              example: Cedula
 *            location:
 *              type: string
 *              example: body
 *  
 * */