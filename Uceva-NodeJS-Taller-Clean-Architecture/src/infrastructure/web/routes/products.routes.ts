import { Router } from "express";
import { Container } from "../../../dependency-injection/container";

export class ProductsRoutes {
  static get routes(): Router {
    const router = Router();

    /**
     * @openapi
     * /api/products/{countProducts}:
     *   get:
     *     summary: Obtener listado de productos
     *     description: Retorna una lista de productos generados dinámicamente según la cantidad solicitada.
     *     tags:
     *       - Products
     *     parameters:
     *       - in: path
     *         name: countProducts
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *           example: 10
     *         description: Cantidad de productos a generar
     *     responses:
     *       200:
     *         description: Lista de productos generados
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Product'
     *       400:
     *         description: Parámetro inválido
     */
    router.get("/:countProducts", Container.productsController.getAllProducts);

    return router;
  }
}