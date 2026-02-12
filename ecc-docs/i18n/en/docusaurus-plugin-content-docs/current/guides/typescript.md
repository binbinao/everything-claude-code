---
sidebar_position: 1
title: TypeScript Project Guide
description: Developing TypeScript projects with ECC
---

# 🔷 TypeScript Project Guide

This guide covers how to make the most of ECC in TypeScript/JavaScript projects.

## Quick Setup

### 1. Install the TypeScript Rule Pack

```bash
# Copy TypeScript rules to the CodeBuddy config directory
cp -r rules/typescript/* ~/.codebuddy/rules/
```

### 2. Recommended Project Structure

```
your-project/
├── .codebuddy/
│   └── rules/          # Project-specific rules
├── src/
│   ├── components/     # React components
│   ├── hooks/          # Custom Hooks
│   ├── utils/          # Utility functions
│   ├── types/          # TypeScript type definitions
│   └── services/       # API services
├── tests/
│   ├── unit/           # Unit tests
│   └── e2e/            # End-to-end tests
├── tsconfig.json
└── package.json
```

## Recommended Workflow

### New Feature Development

```bash
# 1. Plan
/plan Implement user authentication feature

# 2. TDD development
/tdd --feature="user-auth"

# 3. Code review
/code-review src/auth/

# 4. End-to-end testing
/e2e Test the login flow
```

### Bug Fixing

```bash
# 1. Debug
/debug TypeError: Cannot read property 'x' of undefined

# 2. TDD fix (write reproduction test first)
/tdd --feature="fix-undefined-error"

# 3. Verify
/test --coverage
```

## Hook Configuration

### Recommended TypeScript Hooks

```json
{
  "hooks": {
    "postToolUse": [
      {
        "name": "prettier",
        "trigger": "*.{ts,tsx,js,jsx}",
        "command": "npx prettier --write"
      },
      {
        "name": "tsc-check",
        "trigger": "*.{ts,tsx}",
        "command": "npx tsc --noEmit"
      },
      {
        "name": "console-warn",
        "trigger": "*.{ts,tsx}",
        "pattern": "console.log",
        "action": "warn"
      }
    ]
  }
}
```

## Best Practices

### Type Safety

```typescript
// ✅ Use Zod for runtime validation
import { z } from 'zod'

const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1)
})

type User = z.infer<typeof UserSchema>
```

### Immutable Updates

```typescript
// ✅ Use spread operator
function updateUser(user: User, name: string): User {
  return { ...user, name }
}

// ❌ Avoid direct mutation
function updateUser(user: User, name: string): User {
  user.name = name  // Dangerous!
  return user
}
```

### Error Handling

```typescript
// ✅ Use try-catch with meaningful error messages
try {
  const result = await riskyOperation()
  return result
} catch (error) {
  console.error('Operation failed:', error)
  throw new Error('User-friendly error message')
}
```

## Common Commands

| Scenario | Command |
|----------|---------|
| Start a new feature | `/plan Feature description` |
| TDD development | `/tdd --feature="name"` |
| Code review | `/code-review` |
| Security check | `/security` |
| Performance optimization | `/perf` |

---

💡 **Tip**: For TypeScript projects, we recommend Vitest as the test framework and Playwright for E2E testing!
