package uceva.cleanarchitecture.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import uceva.cleanarchitecture.application.usecase.GetAllCommentsUseCase;
import uceva.cleanarchitecture.application.usecase.GetAllProductsUseCase;
import uceva.cleanarchitecture.application.usecase.GetAllRatingsUseCase;
import uceva.cleanarchitecture.application.usecase.GetAllReviewsUseCase;
import uceva.cleanarchitecture.application.usecase.GetAllUsersUseCase;
import uceva.cleanarchitecture.domain.repository.CommentRepository;
import uceva.cleanarchitecture.domain.repository.ProductRepository;
import uceva.cleanarchitecture.domain.repository.RatingRepository;
import uceva.cleanarchitecture.domain.repository.ReviewRepository;
import uceva.cleanarchitecture.domain.repository.UserRepository;
import uceva.cleanarchitecture.infrastructure.datasource.CommentDatasource;
import uceva.cleanarchitecture.infrastructure.datasource.ProductDatasource;
import uceva.cleanarchitecture.infrastructure.datasource.RatingDatasource;
import uceva.cleanarchitecture.infrastructure.datasource.ReviewDatasource;
import uceva.cleanarchitecture.infrastructure.datasource.UserDatasource;
import uceva.cleanarchitecture.infrastructure.repository.CommentRepositoryImpl;
import uceva.cleanarchitecture.infrastructure.repository.ProductRepositoryImpl;
import uceva.cleanarchitecture.infrastructure.repository.RatingRepositoryImpl;
import uceva.cleanarchitecture.infrastructure.repository.ReviewRepositoryImpl;
import uceva.cleanarchitecture.infrastructure.repository.UserRepositoryImpl;

@Configuration
public class AppConfig {

    @Bean
    UserDatasource userDatasource() {
        return new UserDatasource();
    }

    @Bean
    ProductDatasource productDatasource() {
        return new ProductDatasource();
    }

    @Bean
    ReviewDatasource reviewDatasource() {
        return new ReviewDatasource();
    }

    @Bean
    RatingDatasource ratingDatasource() {
        return new RatingDatasource();
    }

    @Bean
    CommentDatasource commentDatasource() {
        return new CommentDatasource();
    }

    @Bean
    UserRepository userRepository(UserDatasource userDatasource) {
        return new UserRepositoryImpl(userDatasource);
    }

    @Bean
    ProductRepository productRepository(ProductDatasource productDatasource) {
        return new ProductRepositoryImpl(productDatasource);
    }

    @Bean
    ReviewRepository reviewRepository(ReviewDatasource reviewDatasource) {
        return new ReviewRepositoryImpl(reviewDatasource);
    }

    @Bean
    RatingRepository ratingRepository(RatingDatasource ratingDatasource) {
        return new RatingRepositoryImpl(ratingDatasource);
    }

    @Bean
    CommentRepository commentRepository(CommentDatasource commentDatasource) {
        return new CommentRepositoryImpl(commentDatasource);
    }

    @Bean
    GetAllUsersUseCase getAllUsersUseCase(UserRepository userRepository) {
        return new GetAllUsersUseCase(userRepository);
    }

    @Bean
    GetAllProductsUseCase getAllProductsUseCase(ProductRepository productRepository) {
        return new GetAllProductsUseCase(productRepository);
    }

    @Bean
    GetAllReviewsUseCase getAllReviewsUseCase(ReviewRepository reviewRepository) {
        return new GetAllReviewsUseCase(reviewRepository);
    }

    @Bean
    GetAllRatingsUseCase getAllRatingsUseCase(RatingRepository ratingRepository) {
        return new GetAllRatingsUseCase(ratingRepository);
    }

    @Bean
    GetAllCommentsUseCase getAllCommentsUseCase(CommentRepository commentRepository) {
        return new GetAllCommentsUseCase(commentRepository);
    }

}
