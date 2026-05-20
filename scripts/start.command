#!/bin/bash

# Aller à la racine du projet (dossier parent du script)
cd "$(dirname "$0")/.." || exit 1

echo "🎯  Démarrage de LeFrigo..."
echo ""

# Vérifier que npx est disponible
if ! command -v npx &> /dev/null; then
  echo "❌ npx introuvable. Installe Node.js : https://nodejs.org"
  read -p "Appuie sur Entrée pour fermer..."
  exit 1
fi

# Lancer le script principal
npx tsx scripts/start.ts

# Garde le terminal ouvert en cas d'erreur
if [ $? -ne 0 ]; then
  echo ""
  echo "❌ Une erreur est survenue."
  read -p "Appuie sur Entrée pour fermer..."
fi
