import { Comment } from "../../domain/models/comment.model";
import { CommentRepository } from "../../domain/repositories/comment.repository";
import { CommentDatasource } from "../datasources/comment.datasource";

/**
 * Implementación concreta del repositorio de comentarios.
 *
 * @remarks
 * Esta clase pertenece a la **capa de Infrastructure** y actúa como
 * un **adaptador (Repository Implementation)** entre:
 *
 * - El contrato del dominio {@link CommentRepository}
 * - La fuente de datos {@link CommentDatasource}
 *
 * Su responsabilidad es:
 * - Cumplir el contrato definido por el dominio
 * - Delegar la obtención de datos al datasource
 * - Adaptar o transformar los datos si fuese necesario
 *
 * ❗ No contiene lógica de negocio.
 * ❗ No debe ser utilizada directamente por los casos de uso.
 *
 * Los casos de uso dependen únicamente del contrato
 * {@link CommentRepository}, no de esta implementación.
 *
 * @see {@link CommentRepository}
 * @see {@link CommentDatasource}
 */
export class CommentRepositoryImpl extends CommentRepository {

  /**
   * Crea una nueva instancia del repositorio de comentarios.
   *
   * @param datasource - Fuente de datos utilizada para
   * obtener la información de comentarios
   */
  constructor(private datasource: CommentDatasource) {
    super();
  }

  /**
   * Obtiene el listado de comentarios.
   *
   * @remarks
   * Implementa el método definido en
   * {@link CommentRepository#getAll}.
   *
   * Este es el punto adecuado para:
   * - Transformar DTOs en modelos de dominio
   * - Aplicar reglas de adaptación
   * - Manejar errores o políticas de caché
   *
   * @param countComments - Cantidad de comentarios a obtener
   * @returns Promesa que resuelve un arreglo de {@link Comment}
   *
   * @example
   * ```ts
   * const repository = new CommentRepositoryImpl(new CommentDatasource());
   * const comments = await repository.getAll(10);
   * ```
   */
  getAll(countComments: number): Promise<Comment[]> {
    return this.datasource.getAll(countComments);
  }
}
