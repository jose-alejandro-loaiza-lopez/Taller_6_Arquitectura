import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Review } from "../../../domain/models/review.model";
import { ReviewRepository } from "../../../domain/repositories/review.repository";
import { DataService } from "../../services/data.service";

/**
 * Implementación concreta del repositorio de reseñas.
 *
 * @remarks
 * Forma parte de la **capa de Infrastructure** y cumple
 * el rol de **Adapter** entre el dominio y la fuente de datos.
 *
 * Implementa el contrato {@link ReviewRepository}
 * utilizando {@link DataService} como datasource.
 *
 * Este patrón permite:
 * - Desacoplar el dominio de detalles técnicos
 * - Sustituir la fuente de datos sin afectar casos de uso
 * - Facilitar pruebas unitarias mediante mocks
 *
 * @see {@link ReviewRepository}
 * @see {@link DataService}
 */
@Injectable()
export class ReviewNodeRepositoryImpl extends ReviewRepository {

    /**
     * Datasource encargado de obtener los datos de reseñas.
     *
     * @remarks
     * Se inyecta mediante la API `inject()` de Angular,
     * recomendada en arquitecturas modernas y código standalone.
     */
    private dataService = inject(DataService);

    /**
     * Obtiene el listado completo de reseñas.
     *
     * @remarks
     * Implementa el método definido en
     * {@link ReviewRepository#getAll}.
     *
     * @param countReviews - Cantidad de reseñas a solicitar
     * @returns Observable que emite un arreglo de {@link Review}
     */
    getAll(countReviews: number): Observable<Review[]> {
        return this.dataService.getAllReviewsNode(countReviews);
    }

}
