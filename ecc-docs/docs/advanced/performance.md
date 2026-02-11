---
sidebar_position: 2
title: 性能优化
description: ECC 性能优化策略和最佳实践
---

# ⚡ 性能优化

掌握 ECC 的性能优化技巧，让你的开发体验更加流畅高效。

## 模型选择策略

ECC 支持多种 AI 模型，选择合适的模型能显著提升效率：

### 🚀 Haiku 4.5（轻量任务）

**特点**：90% Sonnet 能力，3x 成本节省

**适用场景**：
- 轻量级智能体
- 高频调用的任务
- 配对编程和代码生成
- 多智能体系统中的工作者角色

### 🎯 Sonnet 4.5（主力模型）

**特点**：最佳编码模型

**适用场景**：
- 主要开发工作
- 多智能体工作流编排
- 复杂编码任务

### 🧠 Opus 4.5（深度推理）

**特点**：最强推理能力

**适用场景**：
- 复杂架构决策
- 需要深度推理的问题
- 研究和分析任务

## 上下文窗口管理

### 避免上下文溢出

当上下文接近上限时，应避免：
- ❌ 大规模重构
- ❌ 跨多文件的功能实现
- ❌ 复杂的调试会话

### 低上下文敏感任务

以下任务对上下文不敏感：
- ✅ 单文件编辑
- ✅ 独立工具函数
- ✅ 文档更新
- ✅ 简单 Bug 修复

### 上下文优化技巧

```bash
# ✅ 分批处理大任务
/plan 重构用户模块  # 先规划
/tdd --feature="user-model"  # 分步实现
/tdd --feature="user-service"
/tdd --feature="user-controller"

# ❌ 一次性处理所有
重构整个用户系统...  # 可能超出上下文
```

## Extended Thinking

### 默认配置

Extended Thinking 默认开启，预留最多 31,999 tokens 用于内部推理。

### 控制方式

| 方式 | 说明 |
|------|------|
| `Option+T` / `Alt+T` | 切换开关 |
| `settings.json` | 配置 `alwaysThinkingEnabled` |
| 环境变量 | `MAX_THINKING_TOKENS=10000` |
| `Ctrl+O` | 查看思考过程 |

### 何时启用深度思考

```bash
# ✅ 复杂任务启用深度思考
/plan 设计微服务架构

# ✅ 使用 Plan Mode 进行结构化分析
启用 Plan Mode...

# 对于简单任务可以关闭以提升速度
Option+T 关闭思考
```

## 构建性能优化

### 增量构建

```bash
# ✅ 使用增量构建
npm run build -- --incremental

# ✅ 使用缓存
npm run build -- --cache
```

### 并行处理

```bash
# ✅ 并行执行独立任务
同时运行：
1. 类型检查
2. Lint 检查
3. 单元测试
```

## 钩子性能

### 保持钩子轻量

```json
{
  "hooks": {
    "postToolUse": [
      {
        "name": "quick-format",
        "trigger": "*.ts",
        "command": "prettier --write",
        "timeout": 5000  // 设置超时
      }
    ]
  }
}
```

### 避免耗时钩子

```json
// ❌ 避免在 postToolUse 中运行
{
  "name": "full-test",
  "command": "npm test"  // 太慢！
}

// ✅ 改为 stop 钩子
{
  "name": "full-test",
  "trigger": "stop",
  "command": "npm test"
}
```

## 诊断工具

### 性能分析命令

```bash
# 分析特定文件
/perf --file=src/heavy-module.ts

# 分析整体性能
/perf --profile

# 内存分析
/perf --memory
```

### 构建问题排查

```bash
# 使用专用智能体
/build-and-fix

# 查看详细日志
DEBUG=* npm run build
```

## 性能检查清单

- [ ] 选择合适的模型（Haiku/Sonnet/Opus）
- [ ] 管理上下文大小
- [ ] 使用增量构建
- [ ] 钩子保持轻量
- [ ] 大任务分批处理
- [ ] 并行执行独立任务

---

💡 **提示**：性能优化的核心是 **选择合适的工具做合适的事**，不要用大锤敲小钉子！
