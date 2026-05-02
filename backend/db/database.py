import json
import os

DB_FILE = "db/results.json"

def save_result(data):
    results = []
    if os.path.exists(DB_FILE):
        with open(DB_FILE, "r") as f:
            results = json.load(f)
    results.append(data)
    with open(DB_FILE, "w") as f:
        json.dump(results, f, indent=2)

def get_results():
    if os.path.exists(DB_FILE):
        with open(DB_FILE, "r") as f:
            return json.load(f)
    return []