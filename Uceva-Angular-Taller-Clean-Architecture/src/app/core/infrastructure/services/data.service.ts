import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { faker } from '@faker-js/faker';
import { Observable, of } from "rxjs";
import { environment } from "../../../../environments/environment";
import { Product, ProductCategory } from "../../domain/models/product.model";
import { User, UserEngineering } from "../../domain/models/user.model";
import { Review, ReviewStatus } from "../../domain/models/review.model";
import { Rating, RatingLevel } from "../../domain/models/rating.model";
import { Comment, CommentType } from "../../domain/models/comment.model";

/**
 * Servicio de infraestructura para obtención de datos.
 *
 * @remarks
 * Esta clase pertenece a la **capa de Infrastructure** y actúa
 * como un **Data Source** que provee información desde
 * diferentes orígenes:
 *
 * - Datos locales simulados (mocks)
 * - Backend Node.js mediante HTTP
 *
 * ❗ No contiene lógica de negocio.
 * ❗ No debe ser consumido directamente por los casos de uso.
 *
 * Es utilizado por repositorios o servicios de infraestructura
 * que adaptan los datos al dominio.
 */
@Injectable({ providedIn: 'root' })
export class DataService {
    /**
     * Cliente HTTP de Angular.
     *
     * @remarks
     * Se inyecta mediante la API `inject()` de Angular
     * para evitar el uso de constructores explícitos.
     */
    private httpClient = inject(HttpClient);
    /**
     * URL base del backend Node.js.
     *
     * @remarks
     * Se construye a partir de la configuración de entorno
     * definida en `environment`.
     */
    private nodeUrl = `${environment.baseUrlNode}/api`;
    /**
     * URL base del backend SpringBoot.
     *
     * @remarks
     * Se construye a partir de la configuración de entorno
     * definida en `environment`.
     */
    private springBootUrl = `${environment.baseUrlSpringBoot}/api`;


    /**
     * Obtiene el listado de USUARIOS desde datos locales simulados.
     *
     *
     * @param countUsers - Cantidad de usuarios a solicitar
     * @returns Observable que emite un arreglo de {@link User}
     */
    getAllUsersLocal(countUsers: number): Observable<User[]> {
        const users: User[] = [];
        const userEngineerings: UserEngineering[] = [
            'Sistemas',
            'Electronica',
            'Biomedica',
            'Industrial',
            'Ambiental',
        ];

        for(let i = 1 ; i <= countUsers ; i++){
            users.push({
                id: i,
                name: faker.person.firstName(),
                lastName: faker.person.lastName(),
                age: faker.number.int({ min: 18, max: 65 }),
                email: faker.internet.email(),
                engineering: faker.helpers.arrayElement(userEngineerings),
            })
        }

        return of(users);
    }

    /**
     * Obtiene el listado de productos desde datos locales simulados.
     *
     * @param countProducts - Cantidad de productos a solicitar
     * @returns Observable que emite un arreglo de {@link Product}
     */
    getAllProductsLocal(countProducts: number): Observable<Product[]> {
        const products: Product[] = [];
        const productCategories: ProductCategory[] = [
            'Carnes',
            'Frutas',
            'Lacteos',
            'Verduras'
        ];
        for(let i = 1; i <= countProducts ; i++){
            products.push({
                id: i,
                name: faker.commerce.productName(),
                price: Number(
                    faker.commerce.price({ min: 1, max: 100, dec: 2 })
                ),
                category: faker.helpers.arrayElement(productCategories),
            })
        }
        return of(products);
    }

    /**
     * Obtiene el listado de usuarios desde el backend Node.js.
     *
     * @remarks
     * Realiza una petición HTTP GET al endpoint
     * `/users/{countUsers}`.
     *
     * El número de usuarios a obtener se define
     * mediante el parámetro `countUsers`.
     *
     * @param countUsers - Cantidad de usuarios a solicitar
     * @returns Observable que emite un arreglo de {@link User}
     *
     * @example
     * ```ts
     * this.dataService.getAllUsersNode(10).subscribe(users => {
     *   console.log(users);
     * });
     * ```
     */
    getAllUsersNode(countUsers: number): Observable<User[]> {
        return this.httpClient.get<User[]>(`${this.nodeUrl}/users/${countUsers}`);
    }

    /**
     * Obtiene el listado de productos desde el backend Node.js.
     *
     * @remarks
     * Realiza una petición HTTP GET al endpoint
     * `/products/{countProducts}`.
     *
     * @param countProducts - Cantidad de productos a solicitar
     * @returns Observable que emite un arreglo de {@link Product}
     *
     * @example
     * ```ts
     * this.dataService.getAllProductsNode(5).subscribe(products => {
     *   console.log(products);
     * });
     * ```
     */
    getAllProductsNode(countProducts: number): Observable<Product[]> {
        return this.httpClient.get<Product[]>(`${this.nodeUrl}/products/${countProducts}`);
    }

    /**
     * Obtiene el listado de usuarios desde el backend SpringBoot.
     *
     * @remarks
     * Realiza una petición HTTP GET al endpoint
     * `/users/{countUsers}`.
     *
     * El número de usuarios a obtener se define
     * mediante el parámetro `countUsers`.
     *
     * @param countUsers - Cantidad de usuarios a solicitar
     * @returns Observable que emite un arreglo de {@link User}
     *
     * @example
     * ```ts
     * this.dataService.getAllUsersSpringBoot(10).subscribe(users => {
     *   console.log(users);
     * });
     * ```
     */
    getAllUsersSpringBoot(countUsers: number): Observable<User[]> {
        return this.httpClient.get<User[]>(`${this.springBootUrl}/users/${countUsers}`);
    }

    /**
     * Obtiene el listado de productos desde el backend SpringBoot.
     *
     * @remarks
     * Realiza una petición HTTP GET al endpoint
     * `/products/{countProducts}`.
     *
     * @param countProducts - Cantidad de productos a solicitar
     * @returns Observable que emite un arreglo de {@link Product}
     *
     * @example
     * ```ts
     * this.dataService.getAllProductsSpringBoot(5).subscribe(products => {
     *   console.log(products);
     * });
     * ```
     */
    getAllProductsSpringBoot(countProducts: number): Observable<Product[]> {
        return this.httpClient.get<Product[]>(`${this.springBootUrl}/products/${countProducts}`);
    }

    /**
     * Obtiene el listado de RESEÑAS desde datos locales simulados.
     *
     * @param countReviews - Cantidad de reseñas a solicitar
     * @returns Observable que emite un arreglo de {@link Review}
     */
    getAllReviewsLocal(countReviews: number): Observable<Review[]> {
        const reviews: Review[] = [];
        const reviewStatuses: ReviewStatus[] = [
            'Pendiente',
            'Aprobada',
            'Rechazada'
        ];

        for(let i = 1 ; i <= countReviews ; i++){
            reviews.push({
                id: i,
                reviewer: faker.person.fullName(),
                product: faker.commerce.productName(),
                comment: faker.lorem.sentence(),
                status: faker.helpers.arrayElement(reviewStatuses),
            })
        }

        return of(reviews);
    }

    /**
     * Obtiene el listado de CALIFICACIONES desde datos locales simulados.
     *
     * @param countRatings - Cantidad de calificaciones a solicitar
     * @returns Observable que emite un arreglo de {@link Rating}
     */
    getAllRatingsLocal(countRatings: number): Observable<Rating[]> {
        const ratings: Rating[] = [];
        const ratingLevels: RatingLevel[] = [
            'Bajo',
            'Medio',
            'Alto'
        ];

        for(let i = 1 ; i <= countRatings ; i++){
            ratings.push({
                id: i,
                rater: faker.person.fullName(),
                product: faker.commerce.productName(),
                score: faker.number.int({ min: 1, max: 5 }),
                level: faker.helpers.arrayElement(ratingLevels),
            })
        }

        return of(ratings);
    }

    /**
     * Obtiene el listado de COMENTARIOS desde datos locales simulados.
     *
     * @param countComments - Cantidad de comentarios a solicitar
     * @returns Observable que emite un arreglo de {@link Comment}
     */
    getAllCommentsLocal(countComments: number): Observable<Comment[]> {
        const comments: Comment[] = [];
        const commentTypes: CommentType[] = [
            'General',
            'Soporte',
            'Sugerencia'
        ];

        for(let i = 1 ; i <= countComments ; i++){
            comments.push({
                id: i,
                author: faker.person.fullName(),
                subject: faker.lorem.words(3),
                message: faker.lorem.sentence(),
                type: faker.helpers.arrayElement(commentTypes),
            })
        }

        return of(comments);
    }

    /**
     * Obtiene el listado de reseñas desde el backend Node.js.
     *
     * @remarks
     * Realiza una petición HTTP GET al endpoint
     * `/reviews/{countReviews}`.
     *
     * @param countReviews - Cantidad de reseñas a solicitar
     * @returns Observable que emite un arreglo de {@link Review}
     *
     * @example
     * ```ts
     * this.dataService.getAllReviewsNode(10).subscribe(reviews => {
     *   console.log(reviews);
     * });
     * ```
     */
    getAllReviewsNode(countReviews: number): Observable<Review[]> {
        return this.httpClient.get<Review[]>(`${this.nodeUrl}/reviews/${countReviews}`);
    }

    /**
     * Obtiene el listado de calificaciones desde el backend Node.js.
     *
     * @remarks
     * Realiza una petición HTTP GET al endpoint
     * `/ratings/{countRatings}`.
     *
     * @param countRatings - Cantidad de calificaciones a solicitar
     * @returns Observable que emite un arreglo de {@link Rating}
     *
     * @example
     * ```ts
     * this.dataService.getAllRatingsNode(5).subscribe(ratings => {
     *   console.log(ratings);
     * });
     * ```
     */
    getAllRatingsNode(countRatings: number): Observable<Rating[]> {
        return this.httpClient.get<Rating[]>(`${this.nodeUrl}/ratings/${countRatings}`);
    }

    /**
     * Obtiene el listado de comentarios desde el backend Node.js.
     *
     * @remarks
     * Realiza una petición HTTP GET al endpoint
     * `/comments/{countComments}`.
     *
     * @param countComments - Cantidad de comentarios a solicitar
     * @returns Observable que emite un arreglo de {@link Comment}
     *
     * @example
     * ```ts
     * this.dataService.getAllCommentsNode(5).subscribe(comments => {
     *   console.log(comments);
     * });
     * ```
     */
    getAllCommentsNode(countComments: number): Observable<Comment[]> {
        return this.httpClient.get<Comment[]>(`${this.nodeUrl}/comments/${countComments}`);
    }

    /**
     * Obtiene el listado de reseñas desde el backend SpringBoot.
     *
     * @remarks
     * Realiza una petición HTTP GET al endpoint
     * `/reviews/{countReviews}`.
     *
     * @param countReviews - Cantidad de reseñas a solicitar
     * @returns Observable que emite un arreglo de {@link Review}
     *
     * @example
     * ```ts
     * this.dataService.getAllReviewsSpringBoot(10).subscribe(reviews => {
     *   console.log(reviews);
     * });
     * ```
     */
    getAllReviewsSpringBoot(countReviews: number): Observable<Review[]> {
        return this.httpClient.get<Review[]>(`${this.springBootUrl}/reviews/${countReviews}`);
    }

    /**
     * Obtiene el listado de calificaciones desde el backend SpringBoot.
     *
     * @remarks
     * Realiza una petición HTTP GET al endpoint
     * `/ratings/{countRatings}`.
     *
     * @param countRatings - Cantidad de calificaciones a solicitar
     * @returns Observable que emite un arreglo de {@link Rating}
     *
     * @example
     * ```ts
     * this.dataService.getAllRatingsSpringBoot(5).subscribe(ratings => {
     *   console.log(ratings);
     * });
     * ```
     */
    getAllRatingsSpringBoot(countRatings: number): Observable<Rating[]> {
        return this.httpClient.get<Rating[]>(`${this.springBootUrl}/ratings/${countRatings}`);
    }

    /**
     * Obtiene el listado de comentarios desde el backend SpringBoot.
     *
     * @remarks
     * Realiza una petición HTTP GET al endpoint
     * `/comments/{countComments}`.
     *
     * @param countComments - Cantidad de comentarios a solicitar
     * @returns Observable que emite un arreglo de {@link Comment}
     *
     * @example
     * ```ts
     * this.dataService.getAllCommentsSpringBoot(5).subscribe(comments => {
     *   console.log(comments);
     * });
     * ```
     */
    getAllCommentsSpringBoot(countComments: number): Observable<Comment[]> {
        return this.httpClient.get<Comment[]>(`${this.springBootUrl}/comments/${countComments}`);
    }

}