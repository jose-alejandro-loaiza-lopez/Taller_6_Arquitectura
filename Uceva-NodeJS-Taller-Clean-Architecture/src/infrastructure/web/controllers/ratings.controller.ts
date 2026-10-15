import { Request, Response } from "express";
import { GetAllRatingsUseCase } from "../../../application/usecases/get-all-ratings.usecase";
import { HandleError } from "../erros/handle.error";

/**
 * Controlador HTTP para operaciones relacionadas con calificaciones.
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
 * Depende del caso de uso {@link GetAllRatingsUseCase}.
 */
export class RatingsController {


  /**
   * Crea una nueva instancia del controlador de calificaciones.
   *
   * @param getAllRatingsUseCase - Caso de uso encargado
   * de obtener el listado de calificaciones
   */
  constructor(private getAllRatingsUseCase: GetAllRatingsUseCase){}


  /**
   * Maneja la petición HTTP para obtener calificaciones.
   *
   * @remarks
   * Extrae el parámetro `countRatings` desde la URL,
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
  getAllRatings = (req: Request, res: Response): void => {
    const { countRatings } = req.params;

    setTimeout(() => {
      this.getAllRatingsUseCase
      .execute(Number(countRatings))
      .then((ratings) => res.status(201).json(ratings))
      .catch((error) => HandleError.error(error, res));
    }, 3000);
  };
}
