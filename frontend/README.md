# 🤖 PR Review Agent

AI-powered agentic system that automatically reviews GitHub Pull Requests.

## Problem
Manual code reviews are slow, inconsistent, and miss security issues.

## Solution
An AI agent that autonomously fetches PR code, runs static analysis, 
and uses Claude AI to provide detailed review with bugs, suggestions, and security issues.

## Architecture
User → Frontend (React) → Backend API (FastAPI) → Agent Core → Tools → Results

Tools used by agent:
- GitHub Tool: Fetches PR diff via GitHub API
- Linter Tool: Static code analysis
- AI Tool: Google Gemini API for deep analysis

## Setup

### Backend
cd backend
pip install fastapi uvicorn python-dotenv requests anthropic
cp ../.env.example ../.env
# Add your API keys to .env
uvicorn main:app --reload

### Frontend
cd frontend
npm install
npm run dev

## Key Feature — Editable Prompts
Agent prompts are NOT hidden in code. Edit them via UI or `prompts/system_prompt.txt`.

## Testing
pytest tests/ -v

## Tech Stack
- Backend: Python, FastAPI
- Frontend: React, Tailwind CSS
- AI: Google Gemini
- Database: JSON file store

## 🏗️ Architecture  
![Architecture](docs/architecture1.png)

## 📸 Output
![Output](docs/output1.png)
![Output](docs/output2.png)