import { TestBed } from "@angular/core/testing";
import { GetAllRatingsUseCase } from "./get-all-ratings.usecase";
import { RatingRepository } from "../../domain/repositories/rating.repository";
import { firstValueFrom, of, throwError } from "rxjs";
import { RATINGS_MOCK } from "../../../mocks/ratings.mocks";


describe('GetAllRatingsUseCase', () => {
  let useCase: GetAllRatingsUseCase;

  const countRatings = 5;
  const RatingRepositoryMock: jest.Mocked<RatingRepository> = { getAll: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        providers: [
            GetAllRatingsUseCase,
            { provide: RatingRepository, useValue: RatingRepositoryMock }
        ]
    })
    .compileComponents();
    useCase = TestBed.inject(GetAllRatingsUseCase);
  });

  it('debería ser inyectable y crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetAllRatingsUseCase);
  });

  it('debería delegar la llamada del repository', async () => {
    RatingRepositoryMock.getAll.mockReturnValue(of(RATINGS_MOCK));
    const result = await firstValueFrom(useCase.execute(countRatings));
    expect(RatingRepositoryMock.getAll).toHaveBeenCalledTimes(1);
    expect(RatingRepositoryMock.getAll).toHaveBeenCalledWith(countRatings);
    expect(result).toEqual(RATINGS_MOCK);
  });

  it('debería propagar un error cuando el repositorio emita un error', async () => {
    const errorMessage = 'Fallo la busqueda de calificaciones';
    RatingRepositoryMock.getAll.mockReturnValue(throwError(() => new Error(errorMessage)));
    const result = useCase.execute(countRatings);
    await expect(firstValueFrom(result)).rejects.toThrow(errorMessage);
    expect(RatingRepositoryMock.getAll).toHaveBeenCalledTimes(1);
    expect(RatingRepositoryMock.getAll).toHaveBeenCalledWith(countRatings);
  });

});
