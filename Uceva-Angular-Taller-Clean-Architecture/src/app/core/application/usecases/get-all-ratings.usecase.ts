import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rating } from '../../domain/models/rating.model';
import { RatingRepository } from '../../domain/repositories/rating.repository';

/**
 * Caso de uso para obtener el listado completo de calificaciones.
 *
 * @description
 * Este caso de uso pertenece a la **capa de aplicación** y representa
 * una acción del sistema orientada al negocio: recuperar todas las
 * calificaciones disponibles.
 *
 * Actúa como intermediario entre la capa de presentación y el dominio,
 * delegando la obtención de datos al contrato `RatingRepository`.
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
 * this.getAllRatingsUseCase.execute(10).subscribe(ratings => {
 *   // manejo de resultados
 * });
 * ```
 *
 * @architecture Clean Architecture
 * @layer Application
 *
 * @see Rating
 * @see RatingRepository
 */
@Injectable()
export class GetAllRatingsUseCase {

  /**
   * Repositorio de calificaciones inyectado por contrato.
   *
   * @remarks
   * La implementación concreta se define en la capa de infraestructura.
   */
  private ratingRepository = inject(RatingRepository);

  /**
   * Ejecuta el caso de uso.
   *
   * @returns {Observable<Rating[]>}
   * Observable que emite el listado completo de calificaciones del dominio.
   *
   * @remarks
   * - Delegación directa al repositorio.
   * - No contiene lógica de presentación.
   * - Mantiene el principio de responsabilidad única.
   */
  execute(countRatings: number): Observable<Rating[]> {
    return this.ratingRepository.getAll(countRatings);
  }
}
