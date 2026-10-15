# Clean Architecture en SpringBoot

Backend desarrollado con **Spring Boot 4** (Java 25) aplicando los principios de
**Arquitectura Limpia (Clean Architecture)**. Expone las APIs de cinco módulos
funcionales: **usuarios**, **productos**, **reseñas**, **calificaciones** y
**comentarios**.

```
src/main/java/uceva/cleanarchitecture
│
├── domain
│   ├── entity/
│   │   ├── User.java
│   │   ├── Product.java
│   │   ├── Review.java
│   │   ├── Rating.java
│   │   └── Comment.java
│   │
│   └── repository/
│       ├── UserRepository.java
│       ├── ProductRepository.java
│       ├── ReviewRepository.java
│       ├── RatingRepository.java
│       └── CommentRepository.java
│
├── application
│   └── usecase/
│       ├── GetAllUsersUseCase.java
│       ├── GetAllProductsUseCase.java
│       ├── GetAllReviewsUseCase.java
│       ├── GetAllRatingsUseCase.java
│       └── GetAllCommentsUseCase.java
│
├── infrastructure
│   ├── controller/
│   │   ├── UserController.java
│   │   ├── ProductController.java
│   │   ├── ReviewController.java
│   │   ├── RatingController.java
│   │   └── CommentController.java
│   │
│   ├── repository/
│   │   ├── UserRepositoryImpl.java
│   │   ├── ProductRepositoryImpl.java
│   │   ├── ReviewRepositoryImpl.java
│   │   ├── RatingRepositoryImpl.java
│   │   └── CommentRepositoryImpl.java
│   │
│   └── datasource/
│       ├── UserDatasource.java
│       ├── ProductDatasource.java
│       ├── ReviewDatasource.java
│       ├── RatingDatasource.java
│       └── CommentDatasource.java
│
├── config
│   ├── AppConfig.java
│   ├── CorsConfig.java
│   └── OpenApiConfig.java
│
└── UcevaSpringBootTallerCleanArchitectureApplication.java
```

La regla de dependencia se respeta de adentro hacia afuera:
`Datasource → RepositoryImpl → Repository (contrato) → UseCase → Controller`.
Las capas **domain** y **application** no conocen a **infrastructure**.

---

## Módulos funcionales

| Módulo | Entidad | Endpoint | Atributos |
| --- | --- | --- | --- |
| Usuarios | `User` | `GET /api/users/{countUsers}` | `id`, `name`, `lastName`, `age`, `email`, `engineering` |
| Productos | `Product` | `GET /api/products/{countProducts}` | `id`, `name`, `category`, `price` |
| Reseñas | `Review` | `GET /api/reviews/{countReviews}` | `id`, `reviewer`, `product`, `comment`, `status` |
| Calificaciones | `Rating` | `GET /api/ratings/{countRatings}` | `id`, `rater`, `product`, `score`, `level` |
| Comentarios | `Comment` | `GET /api/comments/{countComments}` | `id`, `author`, `subject`, `message`, `type` |

Los valores enumerados (usados por Angular para pintar *badges*) son:

- **Review.status:** `Pendiente` · `Aprobada` · `Rechazada`
- **Rating.level:** `Bajo` · `Medio` · `Alto`
- **Comment.type:** `General` · `Soporte` · `Sugerencia`
- **User.engineering:** `Sistemas` · `Electronica` · `Biomedica` · `Industrial` · `Ambiental`
- **Product.category:** `Lacteos` · `Carnes` · `Frutas` · `Verduras`

---

## Pasos de implementación

### Paso 1 - Crear Entidades

```
src/main/java/uceva/cleanarchitecture/domain/entity
├── User.java
├── Product.java
├── Review.java
├── Rating.java
└── Comment.java
```

### Paso 2 - Crear Repositorios (contratos del dominio)

```
src/main/java/uceva/cleanarchitecture/domain/repository
├── UserRepository.java
├── ProductRepository.java
├── ReviewRepository.java
├── RatingRepository.java
└── CommentRepository.java
```

### Paso 3 - Crear Casos de Uso

```
src/main/java/uceva/cleanarchitecture/application/usecase
├── GetAllUsersUseCase.java
├── GetAllProductsUseCase.java
├── GetAllReviewsUseCase.java
├── GetAllRatingsUseCase.java
└── GetAllCommentsUseCase.java
```

### Paso 4 - Crear Controllers

```
src/main/java/uceva/cleanarchitecture/infrastructure/controller
├── UserController.java
├── ProductController.java
├── ReviewController.java
├── RatingController.java
└── CommentController.java
```

Los controladores están documentados con anotaciones de **Swagger**
(`@Tag`, `@Operation`, `@Parameter`, `@ApiResponse`) y delegan toda la lógica
en los casos de uso.

### Paso 5 - Crear Implementaciones de Repositorios

```
src/main/java/uceva/cleanarchitecture/infrastructure/repository
├── UserRepositoryImpl.java
├── ProductRepositoryImpl.java
├── ReviewRepositoryImpl.java
├── RatingRepositoryImpl.java
└── CommentRepositoryImpl.java
```

### Paso 6 - Agregar la Inyección de Dependencias

```
src/main/java/uceva/cleanarchitecture/config
└── AppConfig.java
```

`AppConfig` explota el **contenedor de inyección de dependencias nativo de
Spring** (`@Bean` + `@Configuration`) para cablear el grafo completo:
`Datasource → Repository → UseCase`. Los controladores reciben los casos de uso
por **constructor injection**.

---

## Funcionamiento del Backend

### Requisitos

- **Java JDK 25** (`java -version`)

### Ejecución

```bash
# Linux / macOS
./gradlew bootRun

# Windows
gradlew.bat bootRun
```

Debe mostrar: `Tomcat started on port 8080 (http) with context path '/api'`.

### URLs de consumo

```
Swagger UI:  http://localhost:8080/api/swagger-ui/index.html
OpenAPI JSON: http://localhost:8080/api/v3/api-docs

http://localhost:8080/api/users/{countUsers}
http://localhost:8080/api/products/{countProducts}
http://localhost:8080/api/reviews/{countReviews}
http://localhost:8080/api/ratings/{countRatings}
http://localhost:8080/api/comments/{countComments}
```

### Pruebas

```bash
gradlew.bat test
```

---

## Documentación Swagger / OpenAPI

La documentación se genera automáticamente con
[springdoc-openapi](https://springdoc.org/) a partir de las anotaciones de los
controladores y las entidades (`@Schema`). El título y la descripción se
definen en `config/OpenApiConfig.java`.

| Recurso | URL |
| --- | --- |
| Swagger UI | `http://localhost:8080/api/swagger-ui/index.html` |
| OpenAPI JSON | `http://localhost:8080/api/v3/api-docs` |
