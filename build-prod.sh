set -e # Exit immediately if a command exits with a non-zero status.

git pull
docker compose up -d --build
# docker compose -f docker-compose.prod.yml logs server -f
