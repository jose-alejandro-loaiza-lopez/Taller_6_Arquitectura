import { TestBed } from "@angular/core/testing";
import { GetAllReviewsUseCase } from "./get-all-reviews.usecase";
import { ReviewRepository } from "../../domain/repositories/review.repository";
import { firstValueFrom, of, throwError } from "rxjs";
import { REVIEWS_MOCK } from "../../../mocks/reviews.mocks";


describe('GetAllReviewsUseCase', () => {
  let useCase: GetAllReviewsUseCase;

  const countReviews = 5;
  const ReviewRepositoryMock: jest.Mocked<ReviewRepository> = { getAll: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        providers: [
            GetAllReviewsUseCase,
            { provide: ReviewRepository, useValue: ReviewRepositoryMock }
        ]
    })
    .compileComponents();
    useCase = TestBed.inject(GetAllReviewsUseCase);
  });

  it('debería ser inyectable y crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetAllReviewsUseCase);
  });

  it('debería delegar la llamada del repository', async () => {
    ReviewRepositoryMock.getAll.mockReturnValue(of(REVIEWS_MOCK));
    const result = await firstValueFrom(useCase.execute(countReviews));
    expect(ReviewRepositoryMock.getAll).toHaveBeenCalledTimes(1);
    expect(ReviewRepositoryMock.getAll).toHaveBeenCalledWith(countReviews);
    expect(result).toEqual(REVIEWS_MOCK);
  });

  it('debería propagar un error cuando el repositorio emita un error', async () => {
    const errorMessage = 'Fallo la busqueda de reseñas';
    ReviewRepositoryMock.getAll.mockReturnValue(throwError(() => new Error(errorMessage)));
    const result = useCase.execute(countReviews);
    await expect(firstValueFrom(result)).rejects.toThrow(errorMessage);
    expect(ReviewRepositoryMock.getAll).toHaveBeenCalledTimes(1);
    expect(ReviewRepositoryMock.getAll).toHaveBeenCalledWith(countReviews);
  });

});
