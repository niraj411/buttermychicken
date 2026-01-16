#!/bin/bash

# Butter Chicken Deploy Script
# Run this on your VPS after pulling from git

set -e

echo "🍗 Deploying Butter Chicken..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the static export
echo "🔨 Building..."
npm run build

# Copy static files to web root (adjust path as needed)
WEBROOT="/home/buttermychicken/htdocs/www.buttermychicken.com"

echo "📁 Copying files to $WEBROOT..."
rm -rf $WEBROOT/*
cp -r out/* $WEBROOT/

echo "✅ Deployment complete!"
echo "🌐 Site is live at https://www.buttermychicken.com"
