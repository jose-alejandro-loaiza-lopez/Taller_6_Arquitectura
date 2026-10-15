package uceva.cleanarchitecture.application.usecase;

import uceva.cleanarchitecture.domain.entity.Rating;
import uceva.cleanarchitecture.domain.repository.RatingRepository;

import java.util.List;

public class GetAllRatingsUseCase {

    private final RatingRepository ratingRepository;

    public GetAllRatingsUseCase(RatingRepository ratingRepository) {
        this.ratingRepository = ratingRepository;
    }

    public List<Rating> execute(int countRatings) {
        return ratingRepository.getAll(countRatings);
    }
}
