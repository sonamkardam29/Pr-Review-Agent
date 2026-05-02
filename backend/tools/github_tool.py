import os
import requests

def fetch_pr(pr_url):
    token = os.getenv("GITHUB_TOKEN", "")
    
    # PR URL se owner, repo, number nikalna
    # Example: https://github.com/owner/repo/pull/123
    try:
        parts = pr_url.rstrip("/").split("/")
        owner = parts[-4]
        repo = parts[-3]
        pr_number = parts[-1]

        headers = {"Authorization": f"token {token}"}
        url = f"https://api.github.com/repos/{owner}/{repo}/pulls/{pr_number}/files"
        res = requests.get(url, headers=headers)
        files = res.json()

        code = ""
        for f in files:
            code += f.get("patch", "") + "\n"
        return code if code else "# No code found"
    except Exception as e:
        return f"# Error fetching PR: {str(e)}"