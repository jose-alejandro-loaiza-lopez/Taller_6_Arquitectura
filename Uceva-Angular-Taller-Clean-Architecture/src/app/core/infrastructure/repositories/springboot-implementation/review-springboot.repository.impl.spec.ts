
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { REVIEWS_MOCK } from '../../../../mocks/reviews.mocks';
import { Review } from '../../../domain/models/review.model';
import { DataService } from '../../services/data.service';
import { ReviewSpringBootRepositoryImpl } from './review-springboot.repository.impl';

describe('ReviewSpringBootRepositoryImpl (Infrastructure)', () => {
  let repository: ReviewSpringBootRepositoryImpl;

  const countReviews = 5;
  const DataServiceMock = { getAllReviewsSpringBoot: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            ReviewSpringBootRepositoryImpl,
            { provide: DataService, useValue: DataServiceMock }
        ]
    })
    .compileComponents();
    repository = TestBed.inject(ReviewSpringBootRepositoryImpl)
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe delegar la llamada a DataService.getAllReviewsSpringBoot()', () => {
    const getAllSpy = DataServiceMock.getAllReviewsSpringBoot.mockReturnValue(of([]));
    repository.getAll(countReviews).subscribe();
    expect(getAllSpy).toHaveBeenCalledTimes(1);
    expect(getAllSpy).toHaveBeenCalledWith(countReviews);
  });

  it('debe devolver el listado de reseñas como Observable', (done) => {
    DataServiceMock.getAllReviewsSpringBoot.mockReturnValue(of(REVIEWS_MOCK))
    repository.getAll(countReviews).subscribe((reviews: Review[]) => {
      expect(reviews).toEqual(REVIEWS_MOCK);
      done();
    });
  });
});
