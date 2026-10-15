/**
 * Interfaz que representa una reseña (review).
 *
 * Contiene la información básica necesaria para mostrar una reseña
 * en la tabla o en cualquier componente de listado.
 *
 * @remarks
 * Cada reseña debe tener un `id` único, el autor (`reviewer`),
 * el producto reseñado, el comentario y un `status` de aprobación.
 *
 * @example
 * ```ts
 * const review: Review = {
 *   id: 1,
 *   reviewer: 'Carlos Ramírez',
 *   product: 'Leche entera',
 *   comment: 'Buen producto, lo recomiendo',
 *   status: 'Aprobada'
 * };
 * ```
 */
export interface Review {
  /** Identificador único de la reseña */
  id: number;

  /** Nombre del autor de la reseña */
  reviewer: string;

  /** Producto que fue reseñado */
  product: string;

  /** Comentario o texto de la reseña */
  comment: string;

  /** Estado de aprobación de la reseña */
  status: ReviewStatus;
}

/**
 * Tipo de estado de una reseña.
 *
 * @remarks
 * Este tipo restringe los estados a los valores predefinidos:
 * - 'Pendiente'
 * - 'Aprobada'
 * - 'Rechazada'
 *
 * Se utiliza principalmente para mapear badges de colores en la UI.
 *
 * @example
 * ```ts
 * const estado: ReviewStatus = 'Aprobada';
 * ```
 */
export type ReviewStatus = 'Pendiente' | 'Aprobada' | 'Rechazada';
