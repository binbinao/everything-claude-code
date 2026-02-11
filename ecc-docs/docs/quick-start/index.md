---
sidebar_position: 1
---

# 🚀 快速开始

5分钟让 ECC 在你的 CodeBuddy 中运行起来！

## 📦 安装步骤

### 第一步：添加插件市场

```bash
codebuddy plugin marketplace add https://github.com/affaan-m/everything-claude-code
```

### 第二步：安装 ECC 插件

```bash
codebuddy plugin install everything-claude-code@everything-claude-code
```

### 第三步：安装规则（关键！）

```bash
# 创建规则目录
mkdir -p .codebuddy/rules

# 复制通用规则（必须）
cp -r rules/common/* .codebuddy/rules/

# 如果需要 TypeScript 规则
cp -r rules/typescript/* .codebuddy/rules/

# 如果需要 Python 规则  
cp -r rules/python/* .codebuddy/rules/

# 如果需要 Go 规则
cp -r rules/golang/* .codebuddy/rules/
```

## ✅ 验证安装

```bash
# 启动 CodeBuddy
codebuddy

# 输入以下命令测试
/plan "Test if ECC is working"
```

如果看到 planner 智能体的详细计划输出，说明安装成功！🎉

## 🎯 第一个命令体验

### 1. /plan - 制定实现计划

```bash
/plan "我想添加一个用户登录功能，包括注册、登录、密码重置"
```

### 2. /tdd - 测试驱动开发

```bash
/tdd --feature="user authentication system"
```

### 3. /code-review - 代码审查

```bash
/code-review
```

## 🔧 配置选项

### 包管理器偏好

ECC 会自动检测你的包管理器（npm/yarn/pnpm/bun），你也可以手动设置：

```bash
/setup-pm --set pnpm
```

### 上下文管理

使用不同的 `.md` 文件切换工作模式：

```bash
# 加载开发上下文
codebuddy --context dev.md

# 加载代码审查上下文
codebuddy --context review.md
```

## 📚 下一步

- [安装详解](installation) - 详细配置说明
- [第一个命令](first-command) - 深入体验 /plan 命令
