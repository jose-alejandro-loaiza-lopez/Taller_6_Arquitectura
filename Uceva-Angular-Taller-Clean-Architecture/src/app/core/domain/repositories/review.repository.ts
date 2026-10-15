import { Observable } from 'rxjs';
import { Review } from '../models/review.model';

/**
 * Contrato del repositorio de reseñas.
 *
 * @description
 * Esta clase abstracta define el **contrato de acceso a datos**
 * para la entidad `Review` dentro del dominio.
 *
 * Forma parte de la **capa de dominio** y establece las operaciones
 * que cualquier implementación concreta debe cumplir, sin exponer
 * detalles de infraestructura (HTTP, base de datos, mocks, etc.).
 *
 * @remarks
 * Las implementaciones concretas de este repositorio pueden residir
 * en la capa de infraestructura y ser intercambiables sin afectar
 * al resto del sistema.
 *
 * @example
 * ```ts
 * // Inyección de dependencia por contrato
 * constructor(private reviewRepository: ReviewRepository) {}
 * ```
 *
 * @architecture Clean Architecture
 * @layer Domain
 *
 * @see Review
 */
export abstract class ReviewRepository {

  /**
   * Obtiene el listado completo de reseñas.
   *
   * @returns {Observable<Review[]>}
   * Observable que emite un arreglo de reseñas del dominio.
   *
   * @remarks
   * - No define la fuente de datos.
   * - No gestiona errores de presentación.
   * - Propaga los errores al consumidor.
   */
  abstract getAll(countReviews: number): Observable<Review[]>;
}
