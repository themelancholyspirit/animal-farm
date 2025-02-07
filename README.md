# Animal Farm Project

A modern web application inspired by George Orwell's Animal Farm, built with Angular (frontend) and NestJS (backend). The project uses Docker for containerization.

## 🚀 Features

- Angular-based frontend with modern UI
- NestJS backend with RESTful API
- Docker containerization
- Nginx reverse proxy
- SQLite database for data persistence

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:
- [Docker](https://docs.docker.com/get-docker/) (version 20.10.0 or higher)
- [Docker Compose](https://docs.docker.com/compose/install/) (version 1.29.0 or higher)

## 🏃‍♂️ Running the Application

1. Clone the repository:
```bash
git clone https://github.com/themelancholyspirit/animal-farm.git
cd animal-farm
```

2. Build and start the containers:
```bash
docker-compose up
```

The application will be available at:
- Frontend: http://localhost:4200
- Backend API: http://localhost:3000

To stop the application:
```bash
docker-compose down
```

## 🏗️ Project Structure

```
animal-farm/
├── animal-farm-frontend/     # Angular frontend application
├── animal-farm-backend/      # NestJS backend application
├── data/                     # SQLite database storage
├── docker-compose.yml        # Docker Compose configuration
└── README.md                 # This file

```
## 📝 Environment Variables

The application uses the following environment variables:

Backend:
- `NODE_ENV`: Set to 'production' in docker-compose.yml

Frontend:
- Environment configuration is handled through Angular's environment files

## 🔒 Security

- The application runs with non-root users in containers
- CORS is configured in the nginx reverse proxy
- Frontend assets are served through nginx
- Backend API is properly isolated

## 📦 Technologies Used

- Frontend:
  - Angular 16+
  - TypeScript
  - SCSS
  - nginx

- Backend:
  - NestJS
  - TypeScript
  - SQLite
  - TypeORM

- DevOps:
  - Docker
  - Docker Compose
  - nginx
  - Shell scripting

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details

