package uceva.cleanarchitecture.infrastructure.repository;

import uceva.cleanarchitecture.domain.entity.Comment;
import uceva.cleanarchitecture.domain.repository.CommentRepository;
import uceva.cleanarchitecture.infrastructure.datasource.CommentDatasource;

import java.util.List;

public class CommentRepositoryImpl extends CommentRepository {

    private final CommentDatasource commentDatasource;

    public CommentRepositoryImpl(CommentDatasource commentDatasource) {
        this.commentDatasource = commentDatasource;
    }

    @Override
    public List<Comment> getAll(int countComments) {
        return commentDatasource.getAll(countComments);
    }
}
