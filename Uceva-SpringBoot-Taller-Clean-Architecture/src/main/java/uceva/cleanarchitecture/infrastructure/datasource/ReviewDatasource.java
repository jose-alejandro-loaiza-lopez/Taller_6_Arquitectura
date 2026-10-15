package uceva.cleanarchitecture.infrastructure.datasource;

import com.github.javafaker.Faker;
import uceva.cleanarchitecture.domain.entity.Review;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class ReviewDatasource {

    private Faker faker = new Faker();
    private final Random random = new Random();
    private final String[] statuses = {
            "Pendiente",
            "Aprobada",
            "Rechazada"
    };

    public List<Review> getAll(int countReviews) {
        List<Review> reviews = new ArrayList<Review>();
        for (int i = 1; i <= countReviews; i++) {
            reviews.add(generateReview(i));
        }
        return reviews;
    }

    private Review generateReview(Integer id) {
        return new Review(
                id,
                faker.name().fullName(),
                faker.commerce().productName(),
                faker.lorem().sentence(),
                randomStatus()
        );
    }

    private String randomStatus() {
        return statuses[random.nextInt(statuses.length)];
    }

}
