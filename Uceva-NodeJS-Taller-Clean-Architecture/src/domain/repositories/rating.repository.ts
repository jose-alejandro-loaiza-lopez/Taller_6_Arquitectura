import { Rating } from "../models/rating.model";


/**
 * Contrato del repositorio de calificaciones.
 *
 * @remarks
 * Esta clase abstracta pertenece a la **capa de Domain**
 * y define el contrato que deben cumplir todas las
 * implementaciones de repositorios de calificaciones.
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
 * @see {@link Rating}
 */
export abstract class RatingRepository {
  /**
   * Obtiene un listado de calificaciones.
   *
   * @remarks
   * Este método define una **operación de negocio**
   * relacionada con la obtención de calificaciones,
   * sin especificar cómo ni desde dónde se obtienen.
   *
   * @param countRatings - Cantidad de calificaciones a obtener
   * @returns Promesa que resuelve un arreglo de {@link Rating}
   */
  abstract getAll(countRatings: number): Promise<Rating[]>;
}
