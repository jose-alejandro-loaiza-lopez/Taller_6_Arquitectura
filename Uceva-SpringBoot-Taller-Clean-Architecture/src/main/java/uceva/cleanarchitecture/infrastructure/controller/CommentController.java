package uceva.cleanarchitecture.infrastructure.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uceva.cleanarchitecture.application.usecase.GetAllCommentsUseCase;
import uceva.cleanarchitecture.domain.entity.Comment;

import java.util.List;

@RestController
@RequestMapping("/comments")
@Tag(name = "Comments", description = "Operaciones relacionadas con los comentarios")
public class CommentController {

    private final GetAllCommentsUseCase getAllCommentsUseCase;

    public CommentController(GetAllCommentsUseCase getAllCommentsUseCase) {
        this.getAllCommentsUseCase = getAllCommentsUseCase;
    }

    @Operation(
            summary = "Obtener listado de comentarios",
            description = "Retorna una lista de comentarios generados dinámicamente según la cantidad solicitada."
    )
    @ApiResponse(responseCode = "200", description = "Lista de comentarios generados")
    @GetMapping("/{countComments}")
    public List<Comment> getAll(
            @Parameter(description = "Cantidad de comentarios a generar", example = "5")
            @PathVariable int countComments) {
        return getAllCommentsUseCase.execute(countComments);
    }

}
