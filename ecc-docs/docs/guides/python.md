---
sidebar_position: 2
title: Python 项目指南
description: 使用 ECC 进行 Python 项目开发
---

# 🐍 Python 项目指南

本指南介绍如何在 Python 项目中充分利用 ECC。

## 快速配置

### 1. 安装 Python 规则包

```bash
# 复制 Python 规则到 CodeBuddy 配置目录
cp -r rules/python/* ~/.codebuddy/rules/
```

### 2. 虚拟环境设置

ECC 会自动检测并管理虚拟环境：

```bash
# 如果不存在 .venv，ECC 会自动创建
uv venv -p 3.11

# 激活环境
source .venv/bin/activate
```

### 3. 项目结构建议

```
your-project/
├── .codebuddy/
│   └── rules/          # 项目特定规则
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

## 推荐工作流

### 新功能开发

```bash
# 1. 规划
/plan 实现数据处理管道

# 2. TDD 开发
/tdd --feature="data-pipeline"

# 3. 代码审查
/code-review src/

# 4. 测试覆盖率
/test --coverage
```

### 数据科学项目

```bash
# 1. 探索性分析规划
/plan 分析用户行为数据

# 2. 架构设计
/architect 设计 ETL 管道

# 3. 实现
/tdd --feature="etl-transform"
```

## 钩子配置

### 推荐的 Python 钩子

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

## 最佳实践

### 类型注解

```python
# ✅ 使用类型注解
from typing import Optional, List

def process_users(
    users: List[dict],
    filter_active: bool = True
) -> List[dict]:
    """处理用户列表"""
    if filter_active:
        return [u for u in users if u.get('active')]
    return users
```

### 数据验证（Pydantic）

```python
# ✅ 使用 Pydantic 进行数据验证
from pydantic import BaseModel, EmailStr

class User(BaseModel):
    id: int
    email: EmailStr
    name: str
    
    class Config:
        frozen = True  # 不可变
```

### 错误处理

```python
# ✅ 使用上下文管理器和具体异常
try:
    with open(filepath, 'r') as f:
        data = json.load(f)
except FileNotFoundError:
    logger.error(f"文件不存在: {filepath}")
    raise
except json.JSONDecodeError as e:
    logger.error(f"JSON 解析错误: {e}")
    raise
```

## 测试框架

### pytest 推荐配置

```ini
# pytest.ini
[pytest]
testpaths = tests
python_files = test_*.py
python_functions = test_*
addopts = -v --cov=src --cov-report=html
```

## 常用命令

| 场景 | 命令 |
|------|------|
| 开始新功能 | `/plan 功能描述` |
| TDD 开发 | `/tdd --feature="名称"` |
| 代码审查 | `/code-review` |
| 类型检查 | `/typecheck` |
| 安全扫描 | `/security` |

---

💡 **提示**：Python 项目推荐使用 pytest 作为测试框架，使用 ruff 替代 flake8 + isort！
