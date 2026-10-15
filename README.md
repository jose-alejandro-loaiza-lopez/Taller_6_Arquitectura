# Taller 6 — Clean Architecture (Monorepo)

Implementación del flujo completo de **Arquitectura Limpia (Clean Architecture)** en tres tecnologías, integradas dentro de un único **monorepo**:

| Proyecto | Carpeta | Tecnología | Puerto |
| --- | --- | --- | --- |
| Frontend | [`Uceva-Angular-Taller-Clean-Architecture`](./Uceva-Angular-Taller-Clean-Architecture) | Angular 20 (standalone) | `4200` |
| Backend A | [`Uceva-NodeJS-Taller-Clean-Architecture`](./Uceva-NodeJS-Taller-Clean-Architecture) | Node.js + Express + TypeScript | `3000` |
| Backend B | [`Uceva-SpringBoot-Taller-Clean-Architecture`](./Uceva-SpringBoot-Taller-Clean-Architecture) | Spring Boot 4 (Java 25) | `8080` |

> Proyecto académico — **Arquitectura de Software — Taller 6**.

---

## 📌 Descripción

El taller consiste en construir **tres módulos funcionales** aplicando Clean Architecture en cada tecnología y luego **integrar** el frontend Angular con los dos backends.

Los **tres módulos funcionales nuevos** son:

| Módulo | Ruta frontend | Endpoint backend | Atributos |
| --- | --- | --- | --- |
| **Reseñas** (Review) | `/reviews` | `/api/reviews/{count}` | `id`, `reviewer`, `product`, `comment`, `status` |
| **Calificaciones** (Rating) | `/ratings` | `/api/ratings/{count}` | `id`, `rater`, `product`, `score`, `level` |
| **Comentarios** (Comment) | `/comments` | `/api/comments/{count}` | `id`, `author`, `subject`, `message`, `type` |

Sobre los módulos base ya provistos por las plantillas:

| Módulo base | Ruta frontend | Endpoint backend |
| --- | --- | --- |
| Usuarios (User) | `/users` | `/api/users/{count}` |
| Productos (Product) | `/products` | `/api/products/{count}` |

Los estados/categorías se restringen por tipos para mapear *badges* de color en la UI:

- **Review.status:** `Pendiente` · `Aprobada` · `Rechazada`
- **Rating.level:** `Bajo` · `Medio` · `Alto`
- **Comment.type:** `General` · `Soporte` · `Sugerencia`

---

## 🗂️ Estructura del monorepo

```
Taller 6/
├── README.md                                  ← este archivo (guía general del monorepo)
├── taller6.txt                                ← enunciado del taller
│
├── Uceva-Angular-Taller-Clean-Architecture/   ← Frontend (Angular + Jest + Compodoc)
│   └── README.md                              ← documentación técnica del frontend
│
├── Uceva-NodeJS-Taller-Clean-Architecture/    ← Backend Node.js (Express + Swagger)
│   └── README.md                              ← documentación técnica del backend Node
│
└── Uceva-SpringBoot-Taller-Clean-Architecture/ ← Backend Spring Boot (Swagger)
    └── README.md                              ← documentación técnica del backend Spring
```

Cada subproyecto es **independiente** (tiene su propio `package.json` / `build.gradle` y su propio `README.md`). El monorepo solo los agrupa para la entrega.

---

## 🧱 Arquitectura Limpia (las 4 capas)

Las tres aplicaciones respetan la misma separación de responsabilidades:

```
┌───────────────────────────────────────────────────────────┐
│  INFRASTRUCTURE  (Frameworks & Drivers)                   │
│  Controllers · Datasources · Repositorios implementados   │
│  Servicios · UI (componentes y vistas)                    │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  APPLICATION  (Casos de uso)                        │  │
│  │  ┌───────────────────────────────────────────────┐  │  │
│  │  │  DOMAIN                                       │  │  │
│  │  │  Modelos/Entidades · Contratos de repositorio │  │  │
│  │  └───────────────────────────────────────────────┘  │  │
│  └─────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────┘
```

Regla de dependencia: **las capas internas nunca conocen a las externas.** Los casos de uso dependen de **interfaces** (contratos) de repositorio, y la infraestructura provee las implementaciones concretas mediante **inyección de dependencias**.

- **Angular:** los componentes consumen **casos de uso**; los *providers* (`app.config.ts`) seleccionan la implementación (Local / Node / Spring Boot).
- **Node.js:** `src/dependency-injection/container.ts` actúa como **composition root** propio (sin librerías), cableando `Datasource → Repository → UseCase → Controller`.
- **Spring Boot:** usa el contenedor de **inyección de dependencias nativo** de Spring (`AppConfig`).

---

## ✅ Requisitos previos

| Herramienta | Versión usada | Notas |
| --- | --- | --- |
| **Node.js** | v24.x (LTS) | Incluye `npm`. Para Angular y Node.js. |
| **npm** | v11.x | Gestor de paquetes de ambos proyectos JS. |
| **Java JDK** | **25** | Requerido por Spring Boot 4 (`build.gradle` fija toolchain 25). |
| **Git** | cualquiera | Para clonar el repositorio. |

> Verifica con: `node -v`, `npm -v`, `java -version`.

Los tres proyectos se ejecutan en **terminales separadas** (o en segundo plano), porque cada uno ocupa su propio puerto.

---

## 🚀 Tutorial de ejecución

### Paso 0 — Clonar el monorepo

```bash
git clone <URL-DEL-REPOSITORIO>.git
cd "Taller 6"
```

---

### Paso 1 — Backend Node.js (`:3000`)

```bash
cd Uceva-NodeJS-Taller-Clean-Architecture
npm install
```

Crea (o verifica) el archivo **`.env`** en la raíz del proyecto con:

```env
PORT=3000
PUBLIC_PATH="public"
```

Levanta el servidor en modo desarrollo (recarga automática):

```bash
npm run start
```

Debe mostrar: `Server Running on Port 3000`.

**Verificación rápida:**

- Docs Swagger: <http://localhost:3000/api/docs>
- Ejemplos:
  - <http://localhost:3000/api/users/5>
  - <http://localhost:3000/api/products/5>
  - <http://localhost:3000/api/reviews/5>
  - <http://localhost:3000/api/ratings/5>
  - <http://localhost:3000/api/comments/5>

> ⏱️ Los controladores incluyen un `setTimeout` demostrativo (~3 s) que simula latencia.

---

### Paso 2 — Backend Spring Boot (`:8080`)

```bash
cd Uceva-SpringBoot-Taller-Clean-Architecture
./gradlew bootRun        # Linux / macOS
gradlew.bat bootRun      # Windows (PowerShell / CMD)
```

Debe mostrar: `Tomcat started on port 8080 (http) with context path '/api'`.

> ⚠️ El contexto es `/api`, por eso todas las rutas empiezan por `/api`.

**Verificación rápida:**

- Swagger UI: <http://localhost:8080/api/swagger-ui/index.html>
- OpenAPI JSON: <http://localhost:8080/api/v3/api-docs>
- Ejemplos:
  - <http://localhost:8080/api/users/5>
  - <http://localhost:8080/api/products/5>

---

### Paso 3 — Frontend Angular (`:4200`)

```bash
cd Uceva-Angular-Taller-Clean-Architecture
npm install
npm run start
```

Abre <http://localhost:4200>. El **navbar** permite navegar por los cinco módulos:

- <http://localhost:4200/users>
- <http://localhost:4200/products>
- <http://localhost:4200/reviews>
- <http://localhost:4200/ratings>
- <http://localhost:4200/comments>

> Por defecto el frontend usa la implementación **Local** (datos simulados con *faker*), por lo que funciona sin necesidad de levantar los backends.

---

### Paso 4 — Cambiar de backend (Providers) 🔁

El cambio de fuente de datos **no requiere tocar casos de uso ni componentes**: se hace solo en los *providers*.

Archivo: `Uceva-Angular-Taller-Clean-Architecture/src/app/app.config.ts`.

Comenta el bloque **Local** y descomenta el que quieras usar:

```ts
// Local (por defecto)
{ provide: UserRepository, useClass: UserLocalRepositoryImpl },
// { provide: ProductRepository, useClass: ProductLocalRepositoryImpl },
// ...

// Node  👉 descomentar para consumir el backend Node (puerto 3000)
// { provide: UserRepository, useClass: UserNodeRepositoryImpl },
// { provide: ProductRepository, useClass: ProductNodeRepositoryImpl },
// ...

// Spring Boot  👉 descomentar para consumir Spring Boot (puerto 8080)
// { provide: UserRepository, useClass: UserSpringBootRepositoryImpl },
// { provide: ProductRepository, useClass: ProductSpringBootRepositoryImpl },
// ...
```

Las URLs base se configuran en `src/environments/environment.ts`:

```ts
export const environment = {
  baseUrlNode: 'http://localhost:3000',
  baseUrlSpringBoot: 'http://localhost:8080',
};
```

> Debe haber **un único** bloque de providers activo para cada repositorio (`UserRepository`, `ProductRepository`, `ReviewRepository`, `RatingRepository`, `CommentRepository`).

---

## 🧪 Pruebas y documentación

### Pruebas unitarias + cobertura (Angular)

```bash
cd Uceva-Angular-Taller-Clean-Architecture
npm run test:coverage
```

Resultado esperado: **cobertura ≥ 90 %** (el proyecto actual está al **100 %**).

### Documentación Compodoc (Angular)

```bash
cd Uceva-Angular-Taller-Clean-Architecture
npm run compodoc
```

Genera la documentación en `documentation/` (ábrela con un servidor local, p. ej. `npx http-server documentation`).

### Documentación Swagger / OpenAPI (backends)

| Backend | URL de Swagger UI |
| --- | --- |
| Node.js | <http://localhost:3000/api/docs> |
| Spring Boot | <http://localhost:8080/api/swagger-ui/index.html> |

---

## 🌐 Resumen de endpoints

**Node.js** (`http://localhost:3000`)

| Método | Endpoint | Descripción |
| --- | --- | --- |
| GET | `/api/users/{countUsers}` | Lista de usuarios |
| GET | `/api/products/{countProducts}` | Lista de productos |
| GET | `/api/reviews/{countReviews}` | Lista de reseñas |
| GET | `/api/ratings/{countRatings}` | Lista de calificaciones |
| GET | `/api/comments/{countComments}` | Lista de comentarios |
| GET | `/api/docs` | Documentación Swagger |

**Spring Boot** (`http://localhost:8080`, contexto `/api`)

| Método | Endpoint | Descripción |
| --- | --- | --- |
| GET | `/api/users/{countUsers}` | Lista de usuarios |
| GET | `/api/products/{countProducts}` | Lista de productos |
| GET | `/api/swagger-ui/index.html` | Documentación Swagger UI |

---

## 📝 Estándares de commits

Se utilizan **Conventional Commits** (`feat`, `fix`, `docs`, `test`, `refactor`, `chore`). Ejemplos:

```
feat(angular): agregar módulo de reseñas con casos de uso y tablas
feat(node): agregar módulos de reseñas, calificaciones y comentarios
feat(node): agregar contenedor de inyección de dependencias (composition root)
feat(springboot): agregar módulos funcionales y configuración de beans
docs: agregar README con instrucciones de ejecución del monorepo
test(angular): cubrir casos de uso y repositorios al 100%
fix(angular): ajustar providers para alternar entre backend Node y Spring Boot
```

---

## 📚 Documentación por proyecto

- Frontend Angular → [`Uceva-Angular-Taller-Clean-Architecture/README.md`](./Uceva-Angular-Taller-Clean-Architecture/README.md)
- Backend Node.js → [`Uceva-NodeJS-Taller-Clean-Architecture/README.md`](./Uceva-NodeJS-Taller-Clean-Architecture/README.md)
- Backend Spring Boot → [`Uceva-SpringBoot-Taller-Clean-Architecture/README.md`](./Uceva-SpringBoot-Taller-Clean-Architecture/README.md)
