import { Router } from "express";
import { Container } from "../../../dependency-injection/container";

export class CommentsRoutes {
  static get routes(): Router {
    const router = Router();

    /**
     * @openapi
     * /api/comments/{countComments}:
     *   get:
     *     summary: Obtener listado de comentarios
     *     description: Retorna una lista de comentarios generados dinámicamente según la cantidad solicitada.
     *     tags:
     *       - Comments
     *     parameters:
     *       - in: path
     *         name: countComments
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *           example: 10
     *         description: Cantidad de comentarios a generar
     *     responses:
     *       200:
     *         description: Lista de comentarios generados
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Comment'
     *       400:
     *         description: Parámetro inválido
     */
    router.get("/:countComments", Container.commentsController.getAllComments);

    return router;
  }
}
