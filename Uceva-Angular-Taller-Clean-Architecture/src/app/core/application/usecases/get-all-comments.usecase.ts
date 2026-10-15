import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../../domain/models/comment.model';
import { CommentRepository } from '../../domain/repositories/comment.repository';

/**
 * Caso de uso para obtener el listado completo de comentarios.
 *
 * @description
 * Este caso de uso pertenece a la **capa de aplicación** y representa
 * una acción del sistema orientada al negocio: recuperar todos los
 * comentarios disponibles.
 *
 * Actúa como intermediario entre la capa de presentación y el dominio,
 * delegando la obtención de datos al contrato `CommentRepository`.
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
 * this.getAllCommentsUseCase.execute(10).subscribe(comments => {
 *   // manejo de resultados
 * });
 * ```
 *
 * @architecture Clean Architecture
 * @layer Application
 *
 * @see Comment
 * @see CommentRepository
 */
@Injectable()
export class GetAllCommentsUseCase {

  /**
   * Repositorio de comentarios inyectado por contrato.
   *
   * @remarks
   * La implementación concreta se define en la capa de infraestructura.
   */
  private commentRepository = inject(CommentRepository);

  /**
   * Ejecuta el caso de uso.
   *
   * @returns {Observable<Comment[]>}
   * Observable que emite el listado completo de comentarios del dominio.
   *
   * @remarks
   * - Delegación directa al repositorio.
   * - No contiene lógica de presentación.
   * - Mantiene el principio de responsabilidad única.
   */
  execute(countComments: number): Observable<Comment[]> {
    return this.commentRepository.getAll(countComments);
  }
}
