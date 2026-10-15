import { faker } from '@faker-js/faker';
import { Review, ReviewStatus } from "../../domain/models/review.model";

/**
 * Datasource encargado de generar reseñas simuladas.
 *
 * @remarks
 * Esta clase pertenece a la **capa de Infrastructure** y actúa como
 * una **fuente de datos (Datasource)**.
 *
 * Utiliza la librería {@link https://www.npmjs.com/package/@faker-js/faker | faker}
 * para generar información falsa de reseñas.
 *
 * ❗ No contiene lógica de negocio.
 * ❗ No implementa repositorios del dominio.
 *
 * Es consumida por `ReviewRepositoryImpl`, que se encarga
 * de adaptar los datos al dominio y exponerlos mediante
 * el contrato `ReviewRepository`.
 */
export class ReviewDatasource {

    /**
     * Estados disponibles para las reseñas simuladas.
     *
     * @remarks
     * Se utiliza para asignar un estado aleatorio
     * a cada reseña generada.
     */
    private statuses: ReviewStatus[] = [
        'Pendiente',
        'Aprobada',
        'Rechazada'
    ];

    /**
     * Obtiene una lista de reseñas simuladas.
     *
     * @remarks
     * Genera dinámicamente una cantidad determinada de reseñas
     * utilizando datos aleatorios.
     *
     * @param countReviews - Cantidad de reseñas a generar
     * @returns Promesa que resuelve un arreglo de {@link Review}
     *
     * @example
     * ```ts
     * const datasource = new ReviewDatasource();
     * const reviews = await datasource.getAll(10);
     * ```
     */
    async getAll(countReviews: number): Promise<Review[]> {
        const reviews: Promise<Review>[] = [];

        for (let i = 1; i <= countReviews; i++) {
            reviews.push(this.generateReview(i));
        }

        return Promise.all(reviews);
    }


    /**
     * Genera una reseña individual con datos simulados.
     *
     * @remarks
     * Este método es interno y no debe ser utilizado
     * fuera del datasource.
     *
     * @param id - Identificador único de la reseña
     * @returns Promesa que resuelve un {@link Review}
     */
    private generateReview(id: number): Promise<Review> {
        return Promise.resolve({
            id,
            reviewer: faker.person.fullName(),
            product: faker.commerce.productName(),
            comment: faker.lorem.sentence(),
            status: faker.helpers.arrayElement(this.statuses),
        });
    }

}
