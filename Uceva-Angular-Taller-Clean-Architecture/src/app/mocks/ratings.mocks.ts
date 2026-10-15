import { Rating } from "../core/domain/models/rating.model";

export const RATINGS_MOCK: Rating[] = [
    {
        id: 1,
        rater: 'Carlos Ramírez',
        product: 'Leche entera',
        score: 5,
        level: 'Alto',
    },
    {
        id: 2,
        rater: 'Ana Gómez',
        product: 'Manzana roja',
        score: 2,
        level: 'Bajo',
    }
];
