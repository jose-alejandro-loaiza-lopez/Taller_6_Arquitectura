import { Component, inject } from '@angular/core';
import { GetAllCommentsUseCase } from '../../../core/application/usecases/get-all-comments.usecase';
import { Comment } from '../../../core/domain/models/comment.model';
import { AlertComponent } from '../../components/alert/alert.component';
import { CommentsTableComponent } from '../../components/comments-table/comments-table.component';
import { State } from '../../interfaces/state.interface';

/**
 * Componente contenedor de comentarios.
 *
 * Se utiliza para gestionar y mostrar un listado de comentarios
 * utilizando el componente `CommentsTableComponent`.
 *
 * @remarks
 * Este componente se encarga de consumir el caso de uso
 * `GetAllCommentsUseCase` para obtener los comentarios y pasarlos
 * al componente de tabla. Forma parte de la capa de presentación
 * de la aplicación.
 *
 */
@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  imports: [CommentsTableComponent, AlertComponent],
  providers: [GetAllCommentsUseCase]
})
export class CommentsPage {
  /**
   * Listado de comentarios obtenidos desde el caso de uso.
   * @type {Comment[]}
   */
  comments: Comment[] = [];
  /**
   * Estado actual del componente.
   *
   * @default 'init'
   */
  state: State = 'init';

  /**
   * Caso de Uso para obtener comentarios.
   * @remarks
   * Se inyecta utilizando la función `inject()` de Angular.
   */
  private getAllCommentsUseCase = inject(GetAllCommentsUseCase);

  /**
   * Inicializa el componente y carga los comentarios.
   * @remarks
   * Se suscribe al método `execute()` del caso de uso y
   * asigna los datos recibidos a la propiedad `comments`.
   */
  ngOnInit(): void {
    this.state = 'loading';
    this.getAllCommentsUseCase.execute(10).subscribe({
      next: (comments) => {
        this.comments = comments;
        this.state = 'success';
      },
      error: (error) => {
        console.error(error)
        this.state = 'error';
      },
    })
  }
}
