package uceva.cleanarchitecture.domain.entity;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Representa una reseña del sistema")
public class Review {

    @Schema(description = "Identificador único de la reseña", example = "1")
    public Integer id;

    @Schema(description = "Nombre del autor de la reseña", example = "Carlos Ramírez")
    public String reviewer;

    @Schema(description = "Producto que fue reseñado", example = "Leche entera")
    public String product;

    @Schema(description = "Comentario o texto de la reseña", example = "Buen producto, lo recomiendo")
    public String comment;

    @Schema(description = "Estado de aprobación de la reseña", example = "Aprobada",
            allowableValues = {"Pendiente", "Aprobada", "Rechazada"})
    public String status;

    public Review(Integer id, String reviewer, String product, String comment, String status) {
        this.id = id;
        this.reviewer = reviewer;
        this.product = product;
        this.comment = comment;
        this.status = status;
    }
}
