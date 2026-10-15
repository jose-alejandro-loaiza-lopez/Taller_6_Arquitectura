import { GetAllUsersUseCase } from "../application/usecases/get-all-users.usecase";
import { GetAllProductsUseCase } from "../application/usecases/get-all-products.usecase";
import { GetAllReviewsUseCase } from "../application/usecases/get-all-reviews.usecase";
import { GetAllRatingsUseCase } from "../application/usecases/get-all-ratings.usecase";
import { GetAllCommentsUseCase } from "../application/usecases/get-all-comments.usecase";
import { UserDatasource } from "../infrastructure/datasources/user.datasource";
import { ProductDatasource } from "../infrastructure/datasources/product.datasource";
import { ReviewDatasource } from "../infrastructure/datasources/review.datasource";
import { RatingDatasource } from "../infrastructure/datasources/rating.datasource";
import { CommentDatasource } from "../infrastructure/datasources/comment.datasource";
import { UserRepositoryImpl } from "../infrastructure/repositories/user.repository.impl";
import { ProductRepositoryImpl } from "../infrastructure/repositories/product.repository.impl";
import { ReviewRepositoryImpl } from "../infrastructure/repositories/review.repository.impl";
import { RatingRepositoryImpl } from "../infrastructure/repositories/rating.repository.impl";
import { CommentRepositoryImpl } from "../infrastructure/repositories/comment.repository.impl";
import { UsersController } from "../infrastructure/web/controllers/users.controller";
import { ProductsController } from "../infrastructure/web/controllers/products.controller";
import { ReviewsController } from "../infrastructure/web/controllers/reviews.controller";
import { RatingsController } from "../infrastructure/web/controllers/ratings.controller";
import { CommentsController } from "../infrastructure/web/controllers/comments.controller";

/**
 * Contenedor de dependencias de la aplicación (Composition Root).
 *
 * @remarks
 * Esta clase implementa un **contenedor de inyección de dependencias**
 * propio y minimalista, sin librerías externas.
 *
 * Su responsabilidad es **construir y cablear** manualmente todo el
 * grafo de dependencias de la aplicación, desde la capa más interna
 * (Domain) hasta la más externa (Frameworks & Drivers):
 *
 * ```
 * Datasource -> Repository -> UseCase -> Controller
 * ```
 *
 * Todas las dependencias se resuelven aquí, por lo que las capas
 * internas permanecen desacopladas de las implementaciones concretas.
 *
 * Cada controlador se expone como una **propiedad estática de solo
 * lectura**, de forma que se crea una única instancia (singleton)
 * reutilizable por las rutas.
 *
 * @example
 * ```ts
 * router.get("/:countUsers", Container.usersController.getAllUsers);
 * ```
 */
export class Container {

  //* Datasources (Infrastructure)
  private static readonly userDatasource = new UserDatasource();
  private static readonly productDatasource = new ProductDatasource();
  private static readonly reviewDatasource = new ReviewDatasource();
  private static readonly ratingDatasource = new RatingDatasource();
  private static readonly commentDatasource = new CommentDatasource();

  //* Repositories (Infrastructure -> Domain contract)
  private static readonly userRepository =
    new UserRepositoryImpl(Container.userDatasource);
  private static readonly productRepository =
    new ProductRepositoryImpl(Container.productDatasource);
  private static readonly reviewRepository =
    new ReviewRepositoryImpl(Container.reviewDatasource);
  private static readonly ratingRepository =
    new RatingRepositoryImpl(Container.ratingDatasource);
  private static readonly commentRepository =
    new CommentRepositoryImpl(Container.commentDatasource);

  //* Use cases (Application)
  private static readonly getAllUsersUseCase =
    new GetAllUsersUseCase(Container.userRepository);
  private static readonly getAllProductsUseCase =
    new GetAllProductsUseCase(Container.productRepository);
  private static readonly getAllReviewsUseCase =
    new GetAllReviewsUseCase(Container.reviewRepository);
  private static readonly getAllRatingsUseCase =
    new GetAllRatingsUseCase(Container.ratingRepository);
  private static readonly getAllCommentsUseCase =
    new GetAllCommentsUseCase(Container.commentRepository);

  //* Controllers (Frameworks & Drivers)
  /** Controlador HTTP de usuarios */
  static readonly usersController =
    new UsersController(Container.getAllUsersUseCase);

  /** Controlador HTTP de productos */
  static readonly productsController =
    new ProductsController(Container.getAllProductsUseCase);

  /** Controlador HTTP de reseñas */
  static readonly reviewsController =
    new ReviewsController(Container.getAllReviewsUseCase);

  /** Controlador HTTP de calificaciones */
  static readonly ratingsController =
    new RatingsController(Container.getAllRatingsUseCase);

  /** Controlador HTTP de comentarios */
  static readonly commentsController =
    new CommentsController(Container.getAllCommentsUseCase);
}
