
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RATINGS_MOCK } from '../../../../mocks/ratings.mocks';
import { Rating } from '../../../domain/models/rating.model';
import { DataService } from '../../services/data.service';
import { RatingNodeRepositoryImpl } from './rating-node.repository.impl';

describe('RatingNodeRepositoryImpl (Infrastructure)', () => {
  let repository: RatingNodeRepositoryImpl;

  const countRatings = 5;
  const DataServiceMock = { getAllRatingsNode: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            RatingNodeRepositoryImpl,
            { provide: DataService, useValue: DataServiceMock }
        ]
    })
    .compileComponents();
    repository = TestBed.inject(RatingNodeRepositoryImpl)
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe delegar la llamada a DataService.getAllRatingsNode()', () => {
    const getAllSpy = DataServiceMock.getAllRatingsNode.mockReturnValue(of([]));
    repository.getAll(countRatings).subscribe();
    expect(getAllSpy).toHaveBeenCalledTimes(1);
    expect(getAllSpy).toHaveBeenCalledWith(countRatings);
  });

  it('debe devolver el listado de calificaciones como Observable', (done) => {
    DataServiceMock.getAllRatingsNode.mockReturnValue(of(RATINGS_MOCK))
    repository.getAll(countRatings).subscribe((ratings: Rating[]) => {
      expect(ratings).toEqual(RATINGS_MOCK);
      done();
    });
  });
});
