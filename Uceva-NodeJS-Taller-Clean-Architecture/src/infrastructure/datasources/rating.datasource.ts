import { faker } from '@faker-js/faker';
import { Rating, RatingLevel } from "../../domain/models/rating.model";

/**
 * Datasource encargado de generar calificaciones simuladas.
 *
 * @remarks
 * Esta clase pertenece a la **capa de Infrastructure** y actúa como
 * una **fuente de datos (Datasource)**.
 *
 * Utiliza la librería {@link https://www.npmjs.com/package/@faker-js/faker | faker}
 * para generar información falsa de calificaciones.
 *
 * ❗ No contiene lógica de negocio.
 * ❗ No implementa repositorios del dominio.
 *
 * Es consumida por `RatingRepositoryImpl`, que se encarga
 * de adaptar los datos al dominio y exponerlos mediante
 * el contrato `RatingRepository`.
 */
export class RatingDatasource {

    /**
     * Niveles disponibles para las calificaciones simuladas.
     *
     * @remarks
     * Se utiliza para asignar un nivel aleatorio
     * a cada calificación generada.
     */
    private levels: RatingLevel[] = [
        'Bajo',
        'Medio',
        'Alto'
    ];

    /**
     * Obtiene una lista de calificaciones simuladas.
     *
     * @remarks
     * Genera dinámicamente una cantidad determinada de calificaciones
     * utilizando datos aleatorios.
     *
     * @param countRatings - Cantidad de calificaciones a generar
     * @returns Promesa que resuelve un arreglo de {@link Rating}
     *
     * @example
     * ```ts
     * const datasource = new RatingDatasource();
     * const ratings = await datasource.getAll(10);
     * ```
     */
    async getAll(countRatings: number): Promise<Rating[]> {
        const ratings: Promise<Rating>[] = [];

        for (let i = 1; i <= countRatings; i++) {
            ratings.push(this.generateRating(i));
        }

        return Promise.all(ratings);
    }


    /**
     * Genera una calificación individual con datos simulados.
     *
     * @remarks
     * Este método es interno y no debe ser utilizado
     * fuera del datasource.
     *
     * @param id - Identificador único de la calificación
     * @returns Promesa que resuelve un {@link Rating}
     */
    private generateRating(id: number): Promise<Rating> {
        return Promise.resolve({
            id,
            rater: faker.person.fullName(),
            product: faker.commerce.productName(),
            score: faker.number.int({ min: 1, max: 5 }),
            level: faker.helpers.arrayElement(this.levels),
        });
    }

}
