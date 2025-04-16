.PHONY: up down build start stop restart clean re ps

ENV 	?= prod
FLAG	:= --no-print-directory

# Do a "make" alone == "up prod" (first default rule).
# ENV is "prod" by default: if an argument like "ENV=dev" is passed to "make" cmd in shell, it will switch to dev mode.
ifeq ($(ENV), prod)
  CONFIG_FILE := ./docker-config/docker-compose-prod.yml
else
  CONFIG_FILE := ./docker-config/docker-compose-dev.yml
endif

up:
	@echo "Starting containers using configuration in $(ENV) mode..."
	@docker-compose -f $(CONFIG_FILE) up -d
	@echo "Containers are up and running."

down:
	@echo "Stopping and removing containers from configuration in $(ENV) mode..."
	@docker-compose -f $(CONFIG_FILE) down -v
	@echo "Containers stopped and removed."

build:
	@echo "Building services in $(ENV) mode..."
	@docker-compose -f $(CONFIG_FILE) build --no-cache
	@echo "Build completed."

start:
	@echo "Starting stopped containers..."
	@docker-compose -f $(CONFIG_FILE) start
	@echo "Containers started."

stop:
	@echo "Stopping running containers..."
	@docker-compose -f $(CONFIG_FILE) stop
	@echo "Containers stopped."

restart:
	@echo "Restarting containers..."
	@docker-compose -f $(CONFIG_FILE) restart
	@echo "Containers restarted."

clean: down
	@echo "Removing unused Docker images..."
	@docker image prune -f -a
	@echo "Cleanup complete."

re:
	@echo "Rebuilding and restarting environment..."
	@$(MAKE) $(FLAG) clean 
	@$(MAKE) $(FLAG) up
	@echo "Environment has been reset."

ps:
	@echo "Listing container status in $(ENV) mode"
	@docker-compose -f $(CONFIG_FILE) ps
