package uceva.cleanarchitecture.domain.entity;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Representa una calificación del sistema")
public class Rating {

    @Schema(description = "Identificador único de la calificación", example = "1")
    public Integer id;

    @Schema(description = "Nombre del autor de la calificación", example = "Ana Gómez")
    public String rater;

    @Schema(description = "Producto que fue calificado", example = "Manzana roja")
    public String product;

    @Schema(description = "Puntaje numérico de la calificación", example = "5")
    public Integer score;

    @Schema(description = "Nivel general de la calificación", example = "Alto",
            allowableValues = {"Bajo", "Medio", "Alto"})
    public String level;

    public Rating(Integer id, String rater, String product, Integer score, String level) {
        this.id = id;
        this.rater = rater;
        this.product = product;
        this.score = score;
        this.level = level;
    }
}
