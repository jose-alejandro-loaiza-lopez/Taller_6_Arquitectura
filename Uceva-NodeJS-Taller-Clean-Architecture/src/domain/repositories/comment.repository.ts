import { Comment } from "../models/comment.model";


/**
 * Contrato del repositorio de comentarios.
 *
 * @remarks
 * Esta clase abstracta pertenece a la **capa de Domain**
 * y define el contrato que deben cumplir todas las
 * implementaciones de repositorios de comentarios.
 *
 * El dominio:
 * - NO conoce detalles de infraestructura
 * - NO sabe de bases de datos, APIs o frameworks
 *
 * Cualquier fuente de datos (API, base de datos, mocks,
 * archivos, etc.) puede ser utilizada siempre que
 * implemente este contrato.
 *
 * Los casos de uso dependen de esta abstracción,
 * no de implementaciones concretas.
 *
 * @see {@link Comment}
 */
export abstract class CommentRepository {
  /**
   * Obtiene un listado de comentarios.
   *
   * @remarks
   * Este método define una **operación de negocio**
   * relacionada con la obtención de comentarios,
   * sin especificar cómo ni desde dónde se obtienen.
   *
   * @param countComments - Cantidad de comentarios a obtener
   * @returns Promesa que resuelve un arreglo de {@link Comment}
   */
  abstract getAll(countComments: number): Promise<Comment[]>;
}
