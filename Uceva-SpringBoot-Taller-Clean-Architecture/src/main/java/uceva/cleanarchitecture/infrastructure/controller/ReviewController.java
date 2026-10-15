package uceva.cleanarchitecture.infrastructure.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uceva.cleanarchitecture.application.usecase.GetAllReviewsUseCase;
import uceva.cleanarchitecture.domain.entity.Review;

import java.util.List;

@RestController
@RequestMapping("/reviews")
@Tag(name = "Reviews", description = "Operaciones relacionadas con las reseñas")
public class ReviewController {

    private final GetAllReviewsUseCase getAllReviewsUseCase;

    public ReviewController(GetAllReviewsUseCase getAllReviewsUseCase) {
        this.getAllReviewsUseCase = getAllReviewsUseCase;
    }

    @Operation(
            summary = "Obtener listado de reseñas",
            description = "Retorna una lista de reseñas generadas dinámicamente según la cantidad solicitada."
    )
    @ApiResponse(responseCode = "200", description = "Lista de reseñas generadas")
    @GetMapping("/{countReviews}")
    public List<Review> getAll(
            @Parameter(description = "Cantidad de reseñas a generar", example = "5")
            @PathVariable int countReviews) {
        return getAllReviewsUseCase.execute(countReviews);
    }

}
