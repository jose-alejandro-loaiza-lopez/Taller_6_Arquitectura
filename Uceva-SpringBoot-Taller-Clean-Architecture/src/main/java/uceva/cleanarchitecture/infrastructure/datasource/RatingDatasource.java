package uceva.cleanarchitecture.infrastructure.datasource;

import com.github.javafaker.Faker;
import uceva.cleanarchitecture.domain.entity.Rating;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class RatingDatasource {

    private Faker faker = new Faker();
    private final Random random = new Random();
    private final String[] levels = {
            "Bajo",
            "Medio",
            "Alto"
    };

    public List<Rating> getAll(int countRatings) {
        List<Rating> ratings = new ArrayList<Rating>();
        for (int i = 1; i <= countRatings; i++) {
            ratings.add(generateRating(i));
        }
        return ratings;
    }

    private Rating generateRating(Integer id) {
        return new Rating(
                id,
                faker.name().fullName(),
                faker.commerce().productName(),
                faker.number().numberBetween(1, 5),
                randomLevel()
        );
    }

    private String randomLevel() {
        return levels[random.nextInt(levels.length)];
    }

}
