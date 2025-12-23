#!/bin/bash

# GitHub Dashboard - Quick Start Script
# This script helps you get started with the GitHub Activity Dashboard

echo "🚀 GitHub Activity Dashboard - Quick Start"
echo "=========================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found!"
    echo "Please run this script from the github-dashboard directory"
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Installation failed. Please check your npm installation."
        exit 1
    fi
    echo "✅ Dependencies installed successfully!"
else
    echo "✅ Dependencies already installed"
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚙️  Creating .env file..."
    cp .env.example .env
    echo "✅ .env file created"
    echo "⚠️  Please update VITE_GITHUB_USERNAME in .env file"
else
    echo "✅ .env file exists"
fi

echo ""
echo "📋 Current Configuration:"
echo "------------------------"
if [ -f ".env" ]; then
    grep "VITE_GITHUB_USERNAME" .env || echo "Username: Not set"
    if grep -q "VITE_GITHUB_TOKEN=.\+" .env; then
        echo "GitHub Token: ✅ Configured"
    else
        echo "GitHub Token: ⚠️  Not configured (optional but recommended)"
    fi
fi

echo ""
echo "🎯 What to do next:"
echo "-------------------"
echo "1. Edit .env file to set your GitHub username"
echo "2. (Optional) Add GitHub token for higher API rate limits"
echo "3. Run: npm run dev"
echo "4. Open: http://localhost:3000"
echo ""
echo "📖 For detailed instructions, see QUICKSTART.md or README.md"
echo ""
echo "🚀 Starting development server..."
echo ""

# Start the development server
npm run dev
