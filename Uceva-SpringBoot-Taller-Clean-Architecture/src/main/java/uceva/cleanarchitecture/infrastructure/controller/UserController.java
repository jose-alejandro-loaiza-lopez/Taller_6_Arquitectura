package uceva.cleanarchitecture.infrastructure.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uceva.cleanarchitecture.application.usecase.GetAllUsersUseCase;
import uceva.cleanarchitecture.domain.entity.User;

import java.util.List;

@RestController
@RequestMapping("/users")
@Tag(name = "Users", description = "Operaciones relacionadas con los usuarios")
public class UserController {

    private final GetAllUsersUseCase getAllUsersUseCase;

    public UserController(GetAllUsersUseCase getAllUsersUseCase) {
        this.getAllUsersUseCase = getAllUsersUseCase;
    }

    @Operation(
            summary = "Obtener listado de usuarios",
            description = "Retorna una lista de usuarios generados dinámicamente según la cantidad solicitada."
    )
    @ApiResponse(responseCode = "200", description = "Lista de usuarios generados")
    @GetMapping("/{countUsers}")
    public List<User> getAll(
            @Parameter(description = "Cantidad de usuarios a generar", example = "5")
            @PathVariable int countUsers) {
        return getAllUsersUseCase.execute(countUsers);
    }

}
