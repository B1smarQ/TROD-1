# TODO App Backend

Containerized TODO REST API built with NestJS, TypeORM, and PostgreSQL.

## Architecture

The project has two Docker services:

- `app`: NestJS API, validation, business logic, and data access.
- `db`: PostgreSQL database initialized with `db/init.sql`.

The TODO feature is split into controllers, services, repositories, DTOs, entities, and interfaces. The service depends on a repository interface token, keeping business logic independent from TypeORM.

## Run With Docker

Create a local Docker environment file from the example and set your own database password:

```bash
cp .env.example .env
```

```bash
docker-compose up --build
```

The API will be available at:

```text
http://localhost:3000
```

PostgreSQL is available only inside the Compose network. The app connects to it through the Docker service hostname configured in your local `.env` file:

```text
DB_HOST=db
DB_PORT=5432
POSTGRES_DB=...
POSTGRES_USER=...
POSTGRES_PASSWORD=...
```

To change host-facing settings, update `.env` instead of editing `docker-compose.yml`. For example, `APP_HOST_PORT` controls the host port that forwards to the API container.

## API

### Create Todo

```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Learn NestJS\",\"description\":\"Build a Dockerized API\"}"
```

### Get All Todos

```bash
curl http://localhost:3000/todos
```

Filter by completion status:

```bash
curl "http://localhost:3000/todos?completed=false"
```

### Get Todo By ID

```bash
curl http://localhost:3000/todos/<todo-id>
```

### Update Todo

```bash
curl -X PATCH http://localhost:3000/todos/<todo-id> \
  -H "Content-Type: application/json" \
  -d "{\"completed\":true}"
```

### Delete Todo

```bash
curl -X DELETE http://localhost:3000/todos/<todo-id>
```

Successful deletes return `204 No Content`.

## Local Development

From the `app` directory:

```bash
npm install
npm run start:dev
```

For local development outside Docker, set these environment variables or create an `.env` file:

```text
PORT=3000
DB_HOST=localhost
DB_PORT=5432
POSTGRES_DB=todo
POSTGRES_USER=todo_user
POSTGRES_PASSWORD=<your-local-password>
```

## Project Structure

```text
app/
  Dockerfile
  src/
    main.ts
    app.module.ts
    modules/todo/
      controllers/
      services/
      repositories/
      dto/
      entities/
      interfaces/
    common/
      filters/
      interceptors/
      guards/
      utils/
db/
  Dockerfile
  init.sql
docker-compose.yml
README.md
```
