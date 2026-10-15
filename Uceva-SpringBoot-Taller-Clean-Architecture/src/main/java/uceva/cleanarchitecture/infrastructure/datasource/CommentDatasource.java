package uceva.cleanarchitecture.infrastructure.datasource;

import com.github.javafaker.Faker;
import uceva.cleanarchitecture.domain.entity.Comment;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class CommentDatasource {

    private Faker faker = new Faker();
    private final Random random = new Random();
    private final String[] types = {
            "General",
            "Soporte",
            "Sugerencia"
    };

    public List<Comment> getAll(int countComments) {
        List<Comment> comments = new ArrayList<Comment>();
        for (int i = 1; i <= countComments; i++) {
            comments.add(generateComment(i));
        }
        return comments;
    }

    private Comment generateComment(Integer id) {
        return new Comment(
                id,
                faker.name().fullName(),
                String.join(" ", faker.lorem().words(3)),
                faker.lorem().sentence(),
                randomType()
        );
    }

    private String randomType() {
        return types[random.nextInt(types.length)];
    }

}
