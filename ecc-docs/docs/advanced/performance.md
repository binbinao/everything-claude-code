---
sidebar_position: 2
title: 性能优化
description: ECC v2.0.0 性能优化技能族与最佳实践
---

# ⚡ 性能优化

掌握 ECC v2.0.0 的**性能优化技能族**，让你的开发体验与生产系统都更快。v2.0.0 新增了 8 个专门的性能优化技能，覆盖从并行执行到成本优化的全链路。

## v2.0.0 性能优化技能族

### 🏃 并行与吞吐

| 技能 | 触发场景 | 核心能力 |
|------|----------|----------|
| `parallel-execution-optimizer` | "快点完成这个任务"、"用并发"、"用 worktree 并行" | 把任务转成依赖图，分 lane 并行 |
| `data-throughput-accelerator` | 大数据处理、批量导入、流式管道 | 提升 rows/sec、降低每条记录成本 |
| `connections-optimizer` | DB 连接池、HTTP 客户端、WebSocket | 优化连接复用、超时配置 |

### 🔁 基准与递归优化

| 技能 | 触发场景 | 核心能力 |
|------|----------|----------|
| `benchmark` | "跑个基准"、"对比性能" | 标准化基准测试输出 |
| `benchmark-methodology` | 设计基准测试 | 避免常见陷阱（冷启动、JIT 预热、统计显著性） |
| `benchmark-optimization-loop` | "让它快 20 倍"、"递归优化 50 轮" | 约束化测量循环，有预算和正确性门 |
| `recursive-decision-ledger` | 复杂多步优化决策 | 记录每次优化的依据、回退路径 |

### ⚡ 低延迟与缓存

| 技能 | 触发场景 | 核心能力 |
|------|----------|----------|
| `latency-critical-systems` | p99 延迟、实时系统、HFT | 延迟预算分配、关键路径优化 |
| `content-hash-cache-pattern` | 构建缓存、CI 缓存 | 内容寻址缓存，避免冗余计算 |
| `nextjs-turbopack` | Next.js 项目 | Turbopack 配置与迁移 |
| `react-performance` | React 应用 | memo、useMemo、Context 优化 |

### 💰 成本与上下文

| 技能 | 触发场景 | 核心能力 |
|------|----------|----------|
| `cost-aware-llm-pipeline` | LLM 调用成本控制 | 模型路由、缓存、降级策略 |
| `cost-tracking` | 跟踪每次 LLM 调用成本 | 成本可观测性 |
| `context-budget` | 长会话上下文管理 | 分块、压缩、检索策略 |
| `prompt-optimizer` | 优化 prompt token 使用 | 缩短 prompt 长度同时保持效果 |

## 模型选择策略（v2.0.0 当前）

ECC 支持多种 AI 模型（[`agent.yaml`](https://github.com/affaan-m/ECC/blob/main/agent.yaml)）：

```yaml
model:
  preferred: claude-opus-4-6
  fallback:
    - claude-sonnet-4-6
```

### 🚀 Haiku 4.5（轻量任务）

**特点**：~90% Sonnet 能力，3x 成本节省

**适用场景**：
- 轻量级智能体（routine refactor、code formatting）
- 高频调用的任务
- 配对编程和代码生成
- 多智能体系统中的工作者角色

### 🎯 Sonnet 4.6（主力模型）

**特点**：最佳编码性价比

**适用场景**：
- 主要开发工作
- 多智能体工作流编排
- 复杂编码任务

### 🧠 Opus 4.6（深度推理）

**特点**：最强推理能力

**适用场景**：
- 复杂架构决策
- 需要深度推理的问题
- 研究和分析任务

### 📊 选型决策树

```
是否需要深度推理？
├── 否 → 是否高频调用？
│   ├── 是 → Haiku 4.5
│   └── 否 → Sonnet 4.6
└── 是 → Opus 4.6
```

## 上下文窗口管理

### 避免上下文溢出

当上下文接近上限时，应避免：
- ❌ 大规模重构（多个文件改动）
- ❌ 跨多文件的功能实现
- ❌ 复杂的调试会话

### 低上下文敏感任务

以下任务对上下文不敏感：
- ✅ 单文件编辑
- ✅ 独立工具函数
- ✅ 文档更新
- ✅ 简单 Bug 修复

### 用 `context-budget` 技能管理

```bash
# 启动会话时声明预算
/context-budget --total=100k --reserve=20k

# 自动监控并在接近上限时提示压缩
# 自动触发 /strategic-compact
```

### 上下文优化技巧

```bash
# ✅ 分批处理大任务
/orch-refine-code --module=user-model  # 分模块
/orch-refine-code --module=user-service
/orch-refine-code --module=user-controller

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

## 并行执行模式（v2.0.0 重点）

使用 `parallel-execution-optimizer` 技能把串行任务转成并行 lane：

### Lane 矩阵

执行大任务前先写出 lane 矩阵：

```text
Lane | Can run in parallel? | Write surface | Risk | Verification
Repo scan | yes | none | low | rg/git status outputs
Backend patch | maybe | src/api | medium | unit tests
Frontend patch | maybe | app/components | medium | browser screenshot
Deploy readback | after build | remote service | high | live URL + logs
```

只有当 lane 的写入面（write surface）不冲突时才并行。

### 实战示例

```bash
# 调用 parallel-execution-optimizer skill
> 用 parallel-execution-optimizer 帮我重构 checkout 模块：
> - 后端 API 改 Stripe v2
> - 前端 UI 改 Apple Pay
> - 数据库加 idempotency_key 列

# 技能会自动：
# 1. 把 3 个 lane 拆出来
# 2. 评估依赖（schema 变更要先）
# 3. 用隔离 worktree 并行 backend + frontend
# 4. 串行做 schema 迁移
# 5. 合并前跑完整测试
```

## Hook 性能优化（v2.0.0）

### 调度器架构

ECC v2.0.0 引入了**统一调度器**（consolidated dispatcher）：

```
所有 Bash hook → pre-bash-dispatcher.js → 内部分发到：
   ├── 质量门检查
   ├── tmux 提醒
   ├── push 提醒
   └── GateGuard 危险命令拦截
```

优势：
- 7-8 个独立 hook → 1 个调度器入口
- 单次启动延迟从 ~500ms → ~80ms
- 维护成本降低（只改调度器而非每个独立 hook）

### Hook 性能预算

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit",
        "hooks": [
          {
            "type": "command",
            "command": "npx prettier --write $CLAUDE_TOOL_FILE_PATH",
            "timeout": 5000
          }
        ]
      }
    ]
  }
}
```

| Hook 类型 | 推荐超时 |
|-----------|----------|
| PreToolUse 拦截 | 1000ms（必须快） |
| PostToolUse 格式化 | 5000ms |
| PostToolUse 类型检查 | 10000ms |
| Stop 完整检查 | 30000ms |
| SessionStart 上下文加载 | 5000ms |

### 避免耗时 hook

```json
// ❌ 避免在 postToolUse 中运行（阻塞编辑）
{
  "matcher": "Edit",
  "hooks": [
    { "type": "command", "command": "npm test" }
  ]
}

// ✅ 改为 stop 钩子（每轮响应后跑）
{
  "matcher": "stop",
  "hooks": [
    { "type": "command", "command": "npm test" }
  ]
}
```

## LLM 调用成本优化

### `cost-aware-llm-pipeline` 关键能力

```yaml
# 示例：分级模型路由
pipeline:
  - stage: classify
    model: haiku-4-5          # 便宜模型做分类
  - stage: reason
    model: opus-4-6           # 仅在必要时用强模型
    condition: classify.intent == "complex"
  - stage: format
    model: haiku-4-5          # 便宜模型做格式化
```

### 缓存策略

```yaml
cache:
  strategy: content_hash     # 内容寻址
  ttl: 86400                 # 24 小时
  key: "prompt_template + inputs"
```

## 构建性能优化

### 增量构建

```bash
# ✅ 使用增量构建
npm run build -- --incremental

# ✅ 使用内容寻址缓存（ECC 推荐）
ecc build --use-content-hash-cache
```

### 并行处理

```bash
# ✅ 并行执行独立任务
> 用 parallel-execution-optimizer 跑：
> 1. 类型检查
> 2. Lint 检查
> 3. 单元测试
```

## 性能诊断命令

| 命令 | 用途 |
|------|------|
| `/orch-refine-code` | 一键性能优化编排（识别瓶颈 → 优化 → 基准对比） |
| `/build-fix` | 构建性能问题排查 |
| `/harness-audit` | 框架配置审计 |
| `/test-coverage` | 覆盖率分析（间接性能影响） |
| `/cost-report` | LLM 成本分析 |

### 性能问题排查流程

```bash
# 1. 用 /orch-refine-code 启动性能优化
/orch-refine-code --module=heavy-module

# 内部流程：
#   - benchmark 跑基线
#   - benchmark-optimization-loop 迭代优化
#   - data-throughput-accelerator 提升吞吐
#   - 产出 before/after 对比报告
```

## 性能检查清单

- [ ] 选择合适的模型（Haiku/Sonnet/Opus）
- [ ] 管理上下文大小（用 `context-budget`）
- [ ] 使用调度器架构组织 hooks
- [ ] 大任务分批处理（用 `orch-refine-code` 分模块）
- [ ] 并行执行独立任务（用 `parallel-execution-optimizer`）
- [ ] LLM 调用分级（用 `cost-aware-llm-pipeline`）
- [ ] 内容寻址缓存（用 `content-hash-cache-pattern`）
- [ ] 关键路径延迟预算（用 `latency-critical-systems`）

---

💡 **提示**：v2.0.0 的性能优化不再是"调一个参数"，而是用专门的技能族覆盖**模型选择 → 上下文管理 → 并行执行 → 成本控制 → 缓存策略**全链路。先用 `parallel-execution-optimizer` 把任务并行化，再用 `benchmark-optimization-loop` 跑出量化数据。
