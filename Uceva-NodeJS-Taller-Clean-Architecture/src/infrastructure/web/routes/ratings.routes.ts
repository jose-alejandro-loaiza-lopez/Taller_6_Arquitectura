import { Router } from "express";
import { Container } from "../../../dependency-injection/container";

export class RatingsRoutes {
  static get routes(): Router {
    const router = Router();

    /**
     * @openapi
     * /api/ratings/{countRatings}:
     *   get:
     *     summary: Obtener listado de calificaciones
     *     description: Retorna una lista de calificaciones generadas dinámicamente según la cantidad solicitada.
     *     tags:
     *       - Ratings
     *     parameters:
     *       - in: path
     *         name: countRatings
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *           example: 10
     *         description: Cantidad de calificaciones a generar
     *     responses:
     *       200:
     *         description: Lista de calificaciones generadas
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Rating'
     *       400:
     *         description: Parámetro inválido
     */
    router.get("/:countRatings", Container.ratingsController.getAllRatings);

    return router;
  }
}
