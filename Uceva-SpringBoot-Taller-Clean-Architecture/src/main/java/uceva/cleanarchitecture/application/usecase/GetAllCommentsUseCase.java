package uceva.cleanarchitecture.application.usecase;

import uceva.cleanarchitecture.domain.entity.Comment;
import uceva.cleanarchitecture.domain.repository.CommentRepository;

import java.util.List;

public class GetAllCommentsUseCase {

    private final CommentRepository commentRepository;

    public GetAllCommentsUseCase(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public List<Comment> execute(int countComments) {
        return commentRepository.getAll(countComments);
    }
}
