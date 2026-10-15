package uceva.cleanarchitecture.infrastructure.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uceva.cleanarchitecture.application.usecase.GetAllRatingsUseCase;
import uceva.cleanarchitecture.domain.entity.Rating;

import java.util.List;

@RestController
@RequestMapping("/ratings")
@Tag(name = "Ratings", description = "Operaciones relacionadas con las calificaciones")
public class RatingController {

    private final GetAllRatingsUseCase getAllRatingsUseCase;

    public RatingController(GetAllRatingsUseCase getAllRatingsUseCase) {
        this.getAllRatingsUseCase = getAllRatingsUseCase;
    }

    @Operation(
            summary = "Obtener listado de calificaciones",
            description = "Retorna una lista de calificaciones generadas dinámicamente según la cantidad solicitada."
    )
    @ApiResponse(responseCode = "200", description = "Lista de calificaciones generadas")
    @GetMapping("/{countRatings}")
    public List<Rating> getAll(
            @Parameter(description = "Cantidad de calificaciones a generar", example = "5")
            @PathVariable int countRatings) {
        return getAllRatingsUseCase.execute(countRatings);
    }

}
