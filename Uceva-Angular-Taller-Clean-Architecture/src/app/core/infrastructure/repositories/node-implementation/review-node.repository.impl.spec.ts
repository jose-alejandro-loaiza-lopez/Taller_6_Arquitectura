
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { REVIEWS_MOCK } from '../../../../mocks/reviews.mocks';
import { Review } from '../../../domain/models/review.model';
import { DataService } from '../../services/data.service';
import { ReviewNodeRepositoryImpl } from './review-node.repository.impl';

describe('ReviewNodeRepositoryImpl (Infrastructure)', () => {
  let repository: ReviewNodeRepositoryImpl;

  const countReviews = 5;
  const DataServiceMock = { getAllReviewsNode: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            ReviewNodeRepositoryImpl,
            { provide: DataService, useValue: DataServiceMock }
        ]
    })
    .compileComponents();
    repository = TestBed.inject(ReviewNodeRepositoryImpl)
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe delegar la llamada a DataService.getAllReviewsNode()', () => {
    const getAllSpy = DataServiceMock.getAllReviewsNode.mockReturnValue(of([]));
    repository.getAll(countReviews).subscribe();
    expect(getAllSpy).toHaveBeenCalledTimes(1);
    expect(getAllSpy).toHaveBeenCalledWith(countReviews);
  });

  it('debe devolver el listado de reseñas como Observable', (done) => {
    DataServiceMock.getAllReviewsNode.mockReturnValue(of(REVIEWS_MOCK))
    repository.getAll(countReviews).subscribe((reviews: Review[]) => {
      expect(reviews).toEqual(REVIEWS_MOCK);
      done();
    });
  });
});
