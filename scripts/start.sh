#!/bin/bash

# Chemin absolu vers la racine du projet
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "🧊 Starting LeFrigo..."

# Fonction pour ouvrir un onglet Terminal avec un titre et une commande
open_tab() {
  local title="$1"
  local cmd="$2"
  osascript <<EOF
tell application "Terminal"
  activate
  tell application "System Events" to keystroke "t" using command down
  delay 0.4
  do script "printf '\\\\033]0;${title}\\\\007' && cd '${ROOT}' && ${cmd}" in front window
end tell
EOF
}

# 1. Docker
echo "🐳 Starting Docker..."
node --experimental-strip-types "$ROOT/scripts/tasks/docker-up.ts"

# 2. VSCode
echo "💻 Opening VSCode..."
node --experimental-strip-types "$ROOT/scripts/tasks/open-vscode.ts"

# 3. API  →  onglet Terminal dédié
echo "⚙️  Opening API terminal..."
open_tab "LeFrigo — API" "node --experimental-strip-types scripts/tasks/start-api.ts"

# 4. Web  →  onglet Terminal dédié
echo "🌐 Opening Web terminal..."
open_tab "LeFrigo — Web" "node --experimental-strip-types scripts/tasks/start-web.ts"

# 5. Prisma Studio  →  onglet Terminal dédié
echo "🗄️  Opening Prisma terminal..."
open_tab "LeFrigo — Prisma" "node --experimental-strip-types scripts/tasks/open-prisma.ts"

# 6. Navigateur (délai géré dans le script)
echo "🌍 Scheduling browser open..."
node --experimental-strip-types "$ROOT/scripts/tasks/open-browser.ts" &

echo ""
echo "✅ LeFrigo is running"
echo "   Frontend  → http://localhost:3000"
echo "   API       → http://localhost:4000"
echo "   Prisma    → http://localhost:5555"