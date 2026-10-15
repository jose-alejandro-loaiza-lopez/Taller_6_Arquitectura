import { Component, Input } from '@angular/core';
import { BadgeAtom, BadgeType } from '@brejcha13320/design-system-bootstrap';
import { Review, ReviewStatus } from '../../../core/domain/models/review.model';

/**
 * Componente de tabla de reseñas.
 *
 * Se utiliza para mostrar un listado de reseñas en una tabla,
 * mostrando información como id, revisor, producto, comentario
 * y un badge visual que indica el estado de cada reseña.
 *
 * @remarks
 * Este componente recibe las reseñas desde un componente padre
 * a través del Input `reviews` y utiliza el mapeo `statusMap`
 * para asignar colores a los badges según el estado.
 *
 * Forma parte de la capa de presentación de la aplicación y se considera
 * un **organismo** dentro del sistema de diseño atómico.
 *
 * @example
 * ```html
 * <app-reviews-table [reviews]="reviewsList"></app-reviews-table>
 * ```
 */
@Component({
  selector: 'app-reviews-table',
  templateUrl: './reviews-table.component.html',
  imports: [BadgeAtom],
})
export class ReviewsTableComponent {
  /**
   * Listado de reseñas que se mostrarán en la tabla.
   * @type {Review[]}
   * @remarks
   * Este Input permite pasar un array de reseñas desde un componente padre.
   * Cada reseña debe cumplir la interfaz `Review`.
   */
  @Input() reviews: Review[] = [];
  /**
   * Mapeo de estados de reseñas a tipos de Badge.
   * @type {Record<ReviewStatus, BadgeType>}
   * @remarks
   * Se utiliza para asignar colores de badges a cada estado:
   * - 'Pendiente' → 'warning' (amarillo)
   * - 'Aprobada' → 'success' (verde)
   * - 'Rechazada' → 'danger' (rojo)
   *
   * Esto permite que en la tabla cada reseña tenga un badge visual que indique su estado
   * de forma clara para el usuario.
   */
  statusMap: Record<ReviewStatus, BadgeType> = {
    'Pendiente' : 'warning',
    'Aprobada': 'success',
    'Rechazada': 'danger',
  }
}
