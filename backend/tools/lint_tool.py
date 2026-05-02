def run_linter(code):
    issues = []

    if "pass" in code:
        issues.append("Empty function detected (pass statement)")
    if "print(" in code:
        issues.append("Debug print statement found — remove before production")
    if "TODO" in code:
        issues.append("TODO comment found — unfinished work")
    if "except:" in code:
        issues.append("Bare except clause — catch specific exceptions")
    if "eval(" in code:
        issues.append("eval() usage detected — security risk")

    return {"issues": issues}