import { test } from 'node:test';
import assert from 'node:assert/strict';

import { UserDatasource } from '../src/infrastructure/datasources/user.datasource';
import { ProductDatasource } from '../src/infrastructure/datasources/product.datasource';
import { ReviewDatasource } from '../src/infrastructure/datasources/review.datasource';
import { RatingDatasource } from '../src/infrastructure/datasources/rating.datasource';
import { CommentDatasource } from '../src/infrastructure/datasources/comment.datasource';

/**
 * Pruebas de la capa de Infrastructure (Datasources).
 *
 * Verifican que cada datasource genere la cantidad solicitada de
 * registros, con `id` secuencial y datos que respeten el contrato
 * del modelo de dominio (tipos y valores permitidos).
 */

test('UserDatasource.getAll genera la cantidad solicitada con datos validos', async () => {
  const datasource = new UserDatasource();

  const users = await datasource.getAll(5);

  assert.equal(users.length, 5);
  assert.deepEqual(
    users.map((user) => user.id),
    [1, 2, 3, 4, 5],
  );

  for (const user of users) {
    assert.equal(typeof user.name, 'string');
    assert.equal(typeof user.lastName, 'string');
    assert.ok(user.age >= 18 && user.age <= 65, 'age fuera de rango');
    assert.match(user.email, /@/, 'email invalido');
    assert.ok(
      ['Sistemas', 'Electronica', 'Biomedica', 'Industrial', 'Ambiental'].includes(
        user.engineering,
      ),
      'engineering fuera del dominio',
    );
  }
});

test('ProductDatasource.getAll genera la cantidad solicitada con datos validos', async () => {
  const datasource = new ProductDatasource();

  const products = await datasource.getAll(3);

  assert.equal(products.length, 3);
  assert.deepEqual(
    products.map((product) => product.id),
    [1, 2, 3],
  );

  for (const product of products) {
    assert.equal(typeof product.name, 'string');
    assert.equal(typeof product.price, 'number');
    assert.ok(
      ['Lacteos', 'Carnes', 'Frutas', 'Verduras'].includes(product.category),
      'category fuera del dominio',
    );
  }
});

test('ReviewDatasource.getAll genera la cantidad solicitada con datos validos', async () => {
  const datasource = new ReviewDatasource();

  const reviews = await datasource.getAll(4);

  assert.equal(reviews.length, 4);
  assert.deepEqual(
    reviews.map((review) => review.id),
    [1, 2, 3, 4],
  );

  for (const review of reviews) {
    assert.equal(typeof review.reviewer, 'string');
    assert.equal(typeof review.product, 'string');
    assert.equal(typeof review.comment, 'string');
    assert.ok(
      ['Pendiente', 'Aprobada', 'Rechazada'].includes(review.status),
      'status fuera del dominio',
    );
  }
});

test('RatingDatasource.getAll genera la cantidad solicitada con datos validos', async () => {
  const datasource = new RatingDatasource();

  const ratings = await datasource.getAll(2);

  assert.equal(ratings.length, 2);
  assert.deepEqual(
    ratings.map((rating) => rating.id),
    [1, 2],
  );

  for (const rating of ratings) {
    assert.equal(typeof rating.rater, 'string');
    assert.equal(typeof rating.product, 'string');
    assert.ok(rating.score >= 1 && rating.score <= 5, 'score fuera de rango');
    assert.ok(
      ['Bajo', 'Medio', 'Alto'].includes(rating.level),
      'level fuera del dominio',
    );
  }
});

test('CommentDatasource.getAll genera la cantidad solicitada con datos validos', async () => {
  const datasource = new CommentDatasource();

  const comments = await datasource.getAll(6);

  assert.equal(comments.length, 6);
  assert.deepEqual(
    comments.map((comment) => comment.id),
    [1, 2, 3, 4, 5, 6],
  );

  for (const comment of comments) {
    assert.equal(typeof comment.author, 'string');
    assert.equal(typeof comment.subject, 'string');
    assert.equal(typeof comment.message, 'string');
    assert.ok(
      ['General', 'Soporte', 'Sugerencia'].includes(comment.type),
      'type fuera del dominio',
    );
  }
});

test('los datasources devuelven un arreglo vacio cuando count es 0', async () => {
  assert.deepEqual(await new UserDatasource().getAll(0), []);
  assert.deepEqual(await new ProductDatasource().getAll(0), []);
  assert.deepEqual(await new ReviewDatasource().getAll(0), []);
  assert.deepEqual(await new RatingDatasource().getAll(0), []);
  assert.deepEqual(await new CommentDatasource().getAll(0), []);
});
