from tools.github_tool import fetch_pr
from tools.lint_tool import run_linter
from tools.ai_tool import analyze_code

async def run_agent(pr_url, prompt):
    print("Step 1: Fetching PR...")
    code = fetch_pr(pr_url)

    print("Step 2: Running Linter...")
    lint = run_linter(code)

    print("Step 3: AI Analysis...")
    ai = analyze_code(code, prompt)

    return {
        "code_fetched": code[:200],
        "bugs": ai.get("bugs", []) + lint.get("issues", []),
        "suggestions": ai.get("suggestions", []),
        "security": ai.get("security", []),
        "severity": ai.get("severity", "Medium")
    }