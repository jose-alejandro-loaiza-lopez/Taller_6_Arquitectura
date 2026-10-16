import { test, mock } from 'node:test';
import assert from 'node:assert/strict';
import type { Request, Response } from 'express';

import { UsersController } from '../src/infrastructure/web/controllers/users.controller';
import { ProductsController } from '../src/infrastructure/web/controllers/products.controller';
import { ReviewsController } from '../src/infrastructure/web/controllers/reviews.controller';
import { RatingsController } from '../src/infrastructure/web/controllers/ratings.controller';
import { CommentsController } from '../src/infrastructure/web/controllers/comments.controller';

import { CustomError } from '../src/infrastructure/web/erros/custom.error';

/**
 * Pruebas de la capa de Frameworks & Drivers (Controladores HTTP).
 *
 * Los controladores incluyen un `setTimeout` demostrativo (~3s); por
 * eso se usan los *mock timers* del runner de Node para avanzar el
 * reloj de forma instantanea y no esperar en tiempo real.
 */

/** Crea un `Response` falso que registra el status y el cuerpo enviados. */
function createResponse() {
  return {
    statusCode: undefined as number | undefined,
    body: undefined as unknown,
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    json(payload: unknown) {
      this.body = payload;
      return this;
    },
  };
}

/** Permite que se resuelvan las microtareas pendientes del controlador. */
const flushMicrotasks = () => new Promise<void>((resolve) => setImmediate(resolve));

test('UsersController responde 201 con el listado de usuarios', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const users = [{ id: 1 }];
  const execute = mock.fn(async () => users);
  const controller = new UsersController({ execute } as never);
  const res = createResponse();

  controller.getAllUsers({ params: { countUsers: '2' } } as unknown as Request, res as unknown as Response);
  t.mock.timers.tick(3000);
  await flushMicrotasks();

  assert.equal(res.statusCode, 201);
  assert.equal(res.body, users);
  assert.deepEqual(execute.mock.calls[0]!.arguments, [2]);
});

test('ProductsController responde 201 con el listado de productos', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const products = [{ id: 1 }];
  const execute = mock.fn(async () => products);
  const controller = new ProductsController({ execute } as never);
  const res = createResponse();

  controller.getAllProducts({ params: { countProducts: '4' } } as unknown as Request, res as unknown as Response);
  t.mock.timers.tick(3000);
  await flushMicrotasks();

  assert.equal(res.statusCode, 201);
  assert.equal(res.body, products);
  assert.deepEqual(execute.mock.calls[0]!.arguments, [4]);
});

test('ReviewsController responde 201 con el listado de reseñas', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const reviews = [{ id: 1 }];
  const execute = mock.fn(async () => reviews);
  const controller = new ReviewsController({ execute } as never);
  const res = createResponse();

  controller.getAllReviews({ params: { countReviews: '3' } } as unknown as Request, res as unknown as Response);
  t.mock.timers.tick(3000);
  await flushMicrotasks();

  assert.equal(res.statusCode, 201);
  assert.equal(res.body, reviews);
  assert.deepEqual(execute.mock.calls[0]!.arguments, [3]);
});

test('RatingsController responde 201 con el listado de calificaciones', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const ratings = [{ id: 1 }];
  const execute = mock.fn(async () => ratings);
  const controller = new RatingsController({ execute } as never);
  const res = createResponse();

  controller.getAllRatings({ params: { countRatings: '7' } } as unknown as Request, res as unknown as Response);
  t.mock.timers.tick(3000);
  await flushMicrotasks();

  assert.equal(res.statusCode, 201);
  assert.equal(res.body, ratings);
  assert.deepEqual(execute.mock.calls[0]!.arguments, [7]);
});

test('CommentsController responde 201 con el listado de comentarios', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const comments = [{ id: 1 }];
  const execute = mock.fn(async () => comments);
  const controller = new CommentsController({ execute } as never);
  const res = createResponse();

  controller.getAllComments({ params: { countComments: '1' } } as unknown as Request, res as unknown as Response);
  t.mock.timers.tick(3000);
  await flushMicrotasks();

  assert.equal(res.statusCode, 201);
  assert.equal(res.body, comments);
  assert.deepEqual(execute.mock.calls[0]!.arguments, [1]);
});

test('UsersController delega los errores de CustomError a HandleError', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  t.mock.method(console, 'log', () => {});
  const execute = mock.fn(async () => {
    throw CustomError.badRequest('boom');
  });
  const controller = new UsersController({ execute } as never);
  const res = createResponse();

  controller.getAllUsers({ params: { countUsers: '1' } } as unknown as Request, res as unknown as Response);
  t.mock.timers.tick(3000);
  await flushMicrotasks();

  assert.equal(res.statusCode, 400);
  assert.deepEqual(res.body, { error: 'boom' });
});

test('CommentsController responde 500 ante errores no controlados', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  t.mock.method(console, 'log', () => {});
  const execute = mock.fn(async () => {
    throw new Error('inesperado');
  });
  const controller = new CommentsController({ execute } as never);
  const res = createResponse();

  controller.getAllComments({ params: { countComments: '1' } } as unknown as Request, res as unknown as Response);
  t.mock.timers.tick(3000);
  await flushMicrotasks();

  assert.equal(res.statusCode, 500);
  assert.deepEqual(res.body, { error: 'Internal Server error' });
});
