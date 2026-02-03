#!/bin/bash
# Hostinger Auto-Deploy Script

echo "🚀 Starting Deployment..."

# 1. Install dependencies
echo "📦 Installing dependencies..."
npm ci --omit=dev

# 2. Generate Prisma Client
echo "🗄️ Generating Prisma..."
npx prisma generate

# 3. Build Next.js App
echo "🏗️ Building App..."
npm run build

# 4. Start Server (handled by PM2 or similar on Hostinger)
echo "✅ Build Complete. Restart your Node.js application in Hostinger panel."
