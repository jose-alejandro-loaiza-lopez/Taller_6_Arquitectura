# Clean Architecture en NodeJS

Backend Node.js del **Taller 6 — Clean Architecture**. API REST construida con **Express 5** y **TypeScript**, aplicando el flujo completo de Arquitectura Limpia, con **inyección de dependencias** mediante un *composition root* propio y documentación **Swagger/OpenAPI**.

## Módulos funcionales

| Módulo | Modelo | Endpoint |
| --- | --- | --- |
| Usuarios | `User` | `GET /api/users/{countUsers}` |
| Productos | `Product` | `GET /api/products/{countProducts}` |
| Reseñas | `Review` | `GET /api/reviews/{countReviews}` |
| Calificaciones | `Rating` | `GET /api/ratings/{countRatings}` |
| Comentarios | `Comment` | `GET /api/comments/{countComments}` |

## Estructura del proyecto

```
src
│
├── domain                                     # Capa de dominio (sin dependencias externas)
│   ├── models
│   │   ├── user.model.ts
│   │   ├── product.model.ts
│   │   ├── review.model.ts
│   │   ├── rating.model.ts
│   │   └── comment.model.ts
│   └── repositories                           # Contratos (clases abstractas)
│       ├── user.repository.ts
│       ├── product.repository.ts
│       ├── review.repository.ts
│       ├── rating.repository.ts
│       └── comment.repository.ts
│
├── application                                # Capa de aplicación (casos de uso)
│   └── usecases
│       ├── get-all-users.usecase.ts
│       ├── get-all-products.usecase.ts
│       ├── get-all-reviews.usecase.ts
│       ├── get-all-ratings.usecase.ts
│       └── get-all-comments.usecase.ts
│
├── infrastructure                             # Capa de infraestructura
│   ├── datasources                            # Fuentes de datos (faker)
│   │   ├── user.datasource.ts
│   │   ├── product.datasource.ts
│   │   ├── review.datasource.ts
│   │   ├── rating.datasource.ts
│   │   └── comment.datasource.ts
│   ├── repositories                           # Implementaciones de los contratos
│   │   ├── user.repository.impl.ts
│   │   ├── product.repository.impl.ts
│   │   ├── review.repository.impl.ts
│   │   ├── rating.repository.impl.ts
│   │   └── comment.repository.impl.ts
│   └── web                                    # Framework externo (Express)
│       ├── config                             # envs, swagger, swagger.schemas
│       ├── erros                              # custom.error, handle.error
│       ├── interfaces                         # server.interface
│       ├── controllers                        # 5 controladores
│       ├── routes                             # 5 + routes.ts
│       └── server.ts
│
├── dependency-injection
│   └── container.ts                           # Composition Root (inyección de dependencias)
│
└── app.ts
```

## Pasos de implementación

### Paso 1 — Crear modelos (Domain)
```
src/domain/models/
├── user.model.ts
├── product.model.ts
├── review.model.ts
├── rating.model.ts
└── comment.model.ts
```

### Paso 2 — Crear contratos de repositorio (Domain)
```
src/domain/repositories/
├── user.repository.ts
├── product.repository.ts
├── review.repository.ts
├── rating.repository.ts
└── comment.repository.ts
```

### Paso 3 — Crear casos de uso (Application)
```
src/application/usecases/
├── get-all-users.usecase.ts
├── get-all-products.usecase.ts
├── get-all-reviews.usecase.ts
├── get-all-ratings.usecase.ts
└── get-all-comments.usecase.ts
```

### Paso 4 — Crear datasources (Infrastructure)
```
src/infrastructure/datasources/
├── user.datasource.ts
├── product.datasource.ts
├── review.datasource.ts
├── rating.datasource.ts
└── comment.datasource.ts
```

### Paso 5 — Crear repositorios implementados (Infrastructure)
```
src/infrastructure/repositories/
├── user.repository.impl.ts
├── product.repository.impl.ts
├── review.repository.impl.ts
├── rating.repository.impl.ts
└── comment.repository.impl.ts
```

### Paso 6 — Implementar la capa Web (Express — Framework externo)
```
src/infrastructure/web/
├── config/
├── erros/
├── interfaces/
├── controllers/
├── routes/
└── server.ts
```

### Paso 7 — Inyección de dependencias y composición global
El archivo `src/dependency-injection/container.ts` es el **Composition Root**: construye y cablea manualmente todo el grafo de dependencias

```
Datasource → Repository → UseCase → Controller
```

y expone un controlador por cada módulo. Las rutas consumen el contenedor, por lo que **no instancian dependencias**:

```ts
router.get("/:countReviews", Container.reviewsController.getAllReviews);
```

---

# Funcionamiento del Backend

## Instalar dependencias
```
npm install
```

## Variables de entorno (`.env`)
```
PORT=3000
PUBLIC_PATH="public"
```

## Ejecutar el backend
```
npm run start
```
Disponible en <http://localhost:3000>.

## Documentación Swagger
```
http://localhost:3000/api/docs
```

## URLs de consumo
```
http://localhost:3000/api/docs
http://localhost:3000/api/users/{countUsers}
http://localhost:3000/api/products/{countProducts}
http://localhost:3000/api/reviews/{countReviews}
http://localhost:3000/api/ratings/{countRatings}
http://localhost:3000/api/comments/{countComments}
```
