#!/bin/bash
set -e

cd "$(dirname "$0")"

if [ ! -f .env ]; then
  echo "⚠️  No .env file found. Copying .env.example..."
  cp .env.example .env
  echo "✏️  Please edit .env and add your Supabase URL and anon key, then re-run this script."
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "📦 Installing dependencies..."
  npm install
fi

echo "🚀 Starting UpLevel dev server..."
npm run dev
