import { test, mock } from 'node:test';
import assert from 'node:assert/strict';

import { GetAllUsersUseCase } from '../src/application/usecases/get-all-users.usecase';
import { GetAllProductsUseCase } from '../src/application/usecases/get-all-products.usecase';
import { GetAllReviewsUseCase } from '../src/application/usecases/get-all-reviews.usecase';
import { GetAllRatingsUseCase } from '../src/application/usecases/get-all-ratings.usecase';
import { GetAllCommentsUseCase } from '../src/application/usecases/get-all-comments.usecase';

import type { UserRepository } from '../src/domain/repositories/user.repository';
import type { ProductRepository } from '../src/domain/repositories/product.repository';
import type { ReviewRepository } from '../src/domain/repositories/review.repository';
import type { RatingRepository } from '../src/domain/repositories/rating.repository';
import type { CommentRepository } from '../src/domain/repositories/comment.repository';

import type { User } from '../src/domain/models/user.model';
import type { Product } from '../src/domain/models/product.model';
import type { Review } from '../src/domain/models/review.model';
import type { Rating } from '../src/domain/models/rating.model';
import type { Comment } from '../src/domain/models/comment.model';

/**
 * Pruebas de la capa de Application (Casos de Uso).
 *
 * Verifican que cada caso de uso orqueste la llamada al contrato
 * del repositorio inyectado (sin conocer su implementacion) y
 * propague el resultado.
 */

test('GetAllUsersUseCase.execute delega en UserRepository', async () => {
  const data: User[] = [
    { id: 1, name: 'Ana', lastName: 'Gomez', age: 20, email: 'a@mail.com', engineering: 'Sistemas' },
  ];
  const getAll = mock.fn(async () => data);
  const useCase = new GetAllUsersUseCase({ getAll } as unknown as UserRepository);

  const result = await useCase.execute(5);

  assert.equal(result, data);
  assert.equal(getAll.mock.callCount(), 1);
  assert.deepEqual(getAll.mock.calls[0]!.arguments, [5]);
});

test('GetAllProductsUseCase.execute delega en ProductRepository', async () => {
  const data: Product[] = [{ id: 1, name: 'Leche', category: 'Lacteos', price: 4500 }];
  const getAll = mock.fn(async () => data);
  const useCase = new GetAllProductsUseCase({ getAll } as unknown as ProductRepository);

  const result = await useCase.execute(3);

  assert.equal(result, data);
  assert.equal(getAll.mock.callCount(), 1);
  assert.deepEqual(getAll.mock.calls[0]!.arguments, [3]);
});

test('GetAllReviewsUseCase.execute delega en ReviewRepository', async () => {
  const data: Review[] = [
    { id: 1, reviewer: 'Carlos', product: 'Leche', comment: 'Bueno', status: 'Pendiente' },
  ];
  const getAll = mock.fn(async () => data);
  const useCase = new GetAllReviewsUseCase({ getAll } as unknown as ReviewRepository);

  const result = await useCase.execute(2);

  assert.equal(result, data);
  assert.equal(getAll.mock.callCount(), 1);
  assert.deepEqual(getAll.mock.calls[0]!.arguments, [2]);
});

test('GetAllRatingsUseCase.execute delega en RatingRepository', async () => {
  const data: Rating[] = [{ id: 1, rater: 'Ana', product: 'Manzana', score: 4, level: 'Medio' }];
  const getAll = mock.fn(async () => data);
  const useCase = new GetAllRatingsUseCase({ getAll } as unknown as RatingRepository);

  const result = await useCase.execute(9);

  assert.equal(result, data);
  assert.equal(getAll.mock.callCount(), 1);
  assert.deepEqual(getAll.mock.calls[0]!.arguments, [9]);
});

test('GetAllCommentsUseCase.execute delega en CommentRepository', async () => {
  const data: Comment[] = [
    { id: 1, author: 'Carlos', subject: 'Leche', message: 'Excelente', type: 'Sugerencia' },
  ];
  const getAll = mock.fn(async () => data);
  const useCase = new GetAllCommentsUseCase({ getAll } as unknown as CommentRepository);

  const result = await useCase.execute(1);

  assert.equal(result, data);
  assert.equal(getAll.mock.callCount(), 1);
  assert.deepEqual(getAll.mock.calls[0]!.arguments, [1]);
});
