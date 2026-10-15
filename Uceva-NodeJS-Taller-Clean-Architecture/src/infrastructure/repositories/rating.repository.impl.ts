import { Rating } from "../../domain/models/rating.model";
import { RatingRepository } from "../../domain/repositories/rating.repository";
import { RatingDatasource } from "../datasources/rating.datasource";

/**
 * Implementación concreta del repositorio de calificaciones.
 *
 * @remarks
 * Esta clase pertenece a la **capa de Infrastructure** y actúa como
 * un **adaptador (Repository Implementation)** entre:
 *
 * - El contrato del dominio {@link RatingRepository}
 * - La fuente de datos {@link RatingDatasource}
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
 * {@link RatingRepository}, no de esta implementación.
 *
 * @see {@link RatingRepository}
 * @see {@link RatingDatasource}
 */
export class RatingRepositoryImpl extends RatingRepository {

  /**
   * Crea una nueva instancia del repositorio de calificaciones.
   *
   * @param datasource - Fuente de datos utilizada para
   * obtener la información de calificaciones
   */
  constructor(private datasource: RatingDatasource) {
    super();
  }

  /**
   * Obtiene el listado de calificaciones.
   *
   * @remarks
   * Implementa el método definido en
   * {@link RatingRepository#getAll}.
   *
   * Este es el punto adecuado para:
   * - Transformar DTOs en modelos de dominio
   * - Aplicar reglas de adaptación
   * - Manejar errores o políticas de caché
   *
   * @param countRatings - Cantidad de calificaciones a obtener
   * @returns Promesa que resuelve un arreglo de {@link Rating}
   *
   * @example
   * ```ts
   * const repository = new RatingRepositoryImpl(new RatingDatasource());
   * const ratings = await repository.getAll(10);
   * ```
   */
  getAll(countRatings: number): Promise<Rating[]> {
    return this.datasource.getAll(countRatings);
  }
}
