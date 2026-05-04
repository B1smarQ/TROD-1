Here’s a clean, production-style **`SPEC.md`** you can give to a coding agent 👇

---

# 📄 SPEC.md — TODO App (NestJS + Docker)

## 1. 📌 Overview

Develop a **containerized TODO application backend** using **NestJS**, following **SOLID principles** and modern backend architecture practices.

The system consists of:

* Web API service (NestJS)
* Database (PostgreSQL recommended)

Each component must run in its **own Docker container** and communicate over a **Docker network**.

No UI is required — interaction via:

* Postman
* curl
* HTTP clients

---

## 2. 🧱 Architecture

### Components

1. **Web Application**

   * REST API
   * Business logic
   * Validation
   * Data access layer

2. **Database**

   * Persistent storage
   * Initialized via SQL script

---

### Deployment

* Use:

  * `docker-compose` (required)
  * Optional: `docker stack`
* Each service:

  * Runs in isolated container
  * Connected via internal Docker network

---

## 3. 📁 Project Structure

```bash
├── app
│   ├── Dockerfile
│   └── src
│       ├── main.ts
│       ├── app.module.ts
│       ├── modules
│       │   └── todo
│       │       ├── controllers
│       │       ├── services
│       │       ├── repositories
│       │       ├── dto
│       │       ├── entities
│       │       └── interfaces
│       └── common
│           ├── filters
│           ├── interceptors
│           ├── guards
│           └── utils
│
├── db
│   ├── Dockerfile
│   └── init.sql
│
├── docker-compose.yml
└── README.md
```

---

## 4. 🧠 Functional Requirements

The system must support CRUD operations for TODO items.

### Entity: Todo

```ts
Todo {
  id: UUID
  title: string
  description?: string
  completed: boolean
  createdAt: timestamp
  updatedAt: timestamp
}
```

---

### API Endpoints

| Method | Endpoint   | Description    |
| ------ | ---------- | -------------- |
| GET    | /todos     | Get all todos  |
| GET    | /todos/:id | Get todo by ID |
| POST   | /todos     | Create todo    |
| PATCH  | /todos/:id | Update todo    |
| DELETE | /todos/:id | Delete todo    |

---

## 5. 🧩 Technical Requirements

### Backend (NestJS)

* Use:

  * Controllers → routing
  * Services → business logic
  * Repositories → data access abstraction
* Use DTOs for validation
* Use class-validator & class-transformer
* Use dependency injection (built-in NestJS DI)

---

### Database

* Recommended: **PostgreSQL**
* Schema defined in `init.sql`
* Use ORM:

  * TypeORM or Prisma (choose one)

---

## 6. 🧪 Non-Functional Requirements

### Code Quality

* Follow **SOLID principles**:

  * Single Responsibility
  * Open/Closed
  * Liskov Substitution
  * Interface Segregation
  * Dependency Inversion

### Additional

* Modular architecture
* Clean folder structure
* Environment variables for config
* Error handling (global filters)
* Logging (basic)

---

## 7. 🐳 Docker Requirements

### app/Dockerfile

* Node.js base image
* Install dependencies
* Build NestJS app
* Run in production mode

### db/Dockerfile

* PostgreSQL image
* Copy `init.sql`
* Initialize DB on startup

---

### docker-compose.yml

Must define:

```yaml
services:
  app:
    build: ./app
    ports:
      - "3000:3000"
    depends_on:
      - db

  db:
    build: ./db
    ports:
      - "5432:5432"
    environment:
      POSTGRES_DB: todo
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
```

---

## 8. 🔌 API Usage

Example (curl):

```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn NestJS"}'
```

---

## 9. 📘 README Requirements

README must include:

* Project description
* Setup instructions
* How to run with Docker
* API examples
* Architecture explanation

---

## 10. 🎓 Acceptance Criteria

* Application runs via `docker-compose up`
* API is accessible
* CRUD operations work correctly
* Code follows SOLID principles
* Student can explain:

  * Architecture decisions
  * Docker setup
  * API design

---

## 11. 🚀 Optional Enhancements

* Pagination
* Filtering (completed / not completed)
* Swagger API docs
* Unit tests (Jest)

---

If you want, I can also generate:

* full starter code
* docker-compose + Dockerfiles
* NestJS module implementation

