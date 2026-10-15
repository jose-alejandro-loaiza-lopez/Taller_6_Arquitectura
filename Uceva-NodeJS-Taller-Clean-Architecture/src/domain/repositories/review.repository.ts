import { Review } from "../models/review.model";


/**
 * Contrato del repositorio de reseñas.
 *
 * @remarks
 * Esta clase abstracta pertenece a la **capa de Domain**
 * y define el contrato que deben cumplir todas las
 * implementaciones de repositorios de reseñas.
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
 * @see {@link Review}
 */
export abstract class ReviewRepository {
  /**
   * Obtiene un listado de reseñas.
   *
   * @remarks
   * Este método define una **operación de negocio**
   * relacionada con la obtención de reseñas,
   * sin especificar cómo ni desde dónde se obtienen.
   *
   * @param countReviews - Cantidad de reseñas a obtener
   * @returns Promesa que resuelve un arreglo de {@link Review}
   */
  abstract getAll(countReviews: number): Promise<Review[]>;
}
