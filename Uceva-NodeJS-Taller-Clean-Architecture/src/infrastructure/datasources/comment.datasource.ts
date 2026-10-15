import { faker } from '@faker-js/faker';
import { Comment, CommentType } from "../../domain/models/comment.model";

/**
 * Datasource encargado de generar comentarios simulados.
 *
 * @remarks
 * Esta clase pertenece a la **capa de Infrastructure** y actúa como
 * una **fuente de datos (Datasource)**.
 *
 * Utiliza la librería {@link https://www.npmjs.com/package/@faker-js/faker | faker}
 * para generar información falsa de comentarios.
 *
 * ❗ No contiene lógica de negocio.
 * ❗ No implementa repositorios del dominio.
 *
 * Es consumida por `CommentRepositoryImpl`, que se encarga
 * de adaptar los datos al dominio y exponerlos mediante
 * el contrato `CommentRepository`.
 */
export class CommentDatasource {

    /**
     * Tipos disponibles para los comentarios simulados.
     *
     * @remarks
     * Se utiliza para asignar un tipo aleatorio
     * a cada comentario generado.
     */
    private types: CommentType[] = [
        'General',
        'Soporte',
        'Sugerencia'
    ];

    /**
     * Obtiene una lista de comentarios simulados.
     *
     * @remarks
     * Genera dinámicamente una cantidad determinada de comentarios
     * utilizando datos aleatorios.
     *
     * @param countComments - Cantidad de comentarios a generar
     * @returns Promesa que resuelve un arreglo de {@link Comment}
     *
     * @example
     * ```ts
     * const datasource = new CommentDatasource();
     * const comments = await datasource.getAll(10);
     * ```
     */
    async getAll(countComments: number): Promise<Comment[]> {
        const comments: Promise<Comment>[] = [];

        for (let i = 1; i <= countComments; i++) {
            comments.push(this.generateComment(i));
        }

        return Promise.all(comments);
    }


    /**
     * Genera un comentario individual con datos simulados.
     *
     * @remarks
     * Este método es interno y no debe ser utilizado
     * fuera del datasource.
     *
     * @param id - Identificador único del comentario
     * @returns Promesa que resuelve un {@link Comment}
     */
    private generateComment(id: number): Promise<Comment> {
        return Promise.resolve({
            id,
            author: faker.person.fullName(),
            subject: faker.lorem.words(3),
            message: faker.lorem.sentence(),
            type: faker.helpers.arrayElement(this.types),
        });
    }

}
