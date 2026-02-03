#!/bin/bash
# Hostinger Auto-Deploy Script

echo "🚀 Starting Deployment..."

# 1. Install dependencies
echo "📦 Installing dependencies..."
npm ci --omit=dev

# 2. Generate Prisma Client
echo "🗄️ Generating Prisma..."
npx prisma generate

# 3. Clean previous build (optional but good for safety)
echo "🧹 Cleaning previous build..."
rm -rf .next

# 4. Build Next.js App with Memory Limit
echo "🏗️ Building App..."
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build

# 5. Start Server (handled by PM2 or similar on Hostinger)
echo "✅ Build Complete. Restart your Node.js application in Hostinger panel."
