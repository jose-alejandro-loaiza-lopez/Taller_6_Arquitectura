import { Component, inject } from '@angular/core';
import { GetAllRatingsUseCase } from '../../../core/application/usecases/get-all-ratings.usecase';
import { Rating } from '../../../core/domain/models/rating.model';
import { AlertComponent } from '../../components/alert/alert.component';
import { RatingsTableComponent } from '../../components/ratings-table/ratings-table.component';
import { State } from '../../interfaces/state.interface';

/**
 * Componente contenedor de calificaciones.
 *
 * Se utiliza para gestionar y mostrar un listado de calificaciones
 * utilizando el componente `RatingsTableComponent`.
 *
 * @remarks
 * Este componente se encarga de consumir el caso de uso
 * `GetAllRatingsUseCase` para obtener las calificaciones y pasarlas
 * al componente de tabla. Forma parte de la capa de presentación
 * de la aplicación.
 *
 */
@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.page.html',
  imports: [RatingsTableComponent, AlertComponent],
  providers: [GetAllRatingsUseCase]
})
export class RatingsPage {
  /**
   * Listado de calificaciones obtenidas desde el caso de uso.
   * @type {Rating[]}
   */
  ratings: Rating[] = [];
  /**
   * Estado actual del componente.
   *
   * @default 'init'
   */
  state: State = 'init';

  /**
   * Caso de Uso para obtener calificaciones.
   * @remarks
   * Se inyecta utilizando la función `inject()` de Angular.
   */
  private getAllRatingsUseCase = inject(GetAllRatingsUseCase);

  /**
   * Inicializa el componente y carga las calificaciones.
   * @remarks
   * Se suscribe al método `execute()` del caso de uso y
   * asigna los datos recibidos a la propiedad `ratings`.
   */
  ngOnInit(): void {
    this.state = 'loading';
    this.getAllRatingsUseCase.execute(10).subscribe({
      next: (ratings) => {
        this.ratings = ratings;
        this.state = 'success';
      },
      error: (error) => {
        console.error(error)
        this.state = 'error';
      },
    })
  }
}
