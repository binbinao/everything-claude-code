---
sidebar_position: 2
title: Python Project Guide
description: Developing Python projects with ECC
---

# 🐍 Python Project Guide

This guide covers how to make the most of ECC in Python projects.

## Quick Setup

### 1. Install the Python Rule Pack

```bash
# Copy Python rules to the CodeBuddy config directory
cp -r rules/python/* ~/.codebuddy/rules/
```

### 2. Virtual Environment Setup

ECC automatically detects and manages virtual environments:

```bash
# If .venv doesn't exist, ECC will create it automatically
uv venv -p 3.11

# Activate the environment
source .venv/bin/activate
```

### 3. Recommended Project Structure

```
your-project/
├── .codebuddy/
│   └── rules/          # Project-specific rules
├── src/
│   └── your_package/
│       ├── __init__.py
│       ├── main.py
│       └── utils.py
├── tests/
│   ├── unit/
│   └── integration/
├── pyproject.toml
└── requirements.txt
```

## Recommended Workflow

### New Feature Development

```bash
# 1. Plan
/plan Implement a data processing pipeline

# 2. TDD development
/tdd --feature="data-pipeline"

# 3. Code review
/code-review src/

# 4. Test coverage
/test --coverage
```

### Data Science Projects

```bash
# 1. Exploratory analysis planning
/plan Analyze user behavior data

# 2. Architecture design
/architect Design an ETL pipeline

# 3. Implementation
/tdd --feature="etl-transform"
```

## Hook Configuration

### Recommended Python Hooks

```json
{
  "hooks": {
    "postToolUse": [
      {
        "name": "black",
        "trigger": "*.py",
        "command": "black"
      },
      {
        "name": "ruff",
        "trigger": "*.py",
        "command": "ruff check --fix"
      },
      {
        "name": "mypy",
        "trigger": "*.py",
        "command": "mypy"
      }
    ]
  }
}
```

## Best Practices

### Type Annotations

```python
# ✅ Use type annotations
from typing import Optional, List

def process_users(
    users: List[dict],
    filter_active: bool = True
) -> List[dict]:
    """Process a list of users"""
    if filter_active:
        return [u for u in users if u.get('active')]
    return users
```

### Data Validation (Pydantic)

```python
# ✅ Use Pydantic for data validation
from pydantic import BaseModel, EmailStr

class User(BaseModel):
    id: int
    email: EmailStr
    name: str
    
    class Config:
        frozen = True  # Immutable
```

### Error Handling

```python
# ✅ Use context managers and specific exceptions
try:
    with open(filepath, 'r') as f:
        data = json.load(f)
except FileNotFoundError:
    logger.error(f"File not found: {filepath}")
    raise
except json.JSONDecodeError as e:
    logger.error(f"JSON parse error: {e}")
    raise
```

## Testing Framework

### Recommended pytest Configuration

```ini
# pytest.ini
[pytest]
testpaths = tests
python_files = test_*.py
python_functions = test_*
addopts = -v --cov=src --cov-report=html
```

## Common Commands

| Scenario | Command |
|----------|---------|
| Start a new feature | `/plan Feature description` |
| TDD development | `/tdd --feature="name"` |
| Code review | `/code-review` |
| Type checking | `/typecheck` |
| Security scan | `/security` |

---

💡 **Tip**: For Python projects, we recommend pytest as the test framework and ruff as a replacement for flake8 + isort!
