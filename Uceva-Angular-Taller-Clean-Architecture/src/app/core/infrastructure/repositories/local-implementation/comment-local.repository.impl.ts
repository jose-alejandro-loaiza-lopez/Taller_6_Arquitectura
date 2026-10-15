import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Comment } from "../../../domain/models/comment.model";
import { CommentRepository } from "../../../domain/repositories/comment.repository";
import { DataService } from "../../services/data.service";

/**
 * Implementación concreta del repositorio de comentarios.
 *
 * @remarks
 * Forma parte de la **capa de Infrastructure** y cumple
 * el rol de **Adapter** entre el dominio y la fuente de datos.
 *
 * Implementa el contrato {@link CommentRepository}
 * utilizando {@link DataService} como datasource.
 *
 * Este patrón permite:
 * - Desacoplar el dominio de detalles técnicos
 * - Sustituir la fuente de datos sin afectar casos de uso
 * - Facilitar pruebas unitarias mediante mocks
 *
 * @see {@link CommentRepository}
 * @see {@link DataService}
 */
@Injectable()
export class CommentLocalRepositoryImpl extends CommentRepository {

    /**
     * Datasource encargado de obtener los datos de comentarios.
     *
     * @remarks
     * Se inyecta mediante la API `inject()` de Angular,
     * recomendada en arquitecturas modernas y código standalone.
     */
    private dataService = inject(DataService);

    /**
     * Obtiene el listado completo de comentarios.
     *
     * @remarks
     * Implementa el método definido en
     * {@link CommentRepository#getAll}.
     *
     * @param countComments - Cantidad de comentarios a solicitar
     * @returns Observable que emite un arreglo de {@link Comment}
     */
    getAll(countComments: number): Observable<Comment[]> {
        return this.dataService.getAllCommentsLocal(countComments);
    }

}
