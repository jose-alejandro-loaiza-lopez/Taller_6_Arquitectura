import { Review } from "../../domain/models/review.model";
import { ReviewRepository } from "../../domain/repositories/review.repository";
import { ReviewDatasource } from "../datasources/review.datasource";

/**
 * Implementación concreta del repositorio de reseñas.
 *
 * @remarks
 * Esta clase pertenece a la **capa de Infrastructure** y actúa como
 * un **adaptador (Repository Implementation)** entre:
 *
 * - El contrato del dominio {@link ReviewRepository}
 * - La fuente de datos {@link ReviewDatasource}
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
 * {@link ReviewRepository}, no de esta implementación.
 *
 * @see {@link ReviewRepository}
 * @see {@link ReviewDatasource}
 */
export class ReviewRepositoryImpl extends ReviewRepository {

  /**
   * Crea una nueva instancia del repositorio de reseñas.
   *
   * @param datasource - Fuente de datos utilizada para
   * obtener la información de reseñas
   */
  constructor(private datasource: ReviewDatasource) {
    super();
  }

  /**
   * Obtiene el listado de reseñas.
   *
   * @remarks
   * Implementa el método definido en
   * {@link ReviewRepository#getAll}.
   *
   * Este es el punto adecuado para:
   * - Transformar DTOs en modelos de dominio
   * - Aplicar reglas de adaptación
   * - Manejar errores o políticas de caché
   *
   * @param countReviews - Cantidad de reseñas a obtener
   * @returns Promesa que resuelve un arreglo de {@link Review}
   *
   * @example
   * ```ts
   * const repository = new ReviewRepositoryImpl(new ReviewDatasource());
   * const reviews = await repository.getAll(10);
   * ```
   */
  getAll(countReviews: number): Promise<Review[]> {
    return this.datasource.getAll(countReviews);
  }
}
