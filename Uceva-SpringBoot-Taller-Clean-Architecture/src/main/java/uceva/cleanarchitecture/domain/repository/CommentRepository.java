package uceva.cleanarchitecture.domain.repository;

import uceva.cleanarchitecture.domain.entity.Comment;

import java.util.List;

public abstract class CommentRepository {
    public abstract List<Comment> getAll(int countComments);
}
