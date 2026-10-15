/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       description: Representa un usuario del sistema
 *       required:
 *         - id
 *         - name
 *         - lastName
 *         - age
 *         - email
 *         - engineering
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         name:
 *           type: string
 *           example: Carlos
 *         lastName:
 *           type: string
 *           example: Ramírez
 *         age:
 *           type: number
 *           example: 22
 *         email:
 *           type: string
 *           format: email
 *           example: carlos.ramirez@example.com
 *         engineering:
 *           type: string
 *           enum:
 *             - Sistemas
 *             - Electronica
 *             - Biomedica
 *             - Industrial
 *             - Ambiental
 *           example: Sistemas
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       description: Representa un producto del sistema
 *       required:
 *         - id
 *         - name
 *         - category
 *         - price
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         name:
 *           type: string
 *           example: Leche entera
 *         category:
 *           type: string
 *           enum:
 *             - Lacteos
 *             - Carnes
 *             - Frutas
 *             - Verduras
 *           example: Lacteos
 *         price:
 *           type: number
 *           example: 4500
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       description: Representa una reseña del sistema
 *       required:
 *         - id
 *         - reviewer
 *         - product
 *         - comment
 *         - status
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         reviewer:
 *           type: string
 *           example: Carlos Ramírez
 *         product:
 *           type: string
 *           example: Leche entera
 *         comment:
 *           type: string
 *           example: Buen producto, lo recomiendo
 *         status:
 *           type: string
 *           enum:
 *             - Pendiente
 *             - Aprobada
 *             - Rechazada
 *           example: Aprobada
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Rating:
 *       type: object
 *       description: Representa una calificación del sistema
 *       required:
 *         - id
 *         - rater
 *         - product
 *         - score
 *         - level
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         rater:
 *           type: string
 *           example: Ana Gómez
 *         product:
 *           type: string
 *           example: Manzana roja
 *         score:
 *           type: number
 *           example: 5
 *         level:
 *           type: string
 *           enum:
 *             - Bajo
 *             - Medio
 *             - Alto
 *           example: Alto
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       description: Representa un comentario del sistema
 *       required:
 *         - id
 *         - author
 *         - subject
 *         - message
 *         - type
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         author:
 *           type: string
 *           example: Carlos Ramírez
 *         subject:
 *           type: string
 *           example: Leche entera
 *         message:
 *           type: string
 *           example: Excelente relación calidad-precio
 *         type:
 *           type: string
 *           enum:
 *             - General
 *             - Soporte
 *             - Sugerencia
 *           example: General
 */
export {};