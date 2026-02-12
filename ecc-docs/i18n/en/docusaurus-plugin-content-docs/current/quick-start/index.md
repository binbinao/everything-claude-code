---
sidebar_position: 1
---

# 🚀 Quick Start

Get ECC running in your CodeBuddy in 5 minutes!

## 📦 Installation Steps

### Step 1: Add the Plugin Marketplace

```bash
codebuddy plugin marketplace add https://github.com/affaan-m/everything-claude-code
```

### Step 2: Install the ECC Plugin

```bash
codebuddy plugin install everything-claude-code@everything-claude-code
```

### Step 3: Install Rules (Critical!)

```bash
# Create rules directory
mkdir -p .codebuddy/rules

# Copy common rules (required)
cp -r rules/common/* .codebuddy/rules/

# If you need TypeScript rules
cp -r rules/typescript/* .codebuddy/rules/

# If you need Python rules
cp -r rules/python/* .codebuddy/rules/

# If you need Go rules
cp -r rules/golang/* .codebuddy/rules/
```

## ✅ Verify Installation

```bash
# Start CodeBuddy
codebuddy

# Enter the following command to test
/plan "Test if ECC is working"
```

If you see detailed plan output from the planner agent, the installation was successful! 🎉

## 🎯 Your First Command Experience

### 1. /plan - Create an Implementation Plan

```bash
/plan "I want to add a user login feature including registration, login, and password reset"
```

### 2. /tdd - Test-Driven Development

```bash
/tdd --feature="user authentication system"
```

### 3. /code-review - Code Review

```bash
/code-review
```

## 🔧 Configuration Options

### Package Manager Preference

ECC automatically detects your package manager (npm/yarn/pnpm/bun), but you can also set it manually:

```bash
/setup-pm --set pnpm
```

### Context Management

Use different `.md` files to switch work modes:

```bash
# Load development context
codebuddy --context dev.md

# Load code review context
codebuddy --context review.md
```

## 📚 Next Steps

- [Detailed Installation](installation) - In-depth configuration guide
- [Your First Command](first-command) - Deep dive into the /plan command
