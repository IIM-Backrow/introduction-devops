#!/bin/bash

docker compose down -v
docker compose build
docker compose up --remove-orphans
