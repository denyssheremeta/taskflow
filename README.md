# TaskFlow

TaskFlow is a small fullstack task manager built as a production-like learning project.

Users can:
- register
- log in
- stay authenticated with JWT
- create, view, update, and delete their own tasks

The project is intentionally simple in scope, but structured to demonstrate backend fundamentals, API design, authentication, database ownership rules, and frontend integration.

## Tech Stack

### Backend
- Node.js
- Express
- PostgreSQL
- Prisma ORM
- JWT authentication
- bcrypt
- Zod
- TypeScript

### Frontend
- React
- Vite
- TypeScript
- React Router
- TanStack Query
- Axios

## Features

- User registration
- User login
- Current authenticated user endpoint
- Protected task CRUD
- Ownership checks so each user can access only their own tasks
- Validation and centralized error handling
- Frontend auth flow with protected routes
- Frontend task management UI connected to the backend API

## Project Structure

```text
taskflow/
  backend/
    prisma/
    src/
      config/
      controllers/
      db/
      middlewares/
      routes/
      schemas/
      services/
      types/
      utils/
  frontend/
    src/
      api/
      app/
      components/
      features/
        auth/
        tasks/
      pages/
```

## Local Setup

### 1. Clone the project

```bash
git clone <your-repo-url>
cd taskflow
```

### 2. Start PostgreSQL

```bash
docker compose up -d
```

### 3. Configure environment variables

Backend:

```bash
cp backend/.env.example backend/.env
```

Frontend:

```bash
cp frontend/.env.example frontend/.env
```

### 4. Install dependencies

Backend:

```bash
cd backend
npm install
```

Frontend:

```bash
cd frontend
npm install
```

### 5. Run Prisma migration

```bash
cd backend
npm run prisma:migrate
```

### 6. Start the app

Backend:

```bash
cd backend
npm run dev
```

Frontend:

```bash
cd frontend
npm run dev
```

## Environment Variables

### Backend `.env`

```env
PORT=5000
NODE_ENV=development
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/taskflow?schema=public"
JWT_SECRET="your-jwt-secret"
CLIENT_URL="http://localhost:5173"
```

### Frontend `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

## API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Tasks
- `GET /api/tasks`
- `GET /api/tasks/:id`
- `POST /api/tasks`
- `PATCH /api/tasks/:id`
- `DELETE /api/tasks/:id`

## Backend Notes

- Controllers handle HTTP request and response logic.
- Services contain business logic and Prisma queries.
- Zod is used for request validation.
- `AppError` and a centralized error middleware keep error handling consistent.
- Ownership checks are enforced in the task service layer using `userId` in Prisma queries.

## Frontend Notes

- JWT is stored in `localStorage` for simplicity in this learning project.
- Axios automatically sends the Bearer token.
- TanStack Query manages server state for current user and tasks.
- Protected routes rely on `/auth/me` instead of trusting only the token in storage.

## Build Commands

Backend:

```bash
cd backend
npm run build
```

Frontend:

```bash
cd frontend
npm run build
```

## Portfolio Notes

This project demonstrates:
- REST API design
- authentication and authorization
- database relations and ownership rules
- backend validation and error handling
- frontend and backend integration
- React Query server-state management
- production-like folder structure without overengineering

## Future Improvements

- filter tasks by status
- add task sorting
- improve form UX and inline notifications
- add deployment links
- switch to cookie-based auth for stronger production security

