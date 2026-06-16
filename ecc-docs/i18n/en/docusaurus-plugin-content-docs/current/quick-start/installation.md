---
sidebar_position: 2
---

# 📦 Detailed Installation Guide

A complete guide to ECC installation and configuration options.

## System Requirements

- **Node.js**: >= 20.0
- **CodeBuddy**: Latest version
- **Git**: For cloning rule files

## Full Installation Process

### 1. Install CodeBuddy

If you haven't installed CodeBuddy yet:

```bash
# macOS (Homebrew)
brew install codebuddy

# For other platforms, refer to the official documentation
```

### 2. Add the ECC Marketplace

```bash
codebuddy plugin marketplace add https://github.com/affaan-m/everything-claude-code
```

This adds the ECC plugin source to your CodeBuddy configuration.

### 3. Install the ECC Plugin

```bash
codebuddy plugin install everything-claude-code@everything-claude-code
```

**Includes**:
- 13+ Agents
- 31+ Slash Commands
- 28+ Skills
- 20+ Automated Hooks

### 4. Install Rules (Critical Step)

**⚠️ Important**: The ECC plugin cannot automatically distribute rule files — they must be installed manually!

#### Create the Rules Directory

```bash
mkdir -p .codebuddy/rules
```

#### Copy Common Rules

```bash
cp -r /path/to/everything-claude-code/rules/common/* .codebuddy/rules/
```

Common rules include:
- `agents.md` - Agent delegation specifications
- `coding-style.md` - Coding style guide
- `git-workflow.md` - Git workflow
- `testing.md` - Testing standards (TDD, 80% coverage)
- `performance.md` - Performance optimization
- `patterns.md` - Design patterns
- `hooks.md` - Hook architecture
- `security.md` - Security standards

#### Add Language-Specific Rules Based on Your Stack

**TypeScript projects**:
```bash
cp -r /path/to/everything-claude-code/rules/typescript/* .codebuddy/rules/
```

**Python projects**:
```bash
cp -r /path/to/everything-claude-code/rules/python/* .codebuddy/rules/
```

**Go projects**:
```bash
cp -r /path/to/everything-claude-code/rules/golang/* .codebuddy/rules/
```

## 🔧 Advanced Configuration

### Package Manager Setup

ECC detects package managers using a priority order:

1. Environment variable `CLAUDE_PACKAGE_MANAGER`
2. `.claude/package-manager.json`
3. `packageManager` field in `package.json`
4. Lock file detection
5. Global configuration
6. Fallback to first available

#### Set Preference Manually

```bash
# View currently detected package manager
/setup-pm --detect

# Set to pnpm
/setup-pm --set pnpm

# Set to yarn
/setup-pm --set yarn

# Set to npm
/setup-pm --set npm
```

### Context Configuration

Contexts let you use different "personas" for different scenarios:

#### Create Custom Contexts

Create `.md` files in the `.codebuddy/contexts/` directory:

**dev.md**:
```markdown
You are an engineer focused on feature development.
- Prioritize TDD methodology
- Focus on code quality and test coverage
- Follow project coding standards
```

**review.md**:
```markdown
You are a strict code reviewer.
- Check for security vulnerabilities
- Verify code style consistency
- Ensure test coverage reaches 80%
```

#### Use Contexts

```bash
# Load a specific context at startup
codebuddy --context dev.md

# Switch context during a session
/context dev.md
```

## 🛠️ Troubleshooting

### Issue: Commands Not Available

**Symptom**: Typing `/plan` shows "command not found"

**Solution**:
1. Verify the plugin is installed: `codebuddy plugin list`
2. Restart CodeBuddy
3. Check that rules are correctly copied to `.codebuddy/rules/`

### Issue: Rules Not Taking Effect

**Symptom**: AI doesn't follow the rules and standards

**Solution**:
1. Check rule file paths: `.codebuddy/rules/*.md`
2. Verify rule file format is correct
3. Restart the CodeBuddy session

### Issue: Wrong Package Manager Detected

**Symptom**: Using the wrong package manager

**Solution**:
```bash
# Set manually
/setup-pm --set <your-preference>

# Or create .claude/package-manager.json
{
  "packageManager": "pnpm"
}
```

## ✅ Verify Installation

Run through this checklist:

```bash
# 1. Check plugin list
codebuddy plugin list
# Should see everything-claude-code

# 2. Check rule files
ls .codebuddy/rules/
# Should see agents.md, coding-style.md, etc.

# 3. Test a command
codebuddy
# Then type: /plan "test"
# Should see planner agent output
```

## 🎉 Congratulations!

You've completed the full ECC installation! Now you can start exploring:

- [Your First Command](first-command) - Experience the power of /plan
- [Core Concepts](../core-concepts/) - Deep dive into Agents/Commands/Skills
