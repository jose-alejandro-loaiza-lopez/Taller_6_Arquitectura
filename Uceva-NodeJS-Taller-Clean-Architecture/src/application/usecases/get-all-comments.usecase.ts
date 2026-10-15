import { Comment } from "../../domain/models/comment.model";
import { CommentRepository } from "../../domain/repositories/comment.repository";

/**
 * Caso de uso para obtener un listado de comentarios.
 *
 * @remarks
 * Esta clase pertenece a la **capa de Application**
 * y representa una **regla de negocio de la aplicación**.
 *
 * Su responsabilidad es:
 * - Orquestar la obtención de comentarios
 * - Coordinar la interacción con el repositorio
 *
 * ❗ No conoce detalles de infraestructura.
 * ❗ No depende de implementaciones concretas.
 *
 * Depende únicamente del contrato
 * {@link CommentRepository} definido en el dominio.
 *
 * @see {@link CommentRepository}
 * @see {@link Comment}
 */
export class GetAllCommentsUseCase {

  /**
   * Crea una nueva instancia del caso de uso.
   *
   * @param commentRepository - Repositorio de comentarios
   * utilizado para acceder a los datos
   */
  constructor(private commentRepository: CommentRepository) {}

  /**
   * Ejecuta el caso de uso.
   *
   * @remarks
   * Obtiene una cantidad determinada de comentarios
   * delegando el acceso a datos al repositorio.
   *
   * Aquí se pueden agregar:
   * - Validaciones de entrada
   * - Reglas de negocio simples
   * - Orquestación de múltiples repositorios
   *
   * @param countComments - Cantidad de comentarios a obtener
   * @returns Promesa que resuelve un arreglo de {@link Comment}
   *
   * @example
   * ```ts
   * const useCase = new GetAllCommentsUseCase(commentRepository);
   * const comments = await useCase.execute(10);
   * ```
   */
  execute(countComments: number): Promise<Comment[]> {
    return this.commentRepository.getAll(countComments);
  }
}
