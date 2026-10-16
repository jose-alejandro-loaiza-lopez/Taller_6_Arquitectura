import { test, mock } from 'node:test';
import assert from 'node:assert/strict';

import { UserRepositoryImpl } from '../src/infrastructure/repositories/user.repository.impl';
import { ProductRepositoryImpl } from '../src/infrastructure/repositories/product.repository.impl';
import { ReviewRepositoryImpl } from '../src/infrastructure/repositories/review.repository.impl';
import { RatingRepositoryImpl } from '../src/infrastructure/repositories/rating.repository.impl';
import { CommentRepositoryImpl } from '../src/infrastructure/repositories/comment.repository.impl';

import { UserDatasource } from '../src/infrastructure/datasources/user.datasource';
import { ProductDatasource } from '../src/infrastructure/datasources/product.datasource';
import { ReviewDatasource } from '../src/infrastructure/datasources/review.datasource';
import { RatingDatasource } from '../src/infrastructure/datasources/rating.datasource';
import { CommentDatasource } from '../src/infrastructure/datasources/comment.datasource';

import type { User } from '../src/domain/models/user.model';
import type { Product } from '../src/domain/models/product.model';
import type { Review } from '../src/domain/models/review.model';
import type { Rating } from '../src/domain/models/rating.model';
import type { Comment } from '../src/domain/models/comment.model';

/**
 * Pruebas de la capa de Infrastructure (Repositorios).
 *
 * Verifican que cada repositorio sea un **adaptador** transparente:
 * delega la llamada en su datasource con el mismo argumento y
 * devuelve exactamente el resultado recibido.
 */

test('UserRepositoryImpl delega getAll en el datasource', async () => {
  const data: User[] = [
    { id: 1, name: 'Ana', lastName: 'Gomez', age: 20, email: 'a@mail.com', engineering: 'Sistemas' },
  ];
  const getAll = mock.fn(async () => data);
  const repository = new UserRepositoryImpl({ getAll } as unknown as UserDatasource);

  const result = await repository.getAll(3);

  assert.equal(result, data);
  assert.equal(getAll.mock.callCount(), 1);
  assert.deepEqual(getAll.mock.calls[0]!.arguments, [3]);
});

test('ProductRepositoryImpl delega getAll en el datasource', async () => {
  const data: Product[] = [{ id: 1, name: 'Leche', category: 'Lacteos', price: 4500 }];
  const getAll = mock.fn(async () => data);
  const repository = new ProductRepositoryImpl({ getAll } as unknown as ProductDatasource);

  const result = await repository.getAll(7);

  assert.equal(result, data);
  assert.equal(getAll.mock.callCount(), 1);
  assert.deepEqual(getAll.mock.calls[0]!.arguments, [7]);
});

test('ReviewRepositoryImpl delega getAll en el datasource', async () => {
  const data: Review[] = [
    { id: 1, reviewer: 'Carlos', product: 'Leche', comment: 'Bueno', status: 'Aprobada' },
  ];
  const getAll = mock.fn(async () => data);
  const repository = new ReviewRepositoryImpl({ getAll } as unknown as ReviewDatasource);

  const result = await repository.getAll(2);

  assert.equal(result, data);
  assert.equal(getAll.mock.callCount(), 1);
  assert.deepEqual(getAll.mock.calls[0]!.arguments, [2]);
});

test('RatingRepositoryImpl delega getAll en el datasource', async () => {
  const data: Rating[] = [{ id: 1, rater: 'Ana', product: 'Manzana', score: 5, level: 'Alto' }];
  const getAll = mock.fn(async () => data);
  const repository = new RatingRepositoryImpl({ getAll } as unknown as RatingDatasource);

  const result = await repository.getAll(4);

  assert.equal(result, data);
  assert.equal(getAll.mock.callCount(), 1);
  assert.deepEqual(getAll.mock.calls[0]!.arguments, [4]);
});

test('CommentRepositoryImpl delega getAll en el datasource', async () => {
  const data: Comment[] = [
    { id: 1, author: 'Carlos', subject: 'Leche', message: 'Excelente', type: 'General' },
  ];
  const getAll = mock.fn(async () => data);
  const repository = new CommentRepositoryImpl({ getAll } as unknown as CommentDatasource);

  const result = await repository.getAll(1);

  assert.equal(result, data);
  assert.equal(getAll.mock.callCount(), 1);
  assert.deepEqual(getAll.mock.calls[0]!.arguments, [1]);
});
