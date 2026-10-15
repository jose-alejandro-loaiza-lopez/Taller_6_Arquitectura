
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RATINGS_MOCK } from '../../../../mocks/ratings.mocks';
import { Rating } from '../../../domain/models/rating.model';
import { DataService } from '../../services/data.service';
import { RatingSpringBootRepositoryImpl } from './rating-springboot.repository.impl';

describe('RatingSpringBootRepositoryImpl (Infrastructure)', () => {
  let repository: RatingSpringBootRepositoryImpl;

  const countRatings = 5;
  const DataServiceMock = { getAllRatingsSpringBoot: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            RatingSpringBootRepositoryImpl,
            { provide: DataService, useValue: DataServiceMock }
        ]
    })
    .compileComponents();
    repository = TestBed.inject(RatingSpringBootRepositoryImpl)
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe delegar la llamada a DataService.getAllRatingsSpringBoot()', () => {
    const getAllSpy = DataServiceMock.getAllRatingsSpringBoot.mockReturnValue(of([]));
    repository.getAll(countRatings).subscribe();
    expect(getAllSpy).toHaveBeenCalledTimes(1);
    expect(getAllSpy).toHaveBeenCalledWith(countRatings);
  });

  it('debe devolver el listado de calificaciones como Observable', (done) => {
    DataServiceMock.getAllRatingsSpringBoot.mockReturnValue(of(RATINGS_MOCK))
    repository.getAll(countRatings).subscribe((ratings: Rating[]) => {
      expect(ratings).toEqual(RATINGS_MOCK);
      done();
    });
  });
});
