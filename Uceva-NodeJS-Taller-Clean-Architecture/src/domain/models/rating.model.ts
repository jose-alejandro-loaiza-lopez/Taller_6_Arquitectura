/**
 * Interfaz que representa una calificación (rating).
 *
 * Contiene la información básica necesaria para mostrar una calificación
 * en la tabla o en cualquier componente de listado.
 *
 * @remarks
 * Cada calificación debe tener un `id` único, el autor (`rater`),
 * el producto calificado, un `score` numérico y su `level`.
 *
 * @example
 * ```ts
 * const rating: Rating = {
 *   id: 1,
 *   rater: 'Ana Gómez',
 *   product: 'Manzana roja',
 *   score: 5,
 *   level: 'Alto'
 * };
 * ```
 */
export interface Rating {
  /** Identificador único de la calificación */
  id: number;

  /** Nombre del autor de la calificación */
  rater: string;

  /** Producto que fue calificado */
  product: string;

  /** Puntaje numérico de la calificación */
  score: number;

  /** Nivel general de la calificación */
  level: RatingLevel;
}

/**
 * Tipo de nivel de una calificación.
 *
 * @remarks
 * Este tipo restringe los niveles a los valores predefinidos:
 * - 'Bajo'
 * - 'Medio'
 * - 'Alto'
 *
 * @example
 * ```ts
 * const nivel: RatingLevel = 'Alto';
 * ```
 */
export type RatingLevel = 'Bajo' | 'Medio' | 'Alto';
