package uceva.cleanarchitecture.domain.repository;

import uceva.cleanarchitecture.domain.entity.Review;

import java.util.List;

public abstract class ReviewRepository {
    public abstract List<Review> getAll(int countReviews);
}
