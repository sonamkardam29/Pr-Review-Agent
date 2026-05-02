from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from agent.agent_core import run_agent

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class ReviewRequest(BaseModel):
    pr_url: str
    prompt: str

@app.post("/review")
async def review(req: ReviewRequest):
    result = await run_agent(req.pr_url, req.prompt)
    return result

@app.get("/prompt")
def get_prompt():
    with open("../prompts/system_prompt.txt", "r") as f:
        return {"prompt": f.read()}

@app.post("/prompt")
def save_prompt(data: dict):
    with open("../prompts/system_prompt.txt", "w") as f:
        f.write(data["prompt"])
    return {"status": "saved"}