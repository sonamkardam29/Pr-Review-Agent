import os
import requests
import json

def analyze_code(code, prompt):
    api_key = os.getenv("GEMINI_API_KEY", "")
    
    if not api_key:
        return {
            "bugs": ["API key missing"],
            "suggestions": ["Add GEMINI_API_KEY to .env"],
            "security": [],
            "severity": "Low"
        }

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={api_key}"
    
    body = {
        "contents": [{
            "parts": [{
                "text": f"{prompt}\n\nCode to review:\n{code}\n\nRespond ONLY in this JSON format:\n{{\"bugs\": [\"bug1\"], \"suggestions\": [\"s1\"], \"security\": [\"issue1\"], \"severity\": \"High/Medium/Low\"}}"
            }]
        }]
    }
    
    res = requests.post(url, json=body)
    text = res.json()["candidates"][0]["content"]["parts"][0]["text"]
    
    # JSON clean karo
    start = text.find("{")
    end = text.rfind("}") + 1
    return json.loads(text[start:end])