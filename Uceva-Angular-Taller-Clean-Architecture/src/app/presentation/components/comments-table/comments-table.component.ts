import { Component, Input } from '@angular/core';
import { BadgeAtom, BadgeType } from '@brejcha13320/design-system-bootstrap';
import { Comment, CommentType } from '../../../core/domain/models/comment.model';

/**
 * Componente de tabla de comentarios.
 *
 * Se utiliza para mostrar un listado de comentarios en una tabla,
 * mostrando información como id, autor, asunto, mensaje y un badge
 * visual que indica el tipo de cada comentario.
 *
 * @remarks
 * Este componente recibe los comentarios desde un componente padre
 * a través del Input `comments` y utiliza el mapeo `typeMap`
 * para asignar colores a los badges según el tipo.
 *
 * Forma parte de la capa de presentación de la aplicación y se considera
 * un **organismo** dentro del sistema de diseño atómico.
 *
 * @example
 * ```html
 * <app-comments-table [comments]="commentsList"></app-comments-table>
 * ```
 */
@Component({
  selector: 'app-comments-table',
  templateUrl: './comments-table.component.html',
  imports: [BadgeAtom],
})
export class CommentsTableComponent {
  /**
   * Listado de comentarios que se mostrarán en la tabla.
   * @type {Comment[]}
   * @remarks
   * Este Input permite pasar un array de comentarios desde un componente padre.
   * Cada comentario debe cumplir la interfaz `Comment`.
   */
  @Input() comments: Comment[] = [];
  /**
   * Mapeo de tipos de comentario a tipos de Badge.
   * @type {Record<CommentType, BadgeType>}
   * @remarks
   * Se utiliza para asignar colores de badges a cada tipo:
   * - 'General' → 'primary' (azul)
   * - 'Soporte' → 'secondary' (gris)
   * - 'Sugerencia' → 'success' (verde)
   *
   * Esto permite que en la tabla cada comentario tenga un badge visual que indique su tipo
   * de forma clara para el usuario.
   */
  typeMap: Record<CommentType, BadgeType> = {
    'General' : 'primary',
    'Soporte': 'secondary',
    'Sugerencia': 'success',
  }
}
