---
sidebar_position: 1
title: TypeScript 项目指南
description: 使用 ECC 进行 TypeScript 项目开发
---

# 🔷 TypeScript 项目指南

本指南介绍如何在 TypeScript/JavaScript 项目中充分利用 ECC。

## 快速配置

### 1. 安装 TypeScript 规则包

```bash
# 复制 TypeScript 规则到 CodeBuddy 配置目录
cp -r rules/typescript/* ~/.claude/rules/ecc/
```

### 2. 项目结构建议

```
your-project/
├── .claude/
│   └── rules/          # 项目特定规则
├── src/
│   ├── components/     # React 组件
│   ├── hooks/          # 自定义 Hooks
│   ├── utils/          # 工具函数
│   ├── types/          # TypeScript 类型定义
│   └── services/       # API 服务
├── tests/
│   ├── unit/           # 单元测试
│   └── e2e/            # 端到端测试
├── tsconfig.json
└── package.json
```

## 推荐工作流

### 新功能开发（v2.0.0 推荐路径）

```bash
# 一键完成（推荐用于 MVP / 完整功能）
/orch-build-mvp "user authentication with email + OAuth"

# 或更细粒度：添加独立功能
/orch-add-feature "user-auth"
```

### 手动分步（新功能）

```bash
# 1. 规划
/plan 实现用户认证功能

# 2. TDD 开发
/tdd --feature="user-auth"

# 3. 代码审查
/code-review src/auth/

# 4. 端到端测试
/e2e 测试登录流程
```

### Bug 修复（v2.0.0 推荐路径）

```bash
# 一键修复闭环
/orch-fix-defect "登录后 session 立即失效"
```

### 手动分步（Bug 修复）

```bash
# 1. 调试
/silent-failure-hunter TypeError: Cannot read property 'x' of undefined

# 2. TDD 修复（先写复现测试）
/tdd --feature="fix-undefined-error"

# 3. 验证
/test-coverage
```

## 钩子配置

### 推荐的 TypeScript 钩子（v2.0.0 调度器架构）

ECC v2.0.0 用 `pre-bash-dispatcher.js` 和 `post-bash-dispatcher.js` 统一调度所有 Bash / Edit / Write 类 hook。TypeScript 项目的推荐 hook 配置：

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "node -e \"...\" node scripts/hooks/run-with-flags.js post:edit:format scripts/hooks/post-edit-format.js standard,strict",
            "id": "post:edit:format",
            "timeout": 5000
          },
          {
            "type": "command",
            "command": "node -e \"...\" node scripts/hooks/post-edit-typecheck.js standard,strict",
            "id": "post:edit:typecheck",
            "timeout": 10000
          },
          {
            "type": "command",
            "command": "node -e \"...\" node scripts/hooks/post-edit-console-warn.js standard,strict",
            "id": "post:edit:console-warn",
            "timeout": 3000
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "node scripts/hooks/check-console-log.js",
            "id": "check-console-log"
          }
        ]
      }
    ]
  }
}
```

更简单的替代方案（项目级 `settings.json`）：

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "npx prettier --write $CLAUDE_TOOL_FILE_PATH && npx tsc --noEmit",
            "timeout": 15000
          }
        ]
      }
    ]
  }
}
```

## 最佳实践

### 类型安全

```typescript
// ✅ 使用 Zod 进行运行时验证
import { z } from 'zod'

const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1)
})

type User = z.infer<typeof UserSchema>
```

### 不可变更新

```typescript
// ✅ 使用展开运算符
function updateUser(user: User, name: string): User {
  return { ...user, name }
}

// ❌ 避免直接修改
function updateUser(user: User, name: string): User {
  user.name = name  // 危险！
  return user
}
```

### 错误处理

```typescript
// ✅ 使用 try-catch 和有意义的错误信息
try {
  const result = await riskyOperation()
  return result
} catch (error) {
  console.error('Operation failed:', error)
  throw new Error('用户友好的错误信息')
}
```

## 常用命令

| 场景 | 命令 |
|------|------|
| 开始新功能 | `/plan 功能描述` |
| TDD 开发 | `/tdd --feature="名称"` |
| 代码审查 | `/code-review` |
| 安全检查 | `/security-scan` |
| 性能优化 | `/orch-refine-code` |

---

💡 **提示**：TypeScript 项目推荐使用 Vitest 作为测试框架，Playwright 作为 E2E 测试框架！
