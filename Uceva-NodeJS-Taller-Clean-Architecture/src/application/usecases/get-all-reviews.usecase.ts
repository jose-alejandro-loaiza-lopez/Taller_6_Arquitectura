import { Review } from "../../domain/models/review.model";
import { ReviewRepository } from "../../domain/repositories/review.repository";

/**
 * Caso de uso para obtener un listado de reseñas.
 *
 * @remarks
 * Esta clase pertenece a la **capa de Application**
 * y representa una **regla de negocio de la aplicación**.
 *
 * Su responsabilidad es:
 * - Orquestar la obtención de reseñas
 * - Coordinar la interacción con el repositorio
 *
 * ❗ No conoce detalles de infraestructura.
 * ❗ No depende de implementaciones concretas.
 *
 * Depende únicamente del contrato
 * {@link ReviewRepository} definido en el dominio.
 *
 * @see {@link ReviewRepository}
 * @see {@link Review}
 */
export class GetAllReviewsUseCase {

  /**
   * Crea una nueva instancia del caso de uso.
   *
   * @param reviewRepository - Repositorio de reseñas
   * utilizado para acceder a los datos
   */
  constructor(private reviewRepository: ReviewRepository) {}

  /**
   * Ejecuta el caso de uso.
   *
   * @remarks
   * Obtiene una cantidad determinada de reseñas
   * delegando el acceso a datos al repositorio.
   *
   * Aquí se pueden agregar:
   * - Validaciones de entrada
   * - Reglas de negocio simples
   * - Orquestación de múltiples repositorios
   *
   * @param countReviews - Cantidad de reseñas a obtener
   * @returns Promesa que resuelve un arreglo de {@link Review}
   *
   * @example
   * ```ts
   * const useCase = new GetAllReviewsUseCase(reviewRepository);
   * const reviews = await useCase.execute(10);
   * ```
   */
  execute(countReviews: number): Promise<Review[]> {
    return this.reviewRepository.getAll(countReviews);
  }
}
