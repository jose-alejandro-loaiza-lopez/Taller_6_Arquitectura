import { Component, Input } from '@angular/core';
import { BadgeAtom, BadgeType } from '@brejcha13320/design-system-bootstrap';
import { Rating, RatingLevel } from '../../../core/domain/models/rating.model';

/**
 * Componente de tabla de calificaciones.
 *
 * Se utiliza para mostrar un listado de calificaciones en una tabla,
 * mostrando información como id, calificador, producto, puntaje
 * y un badge visual que indica el nivel de cada calificación.
 *
 * @remarks
 * Este componente recibe las calificaciones desde un componente padre
 * a través del Input `ratings` y utiliza el mapeo `levelMap`
 * para asignar colores a los badges según el nivel.
 *
 * Forma parte de la capa de presentación de la aplicación y se considera
 * un **organismo** dentro del sistema de diseño atómico.
 *
 * @example
 * ```html
 * <app-ratings-table [ratings]="ratingsList"></app-ratings-table>
 * ```
 */
@Component({
  selector: 'app-ratings-table',
  templateUrl: './ratings-table.component.html',
  imports: [BadgeAtom],
})
export class RatingsTableComponent {
  /**
   * Listado de calificaciones que se mostrarán en la tabla.
   * @type {Rating[]}
   * @remarks
   * Este Input permite pasar un array de calificaciones desde un componente padre.
   * Cada calificación debe cumplir la interfaz `Rating`.
   */
  @Input() ratings: Rating[] = [];
  /**
   * Mapeo de niveles de calificación a tipos de Badge.
   * @type {Record<RatingLevel, BadgeType>}
   * @remarks
   * Se utiliza para asignar colores de badges a cada nivel:
   * - 'Bajo' → 'danger' (rojo)
   * - 'Medio' → 'warning' (amarillo)
   * - 'Alto' → 'success' (verde)
   *
   * Esto permite que en la tabla cada calificación tenga un badge visual que indique su nivel
   * de forma clara para el usuario.
   */
  levelMap: Record<RatingLevel, BadgeType> = {
    'Bajo' : 'danger',
    'Medio': 'warning',
    'Alto': 'success',
  }
}
