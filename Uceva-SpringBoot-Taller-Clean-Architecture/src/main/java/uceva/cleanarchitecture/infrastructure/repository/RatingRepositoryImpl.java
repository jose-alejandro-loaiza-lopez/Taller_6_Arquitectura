package uceva.cleanarchitecture.infrastructure.repository;

import uceva.cleanarchitecture.domain.entity.Rating;
import uceva.cleanarchitecture.domain.repository.RatingRepository;
import uceva.cleanarchitecture.infrastructure.datasource.RatingDatasource;

import java.util.List;

public class RatingRepositoryImpl extends RatingRepository {

    private final RatingDatasource ratingDatasource;

    public RatingRepositoryImpl(RatingDatasource ratingDatasource) {
        this.ratingDatasource = ratingDatasource;
    }

    @Override
    public List<Rating> getAll(int countRatings) {
        return ratingDatasource.getAll(countRatings);
    }
}
