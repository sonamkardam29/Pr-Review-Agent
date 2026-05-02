import sys
sys.path.insert(0, "backend")

from tools.lint_tool import run_linter
from tools.github_tool import fetch_pr

def test_linter_empty_function():
    result = run_linter("def test(): pass")
    assert "Empty function detected" in result["issues"][0]

def test_linter_print_statement():
    result = run_linter("print('hello')")
    assert any("print" in i for i in result["issues"])

def test_linter_clean_code():
    result = run_linter("def add(a, b): return a + b")
    assert result["issues"] == []

def test_fetch_pr_invalid():
    result = fetch_pr("invalid_url")
    assert "Error" in result or len(result) > 0