#!/bin/bash

# Double-clique sur ce fichier pour lancer LeFrigo
# Place un alias de ce fichier sur le bureau

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
bash "$ROOT/scripts/start.sh"
