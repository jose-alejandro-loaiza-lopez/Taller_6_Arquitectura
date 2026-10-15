package uceva.cleanarchitecture.infrastructure.repository;

import uceva.cleanarchitecture.domain.entity.Review;
import uceva.cleanarchitecture.domain.repository.ReviewRepository;
import uceva.cleanarchitecture.infrastructure.datasource.ReviewDatasource;

import java.util.List;

public class ReviewRepositoryImpl extends ReviewRepository {

    private final ReviewDatasource reviewDatasource;

    public ReviewRepositoryImpl(ReviewDatasource reviewDatasource) {
        this.reviewDatasource = reviewDatasource;
    }

    @Override
    public List<Review> getAll(int countReviews) {
        return reviewDatasource.getAll(countReviews);
    }
}
