import { Rating } from "../../domain/models/rating.model";
import { RatingRepository } from "../../domain/repositories/rating.repository";

/**
 * Caso de uso para obtener un listado de calificaciones.
 *
 * @remarks
 * Esta clase pertenece a la **capa de Application**
 * y representa una **regla de negocio de la aplicación**.
 *
 * Su responsabilidad es:
 * - Orquestar la obtención de calificaciones
 * - Coordinar la interacción con el repositorio
 *
 * ❗ No conoce detalles de infraestructura.
 * ❗ No depende de implementaciones concretas.
 *
 * Depende únicamente del contrato
 * {@link RatingRepository} definido en el dominio.
 *
 * @see {@link RatingRepository}
 * @see {@link Rating}
 */
export class GetAllRatingsUseCase {

  /**
   * Crea una nueva instancia del caso de uso.
   *
   * @param ratingRepository - Repositorio de calificaciones
   * utilizado para acceder a los datos
   */
  constructor(private ratingRepository: RatingRepository) {}

  /**
   * Ejecuta el caso de uso.
   *
   * @remarks
   * Obtiene una cantidad determinada de calificaciones
   * delegando el acceso a datos al repositorio.
   *
   * Aquí se pueden agregar:
   * - Validaciones de entrada
   * - Reglas de negocio simples
   * - Orquestación de múltiples repositorios
   *
   * @param countRatings - Cantidad de calificaciones a obtener
   * @returns Promesa que resuelve un arreglo de {@link Rating}
   *
   * @example
   * ```ts
   * const useCase = new GetAllRatingsUseCase(ratingRepository);
   * const ratings = await useCase.execute(10);
   * ```
   */
  execute(countRatings: number): Promise<Rating[]> {
    return this.ratingRepository.getAll(countRatings);
  }
}
