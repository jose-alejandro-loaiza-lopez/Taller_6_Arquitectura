# Clean Architecture en Angular

Frontend del **Taller 6 — Clean Architecture**. Aplicación **Angular 20 (standalone)** que implementa el flujo completo de Arquitectura Limpia y consume datos desde tres orígenes intercambiables: **Local** (datos simulados), **Node.js** o **Spring Boot**.

## Módulos funcionales

| Módulo | Modelo | Ruta |
| --- | --- | --- |
| Usuarios | `User` | `/users` |
| Productos | `Product` | `/products` |
| Reseñas | `Review` | `/reviews` |
| Calificaciones | `Rating` | `/ratings` |
| Comentarios | `Comment` | `/comments` |

## Estructura del proyecto

```
src/app
│
├── core
│   ├── domain
│   │   ├── models
│   │   │   ├── user.model.ts
│   │   │   ├── product.model.ts
│   │   │   ├── review.model.ts
│   │   │   ├── rating.model.ts
│   │   │   └── comment.model.ts
│   │   └── repositories
│   │       ├── user.repository.ts
│   │       ├── product.repository.ts
│   │       ├── review.repository.ts
│   │       ├── rating.repository.ts
│   │       └── comment.repository.ts
│   │
│   ├── application
│   │   └── usecases
│   │       ├── get-all-users.usecase.ts
│   │       ├── get-all-products.usecase.ts
│   │       ├── get-all-reviews.usecase.ts
│   │       ├── get-all-ratings.usecase.ts
│   │       └── get-all-comments.usecase.ts
│   │
│   └── infrastructure
│       ├── services
│       │   └── data.service.ts               # HttpClient + generación local con faker
│       └── repositories
│           ├── local-implementation          # Datos locales simulados
│           ├── node-implementation           # Consumo del backend Node.js
│           └── springboot-implementation     # Consumo del backend Spring Boot
│
├── mocks                                      # Datos de prueba por módulo
│
├── presentation
│   ├── components                             # Tablas + componente de alerta
│   │   ├── users-table/
│   │   ├── products-table/
│   │   ├── reviews-table/
│   │   ├── ratings-table/
│   │   ├── comments-table/
│   │   └── alert/
│   └── pages                                  # Vistas por módulo
│       ├── users/
│       ├── products/
│       ├── reviews/
│       ├── ratings/
│       └── comments/
│
├── app.routes.ts
├── app.config.ts                              # Providers (Local / Node / Spring Boot)
└── app.ts                                     # Navbar
```

## Pasos de implementación

### Paso 1 — Crear modelos (Domain)
```
src/app/core/domain/models/
├── user.model.ts
├── product.model.ts
├── review.model.ts
├── rating.model.ts
└── comment.model.ts
```

### Paso 2 — Crear contratos de repositorio (Domain)
```
src/app/core/domain/repositories/
├── user.repository.ts
├── product.repository.ts
├── review.repository.ts
├── rating.repository.ts
└── comment.repository.ts
```

### Paso 3 — Crear casos de uso (Application)
```
src/app/core/application/usecases/
├── get-all-users.usecase.ts
├── get-all-products.usecase.ts
├── get-all-reviews.usecase.ts
├── get-all-ratings.usecase.ts
└── get-all-comments.usecase.ts
```

### Paso 4 — Crear servicio de datos (Infrastructure)
```
src/app/core/infrastructure/services/
└── data.service.ts
```

### Paso 5 — Crear implementaciones de repositorio (Infrastructure)
```
src/app/core/infrastructure/repositories/
├── local-implementation/        # user-local.repository.impl.ts (x5)
├── node-implementation/         # user-node.repository.impl.ts (x5)
└── springboot-implementation/   # user-springboot.repository.impl.ts (x5)
```

### Paso 6 — Configurar Providers
Archivo `src/app/app.config.ts`: se elige la implementación (Local, Node o Spring Boot) por cada contrato de repositorio.

### Paso 7 — Componentes y vistas (Presentation)
```
src/app/presentation/
├── components/   # tablas de cada módulo + alert
└── pages/        # una página por módulo
```

> Los componentes **no** llaman a los servicios ni a las APIs directamente: siempre pasan por los **casos de uso**.

---

# Funcionamiento del Frontend

## Instalar dependencias
```
npm install
```

## Ejecutar el frontend
```
npm run start
```
Disponible en <http://localhost:4200>.

## Cambiar la fuente de datos (Providers)

En `src/app/app.config.ts` se comenta el bloque activo y se descomenta el deseado:

```ts
// Node (por defecto)
{ provide: UserRepository, useClass: UserNodeRepositoryImpl },
// Local
// { provide: UserRepository, useClass: UserLocalRepositoryImpl },
// Spring Boot
// { provide: UserRepository, useClass: UserSpringBootRepositoryImpl },
```

> Con **Node** (por defecto) es necesario tener levantado el backend Node.js en el puerto `3000`.

URLs base en `src/environments/environment.ts`:
```
baseUrlNode: 'http://localhost:3000'
baseUrlSpringBoot: 'http://localhost:8080'
```

## Pruebas unitarias y cobertura
```
npm run test:coverage
```
Cobertura actual: **100 %** (requisito del taller: > 90 %).

## Documentación con Compodoc
```
npm run compodoc
```
Se genera en la carpeta `documentation/` y se abre automáticamente en el navegador.

## URLs de consumo
```
Frontend          http://localhost:4200/users, /products, /reviews, /ratings, /comments
Backend NodeJS    http://localhost:3000/api/users/{countUsers}
Backend NodeJS    http://localhost:3000/api/products/{countProducts}
Backend NodeJS    http://localhost:3000/api/reviews/{countReviews}
Backend NodeJS    http://localhost:3000/api/ratings/{countRatings}
Backend NodeJS    http://localhost:3000/api/comments/{countComments}
Swagger NodeJS    http://localhost:3000/api/docs
Backend SpringBoot http://localhost:8080/api/users/{countUsers}
Backend SpringBoot http://localhost:8080/api/products/{countProducts}
Swagger SpringBoot http://localhost:8080/api/swagger-ui/index.html
```
