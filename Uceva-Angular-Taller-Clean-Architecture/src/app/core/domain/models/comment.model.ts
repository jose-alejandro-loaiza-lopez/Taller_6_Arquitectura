/**
 * Interfaz que representa un comentario (comment).
 *
 * Contiene la información básica necesaria para mostrar un comentario
 * en la tabla o en cualquier componente de listado.
 *
 * @remarks
 * Cada comentario debe tener un `id` único, el autor (`author`),
 * el `subject` sobre el que se escribe, el `message` y su `type`.
 *
 * @example
 * ```ts
 * const comment: Comment = {
 *   id: 1,
 *   author: 'Carlos Ramírez',
 *   subject: 'Leche entera',
 *   message: 'Excelente relación calidad-precio',
 *   type: 'General'
 * };
 * ```
 */
export interface Comment {
  /** Identificador único del comentario */
  id: number;

  /** Nombre del autor del comentario */
  author: string;

  /** Tema o asunto sobre el que se escribe */
  subject: string;

  /** Texto del comentario */
  message: string;

  /** Tipo de comentario */
  type: CommentType;
}

/**
 * Tipo de categoría de comentario.
 *
 * @remarks
 * Este tipo restringe los tipos a los valores predefinidos:
 * - 'General'
 * - 'Soporte'
 * - 'Sugerencia'
 *
 * Se utiliza principalmente para mapear badges de colores en la UI.
 *
 * @example
 * ```ts
 * const tipo: CommentType = 'Sugerencia';
 * ```
 */
export type CommentType = 'General' | 'Soporte' | 'Sugerencia';
