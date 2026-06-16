---
sidebar_position: 2
title: Commands
description: A detailed guide to ECC's 31+ slash commands
---

# ⚡ Slash Commands

**Slash commands** are shortcuts for triggering ECC features, as simple and intuitive as commands in Slack or Discord.

## What Are Slash Commands?

Slash commands start with `/`, followed by the command name and optional parameters:

```bash
/plan Implement a shopping cart feature
/tdd --feature="user-auth"
/e2e --url=http://localhost:3000
```

## Command Categories

### 🏗️ Planning Commands

| Command | Description | Example |
|---------|-------------|---------|
| `/plan` | Create implementation plan | `/plan Add payment feature` |
| `/architect` | Architecture design | `/architect Microservice split plan` |
| `/estimate` | Effort estimation | `/estimate Refactor auth module` |

### 🧪 Development Commands

| Command | Description | Example |
|---------|-------------|---------|
| `/tdd` | Test-driven development | `/tdd --feature="login"` |
| `/build-and-fix` | Fix build errors | `/build-and-fix` |
| `/debug` | Debug issues | `/debug TypeError: undefined` |

### 🔍 Review Commands

| Command | Description | Example |
|---------|-------------|---------|
| `/code-review` | Code review | `/code-review src/auth.ts` |
| `/security` | Security audit | `/security` |
| `/perf` | Performance analysis | `/perf --file=api.ts` |

### 🧹 Maintenance Commands

| Command | Description | Example |
|---------|-------------|---------|
| `/refactor` | Refactor code | `/refactor Extract common logic` |
| `/cleanup` | Clean up dead code | `/cleanup` |
| `/deps` | Dependency management | `/deps update` |

### 📝 Documentation Commands

| Command | Description | Example |
|---------|-------------|---------|
| `/doc` | Generate documentation | `/doc src/utils.ts` |
| `/readme` | Update README | `/readme` |
| `/changelog` | Generate changelog | `/changelog` |

### 🧪 Testing Commands

| Command | Description | Example |
|---------|-------------|---------|
| `/e2e` | End-to-end testing | `/e2e Test the login flow` |
| `/test` | Run tests | `/test --coverage` |
| `/snapshot` | Snapshot testing | `/snapshot update` |

### 🔧 Git Commands

| Command | Description | Example |
|---------|-------------|---------|
| `/commit` | Generate commit message | `/commit` |
| `/pr` | Create PR description | `/pr` |
| `/branch` | Branch management | `/branch feature/auth` |

## Common Commands in Detail

### `/plan` - Planning Command

**Best Practice**: Always `/plan` before developing any complex feature

```bash
# Basic usage
/plan Add a user registration feature

# Specify tech stack
/plan Build an SSR blog system with Next.js
```

**Output includes**:
- ✅ Requirements restatement
- ✅ Risk assessment
- ✅ Phased plan
- ✅ Time estimates

### `/tdd` - Test-Driven Development

**TDD Cycle**:
```
🔴 RED    → Write a failing test
🟢 GREEN  → Write code to make it pass
🔵 REFACTOR → Refactor and optimize
```

```bash
# Start TDD
/tdd --feature="shopping-cart"

# Specify test framework
/tdd --framework=vitest
```

### `/e2e` - End-to-End Testing

```bash
# Test a specific URL
/e2e --url=http://localhost:3000

# Test a specific flow
/e2e Test the shopping cart checkout flow
```

## Combining Commands

A typical development workflow:

```bash
# 1. Plan first
/plan Implement a comments feature

# 2. After confirmation, develop with TDD
/tdd --feature="comments"

# 3. Code review
/code-review

# 4. End-to-end testing
/e2e Test the comment posting flow

# 5. Commit code
/commit
```

## Custom Commands

You can create custom commands in the `~/.claude/commands/` directory:

```markdown
---
description: My custom command
---

# My Custom Command

Define specific behavior here...
```

---

💡 **Tip**: Type `/` and press Tab to see auto-completion for all available commands!
