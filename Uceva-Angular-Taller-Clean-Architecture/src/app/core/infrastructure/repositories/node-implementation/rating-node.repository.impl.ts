import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Rating } from "../../../domain/models/rating.model";
import { RatingRepository } from "../../../domain/repositories/rating.repository";
import { DataService } from "../../services/data.service";

/**
 * Implementación concreta del repositorio de calificaciones.
 *
 * @remarks
 * Forma parte de la **capa de Infrastructure** y cumple
 * el rol de **Adapter** entre el dominio y la fuente de datos.
 *
 * Implementa el contrato {@link RatingRepository}
 * utilizando {@link DataService} como datasource.
 *
 * Este patrón permite:
 * - Desacoplar el dominio de detalles técnicos
 * - Sustituir la fuente de datos sin afectar casos de uso
 * - Facilitar pruebas unitarias mediante mocks
 *
 * @see {@link RatingRepository}
 * @see {@link DataService}
 */
@Injectable()
export class RatingNodeRepositoryImpl extends RatingRepository {

    /**
     * Datasource encargado de obtener los datos de calificaciones.
     *
     * @remarks
     * Se inyecta mediante la API `inject()` de Angular,
     * recomendada en arquitecturas modernas y código standalone.
     */
    private dataService = inject(DataService);

    /**
     * Obtiene el listado completo de calificaciones.
     *
     * @remarks
     * Implementa el método definido en
     * {@link RatingRepository#getAll}.
     *
     * @param countRatings - Cantidad de calificaciones a solicitar
     * @returns Observable que emite un arreglo de {@link Rating}
     */
    getAll(countRatings: number): Observable<Rating[]> {
        return this.dataService.getAllRatingsNode(countRatings);
    }

}
