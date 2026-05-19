#!/bin/bash

# 📍 1. Force le script à se placer dans le dossier où il est stocké
cd "$(dirname "$0")"

# 📂 2. On remonte d'un cran si votre script est dans le dossier "scripts/"
# (Puisque vous êtes dans LeFrigo/scripts, on remonte pour être à la racine de LeFrigo)
cd ..

ROOT_DIR=$(pwd)
echo "📂 Dossier racine détecté : $ROOT_DIR"

echo "🧊 Starting LeFrigo full stack..."

# 1. clean Next cache
echo "🧹 Cleaning Next.js cache..."
rm -rf apps/web/.next

# 2. start docker (MySQL)
echo "🐳 Starting Docker..."

cd "$ROOT_DIR/docker/mysql"

if [ ! -f docker-compose.yml ]; then
    echo "❌ docker-compose.yml introuvable dans docker/"
    echo "$ROOT_DIR/docker"
    exit 1
fi

docker compose up -d
cd "$ROOT_DIR"

# 3. open Prisma Studio (background)
echo "🗄️ Starting Prisma Studio..."
cd apps/api
pnpm prisma studio &

# 4. start backend
echo "⚙️ Starting API..."
pnpm dev --filter @lefrigo/api &

# 5. start frontend
echo "🌐 Starting Web..."
cd ../web
pnpm dev &

# 6. open VSCode
echo "💻 Opening VSCode..."
cd ../../
code .

# 7. open browser
echo "🌍 Opening browser..."
open http://localhost:3000

echo "✅ LeFrigo is running"
