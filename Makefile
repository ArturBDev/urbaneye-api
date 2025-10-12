# Makefile for UrbanEye API

# Docker commands
.PHONY: build up down restart logs clean migrate seed

# Build and start containers
up:
	docker-compose up --build -d

# Stop containers
down:
	docker-compose down

# Restart containers
restart: down up

# View logs
logs:
	docker-compose logs -f urbaneye-api

# Clean up containers and volumes
clean:
	docker-compose down -v
	docker system prune -f

# Run migrations
migrate:
	docker-compose exec urbaneye-api npx prisma migrate deploy

# Run database seed
seed:
	docker-compose exec urbaneye-api npx prisma db seed

# Full setup (build, migrate, seed)
setup: up
	@echo "Waiting for database to be ready..."
	@sleep 10
	@make migrate
	@make seed
	@echo "API is ready at http://localhost:3000"
	@echo "Swagger docs at http://localhost:3000/api"

# Development commands
dev: up migrate seed

# Reset database
reset:
	docker-compose exec urbaneye-api npx prisma migrate reset --force
	@make seed
