package uceva.cleanarchitecture.domain.repository;

import uceva.cleanarchitecture.domain.entity.Rating;

import java.util.List;

public abstract class RatingRepository {
    public abstract List<Rating> getAll(int countRatings);
}
