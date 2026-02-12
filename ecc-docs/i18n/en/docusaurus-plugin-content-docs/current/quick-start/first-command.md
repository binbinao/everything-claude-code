---
sidebar_position: 3
title: Your First Command
description: Experience your first ECC slash command
---

# 🎯 Your First Command

Congratulations on completing the installation! Now let's experience ECC's most powerful feature — **slash commands**.

## What Are Slash Commands?

Slash commands are special instructions starting with `/`, just like commands in Slack or Discord:

```bash
/plan Implement a user login feature
```

After entering this command, ECC's **planner agent** will be activated to create a detailed implementation plan for you!

## Try the /plan Command

### Step 1: Open Your Project

Open any project in VS Code (or create a new one).

### Step 2: Enter the Command

In the Claude Code chat, type:

```bash
/plan Create a to-do list app
```

### Step 3: Review the Plan

The planner agent will output a plan like this:

```markdown
# Implementation Plan: To-Do List App

## Requirements Summary
- Create a to-do list application
- Support adding, deleting, and marking items as complete

## Implementation Phases

### Phase 1: Project Initialization
- Create project structure
- Install dependencies

### Phase 2: Core Features
- Implement adding to-dos
- Implement deleting to-dos
- Implement marking as complete

### Phase 3: UI Polish
- Beautify the interface
- Add animations

## Risk Assessment
- LOW: Simple feature, low risk

**Awaiting confirmation**: Shall I proceed with this plan?
```

### Step 4: Confirm Execution

Reply "yes" or "proceed" to let ECC start executing the plan!

## Other Common Commands

| Command | Description | Example |
|---------|-------------|---------|
| `/plan` | Create a plan | `/plan Add search functionality` |
| `/tdd` | TDD development | `/tdd --feature="login"` |
| `/code-review` | Code review | `/code-review` |
| `/e2e` | End-to-end testing | `/e2e Test the login flow` |

## Command Combination Example

A complete development workflow:

```bash
# 1. Plan first
/plan Implement a comments feature

# 2. After confirmation, develop with TDD
/tdd --feature="comments"

# 3. Review code when done
/code-review

# 4. Verify with end-to-end tests
/e2e Test the comment posting flow
```

## Next Steps

Now that you've learned to use slash commands, you can:

1. 📚 Learn [Core Concepts](/docs/core-concepts/agents) for a deeper understanding of agents
2. 🛠️ Check out [Practical Guides](/docs/guides/typescript) for language-specific configurations
3. 🚀 Explore [Advanced Topics](/docs/advanced/multi-agent) for multi-agent orchestration

---

💡 **Tip**: Type `/` and press Tab to see auto-completion for all available commands!
