import { Request, Response } from "express";
import { GetAllCommentsUseCase } from "../../../application/usecases/get-all-comments.usecase";
import { HandleError } from "../erros/handle.error";

/**
 * Controlador HTTP para operaciones relacionadas con comentarios.
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
 * Depende del caso de uso {@link GetAllCommentsUseCase}.
 */
export class CommentsController {


  /**
   * Crea una nueva instancia del controlador de comentarios.
   *
   * @param getAllCommentsUseCase - Caso de uso encargado
   * de obtener el listado de comentarios
   */
  constructor(private getAllCommentsUseCase: GetAllCommentsUseCase){}


  /**
   * Maneja la petición HTTP para obtener comentarios.
   *
   * @remarks
   * Extrae el parámetro `countComments` desde la URL,
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
  getAllComments = (req: Request, res: Response): void => {
    const { countComments } = req.params;

    setTimeout(() => {
      this.getAllCommentsUseCase
      .execute(Number(countComments))
      .then((comments) => res.status(201).json(comments))
      .catch((error) => HandleError.error(error, res));
    }, 3000);
  };
}
