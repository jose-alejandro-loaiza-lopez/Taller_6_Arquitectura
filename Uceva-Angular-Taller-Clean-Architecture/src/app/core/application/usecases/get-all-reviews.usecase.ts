import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../../domain/models/review.model';
import { ReviewRepository } from '../../domain/repositories/review.repository';

/**
 * Caso de uso para obtener el listado completo de reseñas.
 *
 * @description
 * Este caso de uso pertenece a la **capa de aplicación** y representa
 * una acción del sistema orientada al negocio: recuperar todas las
 * reseñas disponibles.
 *
 * Actúa como intermediario entre la capa de presentación y el dominio,
 * delegando la obtención de datos al contrato `ReviewRepository`.
 *
 * @remarks
 * - No conoce detalles de infraestructura.
 * - No transforma los datos para la UI.
 * - Propaga resultados y errores al consumidor.
 *
 * La dependencia se resuelve mediante **inyección por contrato**
 * utilizando la función `inject()` de Angular.
 *
 * @example
 * ```ts
 * this.getAllReviewsUseCase.execute(10).subscribe(reviews => {
 *   // manejo de resultados
 * });
 * ```
 *
 * @architecture Clean Architecture
 * @layer Application
 *
 * @see Review
 * @see ReviewRepository
 */
@Injectable()
export class GetAllReviewsUseCase {

  /**
   * Repositorio de reseñas inyectado por contrato.
   *
   * @remarks
   * La implementación concreta se define en la capa de infraestructura.
   */
  private reviewRepository = inject(ReviewRepository);

  /**
   * Ejecuta el caso de uso.
   *
   * @returns {Observable<Review[]>}
   * Observable que emite el listado completo de reseñas del dominio.
   *
   * @remarks
   * - Delegación directa al repositorio.
   * - No contiene lógica de presentación.
   * - Mantiene el principio de responsabilidad única.
   */
  execute(countReviews: number): Observable<Review[]> {
    return this.reviewRepository.getAll(countReviews);
  }
}
