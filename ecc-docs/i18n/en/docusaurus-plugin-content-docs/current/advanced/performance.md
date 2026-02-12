---
sidebar_position: 2
title: Performance Optimization
description: ECC performance optimization strategies and best practices
---

# ⚡ Performance Optimization

Master ECC's performance optimization techniques to make your development experience smoother and more efficient.

## Model Selection Strategy

ECC supports multiple AI models. Choosing the right model can significantly boost efficiency:

### 🚀 Haiku 4.5 (Lightweight Tasks)

**Features**: 90% of Sonnet's capability, 3x cost savings

**Use cases**:
- Lightweight agents
- High-frequency tasks
- Pair programming and code generation
- Worker roles in multi-agent systems

### 🎯 Sonnet 4.5 (Primary Model)

**Features**: Best coding model

**Use cases**:
- Primary development work
- Multi-agent workflow orchestration
- Complex coding tasks

### 🧠 Opus 4.5 (Deep Reasoning)

**Features**: Strongest reasoning capabilities

**Use cases**:
- Complex architectural decisions
- Problems requiring deep reasoning
- Research and analysis tasks

## Context Window Management

### Avoiding Context Overflow

When the context is approaching its limit, avoid:
- ❌ Large-scale refactoring
- ❌ Cross-file feature implementation
- ❌ Complex debugging sessions

### Low Context-Sensitivity Tasks

These tasks are not sensitive to context:
- ✅ Single-file edits
- ✅ Independent utility functions
- ✅ Documentation updates
- ✅ Simple bug fixes

### Context Optimization Tips

```bash
# ✅ Break large tasks into batches
/plan Refactor user module  # Plan first
/tdd --feature="user-model"  # Implement step by step
/tdd --feature="user-service"
/tdd --feature="user-controller"

# ❌ Process everything at once
Refactor the entire user system...  # May exceed context
```

## Extended Thinking

### Default Configuration

Extended Thinking is enabled by default, reserving up to 31,999 tokens for internal reasoning.

### Controls

| Method | Description |
|--------|-------------|
| `Option+T` / `Alt+T` | Toggle on/off |
| `settings.json` | Configure `alwaysThinkingEnabled` |
| Environment variable | `MAX_THINKING_TOKENS=10000` |
| `Ctrl+O` | View thinking process |

### When to Enable Deep Thinking

```bash
# ✅ Enable deep thinking for complex tasks
/plan Design a microservices architecture

# ✅ Use Plan Mode for structured analysis
Enable Plan Mode...

# For simple tasks, disable to improve speed
Option+T to toggle off
```

## Build Performance Optimization

### Incremental Builds

```bash
# ✅ Use incremental builds
npm run build -- --incremental

# ✅ Use caching
npm run build -- --cache
```

### Parallel Processing

```bash
# ✅ Execute independent tasks in parallel
Run simultaneously:
1. Type checking
2. Lint checking
3. Unit tests
```

## Hook Performance

### Keep Hooks Lightweight

```json
{
  "hooks": {
    "postToolUse": [
      {
        "name": "quick-format",
        "trigger": "*.ts",
        "command": "prettier --write",
        "timeout": 5000
      }
    ]
  }
}
```

### Avoid Heavy Hooks

```json
// ❌ Avoid running in postToolUse
{
  "name": "full-test",
  "command": "npm test"  // Too slow!
}

// ✅ Use stop hook instead
{
  "name": "full-test",
  "trigger": "stop",
  "command": "npm test"
}
```

## Diagnostic Tools

### Performance Analysis Commands

```bash
# Analyze a specific file
/perf --file=src/heavy-module.ts

# Analyze overall performance
/perf --profile

# Memory analysis
/perf --memory
```

### Build Troubleshooting

```bash
# Use the dedicated agent
/build-and-fix

# View detailed logs
DEBUG=* npm run build
```

## Performance Checklist

- [ ] Choose the right model (Haiku/Sonnet/Opus)
- [ ] Manage context size
- [ ] Use incremental builds
- [ ] Keep hooks lightweight
- [ ] Break large tasks into batches
- [ ] Execute independent tasks in parallel

---

💡 **Tip**: The core of performance optimization is **using the right tool for the right job** — don't use a sledgehammer to crack a nut!
