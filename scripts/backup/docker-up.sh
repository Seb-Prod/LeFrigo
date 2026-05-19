#!/bin/bash

docker compose -f docker/mysql/docker-compose.yml up -d
echo "MySQL démarré"