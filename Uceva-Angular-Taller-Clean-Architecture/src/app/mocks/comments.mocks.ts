import { Comment } from "../core/domain/models/comment.model";

export const COMMENTS_MOCK: Comment[] = [
    {
        id: 1,
        author: 'Carlos Ramírez',
        subject: 'Leche entera',
        message: 'Excelente relación calidad-precio',
        type: 'General',
    },
    {
        id: 2,
        author: 'Ana Gómez',
        subject: 'Manzana roja',
        message: 'Necesito ayuda con mi pedido',
        type: 'Soporte',
    }
];
