import { Request, Response } from "express";
import { GetAllReviewsUseCase } from "../../../application/usecases/get-all-reviews.usecase";
import { HandleError } from "../erros/handle.error";

/**
 * Controlador HTTP para operaciones relacionadas con reseñas.
 *
 * @remarks
 * Esta clase pertenece a la **capa más externa** de la aplicación
 * (*Frameworks & Drivers*), y su responsabilidad es:
 *
 * - Recibir solicitudes HTTP
 * - Extraer parámetros de la request
 * - Delegar la lógica al caso de uso correspondiente
 * - Transformar la respuesta del caso de uso en una respuesta HTTP
 *
 * ❗ No contiene lógica de negocio.
 * ❗ No accede directamente a repositorios ni datasources.
 *
 * Depende del caso de uso {@link GetAllReviewsUseCase}.
 */
export class ReviewsController {


  /**
   * Crea una nueva instancia del controlador de reseñas.
   *
   * @param getAllReviewsUseCase - Caso de uso encargado
   * de obtener el listado de reseñas
   */
  constructor(private getAllReviewsUseCase: GetAllReviewsUseCase){}


  /**
   * Maneja la petición HTTP para obtener reseñas.
   *
   * @remarks
   * Extrae el parámetro `countReviews` desde la URL,
   * ejecuta el caso de uso correspondiente y devuelve
   * la respuesta en formato JSON.
   *
   * Incluye un `setTimeout` únicamente con fines
   * demostrativos (simulación de latencia).
   *
   * Los errores son delegados al manejador centralizado
   * {@link HandleError}.
   *
   * @param req - Objeto Request de Express
   * @param res - Objeto Response de Express
   */
  getAllReviews = (req: Request, res: Response): void => {
    const { countReviews } = req.params;

    setTimeout(() => {
      this.getAllReviewsUseCase
      .execute(Number(countReviews))
      .then((reviews) => res.status(201).json(reviews))
      .catch((error) => HandleError.error(error, res));
    }, 3000);
  };
}
