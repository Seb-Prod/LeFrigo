#!/bin/bash

echo "🧊 Starting LeFrigo full stack..."

# 1. clean Next cache
echo "🧹 Cleaning Next.js cache..."
rm -rf apps/web/.next

# 2. start docker (MySQL)
echo "🐳 Starting Docker..."
docker compose up -d

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