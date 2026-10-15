import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../environments/environment';
import { Product } from '../../domain/models/product.model';
import { User } from '../../domain/models/user.model';
import { Review } from '../../domain/models/review.model';
import { Rating } from '../../domain/models/rating.model';
import { Comment } from '../../domain/models/comment.model';
import { DataService } from './data.service';
import { USERS_MOCK } from '../../../mocks/users.mocks';
import { PRODUCTS_MOCK } from '../../../mocks/products.mocks';
import { REVIEWS_MOCK } from '../../../mocks/reviews.mocks';
import { RATINGS_MOCK } from '../../../mocks/ratings.mocks';
import { COMMENTS_MOCK } from '../../../mocks/comments.mocks';

jest.mock('@faker-js/faker', () => ({
  faker: {
    commerce: {
      productName: jest.fn(() => 'Producto Test'),
      price: jest.fn(() => '10.00'),
    },
    person: {
      firstName: jest.fn(() => 'Juan'),
      lastName: jest.fn(() => 'Pérez'),
      fullName: jest.fn(() => 'Juan Pérez'),
    },
    number: {
      int: jest.fn(() => 30),
    },
    internet: {
      email: jest.fn(() => 'test@mail.com'),
    },
    lorem: {
      sentence: jest.fn(() => 'Comentario de prueba'),
      words: jest.fn(() => 'Tema de prueba'),
    },
    helpers: {
      arrayElement: jest.fn((arr) => arr[0]),
    },
  },
}));

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;
  
  const countUsers = 5;
  const countProducts = 5;
  const countReviews = 5;
  const countRatings = 5;
  const countComments = 5;
  const pathUrlNode = `${environment.baseUrlNode}/api`;
  const pathUrlSpringBoot = `${environment.baseUrlSpringBoot}/api`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verifica que no queden peticiones HTTP pendientes
    httpMock.verify();
  });

  it('debe crearse correctamente', () => {
      expect(service).toBeTruthy();
  });
  
  it('debe devolver el listado de usuarios locale', (done) => {
    service.getAllUsersLocal(countUsers).subscribe((users: User[]) => {
      expect(users.length).toEqual(countUsers);
      done();
    });
  });

  it('debe devolver el listado de productos locale', (done) => {
    service.getAllProductsLocal(countProducts).subscribe((products: Product[]) => {
      expect(products.length).toEqual(countProducts);
      done();
    });
  });

  it('debe obtener usuarios desde Node por HTTP', () => {
    service.getAllUsersNode(countUsers).subscribe((users) => {
      expect(users).toEqual(USERS_MOCK);
    });
    const req = httpMock.expectOne(`${pathUrlNode}/users/${countUsers}`);
    expect(req.request.method).toBe('GET');
    req.flush(USERS_MOCK);
  });

  it('debe obtener productos desde Node por HTTP', () => {
    service.getAllProductsNode(countProducts).subscribe((products) => {
      expect(products).toEqual(PRODUCTS_MOCK);
    });
    const req = httpMock.expectOne(`${pathUrlNode}/products/${countProducts}`);
    expect(req.request.method).toBe('GET');
    req.flush(PRODUCTS_MOCK);
  });

  it('debe obtener usuarios desde SpringBoot por HTTP', () => {
    service.getAllUsersSpringBoot(countUsers).subscribe((users) => {
      expect(users).toEqual(USERS_MOCK);
    });
    const req = httpMock.expectOne(`${pathUrlSpringBoot}/users/${countUsers}`);
    expect(req.request.method).toBe('GET');
    req.flush(USERS_MOCK);
  });

  it('debe obtener productos desde SpringBoot por HTTP', () => {
    service.getAllProductsSpringBoot(countProducts).subscribe((products) => {
      expect(products).toEqual(PRODUCTS_MOCK);
    });
    const req = httpMock.expectOne(`${pathUrlSpringBoot}/products/${countProducts}`);
    expect(req.request.method).toBe('GET');
    req.flush(PRODUCTS_MOCK);
  });

  it('debe devolver el listado de reseñas locale', (done) => {
    service.getAllReviewsLocal(countReviews).subscribe((reviews: Review[]) => {
      expect(reviews.length).toEqual(countReviews);
      done();
    });
  });

  it('debe devolver el listado de calificaciones locale', (done) => {
    service.getAllRatingsLocal(countRatings).subscribe((ratings: Rating[]) => {
      expect(ratings.length).toEqual(countRatings);
      done();
    });
  });

  it('debe devolver el listado de comentarios locale', (done) => {
    service.getAllCommentsLocal(countComments).subscribe((comments: Comment[]) => {
      expect(comments.length).toEqual(countComments);
      done();
    });
  });

  it('debe obtener reseñas desde Node por HTTP', () => {
    service.getAllReviewsNode(countReviews).subscribe((reviews) => {
      expect(reviews).toEqual(REVIEWS_MOCK);
    });
    const req = httpMock.expectOne(`${pathUrlNode}/reviews/${countReviews}`);
    expect(req.request.method).toBe('GET');
    req.flush(REVIEWS_MOCK);
  });

  it('debe obtener calificaciones desde Node por HTTP', () => {
    service.getAllRatingsNode(countRatings).subscribe((ratings) => {
      expect(ratings).toEqual(RATINGS_MOCK);
    });
    const req = httpMock.expectOne(`${pathUrlNode}/ratings/${countRatings}`);
    expect(req.request.method).toBe('GET');
    req.flush(RATINGS_MOCK);
  });

  it('debe obtener comentarios desde Node por HTTP', () => {
    service.getAllCommentsNode(countComments).subscribe((comments) => {
      expect(comments).toEqual(COMMENTS_MOCK);
    });
    const req = httpMock.expectOne(`${pathUrlNode}/comments/${countComments}`);
    expect(req.request.method).toBe('GET');
    req.flush(COMMENTS_MOCK);
  });

  it('debe obtener reseñas desde SpringBoot por HTTP', () => {
    service.getAllReviewsSpringBoot(countReviews).subscribe((reviews) => {
      expect(reviews).toEqual(REVIEWS_MOCK);
    });
    const req = httpMock.expectOne(`${pathUrlSpringBoot}/reviews/${countReviews}`);
    expect(req.request.method).toBe('GET');
    req.flush(REVIEWS_MOCK);
  });

  it('debe obtener calificaciones desde SpringBoot por HTTP', () => {
    service.getAllRatingsSpringBoot(countRatings).subscribe((ratings) => {
      expect(ratings).toEqual(RATINGS_MOCK);
    });
    const req = httpMock.expectOne(`${pathUrlSpringBoot}/ratings/${countRatings}`);
    expect(req.request.method).toBe('GET');
    req.flush(RATINGS_MOCK);
  });

  it('debe obtener comentarios desde SpringBoot por HTTP', () => {
    service.getAllCommentsSpringBoot(countComments).subscribe((comments) => {
      expect(comments).toEqual(COMMENTS_MOCK);
    });
    const req = httpMock.expectOne(`${pathUrlSpringBoot}/comments/${countComments}`);
    expect(req.request.method).toBe('GET');
    req.flush(COMMENTS_MOCK);
  });

});