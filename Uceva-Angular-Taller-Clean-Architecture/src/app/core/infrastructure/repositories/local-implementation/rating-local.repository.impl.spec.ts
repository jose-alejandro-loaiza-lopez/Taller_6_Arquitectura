
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RATINGS_MOCK } from '../../../../mocks/ratings.mocks';
import { Rating } from '../../../domain/models/rating.model';
import { DataService } from '../../services/data.service';
import { RatingLocalRepositoryImpl } from './rating-local.repository.impl';

describe('RatingLocalRepositoryImpl (Infrastructure)', () => {
  let repository: RatingLocalRepositoryImpl;

  const countRatings = 5;
  const DataServiceMock = { getAllRatingsLocal: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            RatingLocalRepositoryImpl,
            { provide: DataService, useValue: DataServiceMock }
        ]
    })
    .compileComponents();
    repository = TestBed.inject(RatingLocalRepositoryImpl)
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe delegar la llamada a DataService.getAllRatingsLocal()', () => {
    const getAllSpy = DataServiceMock.getAllRatingsLocal.mockReturnValue(of([]));
    repository.getAll(countRatings).subscribe();
    expect(getAllSpy).toHaveBeenCalledTimes(1);
    expect(getAllSpy).toHaveBeenCalledWith(countRatings);
  });

  it('debe devolver el listado de calificaciones como Observable', (done) => {
    DataServiceMock.getAllRatingsLocal.mockReturnValue(of(RATINGS_MOCK))
    repository.getAll(countRatings).subscribe((ratings: Rating[]) => {
      expect(ratings).toEqual(RATINGS_MOCK);
      done();
    });
  });
});
