import { Review } from "../core/domain/models/review.model";

export const REVIEWS_MOCK: Review[] = [
    {
        id: 1,
        reviewer: 'Carlos Ramírez',
        product: 'Leche entera',
        comment: 'Buen producto, lo recomiendo',
        status: 'Aprobada',
    },
    {
        id: 2,
        reviewer: 'Ana Gómez',
        product: 'Manzana roja',
        comment: 'Llegó en mal estado',
        status: 'Rechazada',
    }
];
