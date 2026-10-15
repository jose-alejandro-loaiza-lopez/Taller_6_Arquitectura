package uceva.cleanarchitecture.domain.entity;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Representa un usuario del sistema")
public class User {

    @Schema(description = "Identificador único del usuario", example = "1")
    public Integer id;

    @Schema(description = "Nombre del usuario", example = "Carlos")
    public String name;

    @Schema(description = "Apellido del usuario", example = "Ramírez")
    public String lastName;

    @Schema(description = "Edad del usuario", example = "22")
    public Integer age;

    @Schema(description = "Correo electrónico del usuario", example = "carlos.ramirez@example.com")
    public String email;

    @Schema(description = "Carrera o ingeniería del usuario", example = "Sistemas",
            allowableValues = {"Sistemas", "Electronica", "Biomedica", "Industrial", "Ambiental"})
    public String engineering;

    public User(Integer id, String name, String lastName, Integer age, String email, String engineering){
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.age = age;
        this. email = email;
        this.engineering = engineering;
    }

}

