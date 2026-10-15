package uceva.cleanarchitecture.domain.entity;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Representa un comentario del sistema")
public class Comment {

    @Schema(description = "Identificador único del comentario", example = "1")
    public Integer id;

    @Schema(description = "Nombre del autor del comentario", example = "Carlos Ramírez")
    public String author;

    @Schema(description = "Tema o asunto sobre el que se escribe", example = "Leche entera")
    public String subject;

    @Schema(description = "Texto del comentario", example = "Excelente relación calidad-precio")
    public String message;

    @Schema(description = "Tipo de comentario", example = "General",
            allowableValues = {"General", "Soporte", "Sugerencia"})
    public String type;

    public Comment(Integer id, String author, String subject, String message, String type) {
        this.id = id;
        this.author = author;
        this.subject = subject;
        this.message = message;
        this.type = type;
    }
}
