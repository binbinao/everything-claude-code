---
sidebar_position: 2
title: Commands 斜杠命令
description: ECC v2.0.0 的 92 个斜杠命令详解
---

# ⚡ Commands 斜杠命令

**斜杠命令** 是触发 ECC 功能的快捷方式，就像 Slack 或 Discord 中的命令一样简单直观。

> **v2.0.0 更新**：命令数量从 31 个扩展到 **92 个**，新增了 `orch-*` 编排器家族和许多工作流工具。

## 什么是斜杠命令？

斜杠命令以 `/` 开头，后跟命令名和可选参数：

```bash
/plan 实现购物车功能
/tdd --feature="user-auth"
/e2e --url=http://localhost:3000
/orch-build-mvp "todo app with React"
```

## 92 个命令分类

### 🏗️ 规划类命令

| 命令 | 说明 | 示例 |
|------|------|------|
| `/plan` | 制定实施计划 | `/plan 添加支付功能` |
| `/plan-prd` | PRD 模式规划 | `/plan-prd 新产品` |
| `/feature-dev` | 完整功能开发 | `/feature-dev` |
| `/prp-plan` | PRP 模式规划 | `/prp-plan` |
| `/prp-prd` | PRP PRD | `/prp-prd` |
| `/project-init` | 初始化项目 | `/project-init` |
| `/projects` | 项目管理 | `/projects` |

### 🧪 开发类命令

| 命令 | 说明 | 示例 |
|------|------|------|
| `/tdd` | 测试驱动开发 | `/tdd --feature="login"` |
| `/build-fix` | 修复构建错误 | `/build-fix` |
| `/prp-implement` | PRP 实现 | `/prp-implement` |
| `/prp-commit` | PRP 提交 | `/prp-commit` |
| `/gradle-build` | Gradle 构建 | `/gradle-build` |

### 🔍 审查类命令

| 命令 | 说明 | 示例 |
|------|------|------|
| `/code-review` | 代码审查 | `/code-review src/auth.ts` |
| `/security-scan` | 安全扫描 | `/security-scan` |
| `/security` | 安全审计 | `/security` |
| `/review-pr` | 审查 PR | `/review-pr` |
| `/quality-gate` | 质量门 | `/quality-gate` |
| `/test-coverage` | 覆盖率分析 | `/test-coverage` |
| `/harness-audit` | 框架审计 | `/harness-audit` |

### 🧹 维护类命令

| 命令 | 说明 | 示例 |
|------|------|------|
| `/refactor-clean` | 重构清理 | `/refactor-clean 提取公共逻辑` |
| `/prune` | 死代码清理 | `/prune` |
| `/auto-update` | 自动更新 | `/auto-update` |
| `/promote` | 提升/发布 | `/promote` |

### 📝 文档类命令

| 命令 | 说明 | 示例 |
|------|------|------|
| `/update-docs` | 更新文档 | `/update-docs` |
| `/update-codemaps` | 更新代码地图 | `/update-codemaps` |
| `/prp-pr` | PRP PR | `/prp-pr` |
| `/pr` | 创建 PR | `/pr` |
| `/ecc-guide` | ECC 指南 | `/ecc-guide` |

### 🧪 测试类命令

| 命令 | 说明 | 示例 |
|------|------|------|
| `/e2e` | 端到端测试 | `/e2e 测试登录流程` |
| `/cpp-test` | C++ 测试 | `/cpp-test` |
| `/go-test` | Go 测试 | `/go-test` |
| `/react-test` | React 测试 | `/react-test` |
| `/rust-test` | Rust 测试 | `/rust-test` |
| `/kotlin-test` | Kotlin 测试 | `/kotlin-test` |
| `/flutter-test` | Flutter 测试 | `/flutter-test` |

### 🔧 语言构建命令

| 命令 | 说明 |
|------|------|
| `/cpp-build` | C++ 构建 |
| `/cpp-review` | C++ 审查 |
| `/go-build` | Go 构建 |
| `/go-review` | Go 审查 |
| `/rust-build` | Rust 构建 |
| `/rust-review` | Rust 审查 |
| `/react-build` | React 构建 |
| `/react-review` | React 审查 |
| `/vue-review` | Vue 审查 |
| `/kotlin-build` | Kotlin 构建 |
| `/kotlin-review` | Kotlin 审查 |
| `/swift-build` | Swift 构建（间接） |
| `/flutter-build` | Flutter 构建 |
| `/flutter-review` | Flutter 审查 |
| `/fastapi-review` | FastAPI 审查 |
| `/python-review` | Python 审查 |
| `/gan-build` | GAN 构建 |
| `/gan-design` | GAN 设计 |

### 🎯 编排器命令（v2.0.0 新增家族）

```bash
/orch-build-mvp "description"   # 快速构建 MVP
/orch-add-feature              # 添加新功能
/orch-fix-defect               # 修复缺陷
/orch-refine-code              # 重构代码
/orch-change-feature           # 修改现有功能
```

### 🌐 多智能体编排

| 命令 | 说明 |
|------|------|
| `/multi-execute` | 多智能体执行 |
| `/multi-plan` | 多智能体规划 |
| `/multi-backend` | 后端多服务编排 |
| `/multi-frontend` | 前端多服务编排 |
| `/multi-workflow` | 通用多服务工作流 |
| `/pm2` | PM2 服务生命周期管理 |

### 🧠 学习与本能

| 命令 | 说明 |
|------|------|
| `/learn` | 提取会话中的模式 |
| `/learn-eval` | 评估学习质量 |
| `/instinct-status` | 查看已学习的本能 |
| `/instinct-export` | 导出本能 |
| `/instinct-import` | 导入本能 |
| `/evolve` | 聚合成技能 |
| `/skill-create` | 从 git 历史创建技能 |
| `/skill-health` | 技能健康检查 |

### 📦 Epic 工作流

| 命令 | 说明 |
|------|------|
| `/epic-claim` | 认领 Epic |
| `/epic-decompose` | 分解 Epic |
| `/epic-publish` | 发布 Epic |
| `/epic-review` | 审查 Epic |
| `/epic-sync` | 同步 Epic |
| `/epic-unblock` | 解除阻塞 |
| `/epic-validate` | 验证 Epic |

### 🔄 会话管理

| 命令 | 说明 |
|------|------|
| `/sessions` | 查看会话历史 |
| `/save-session` | 保存会话 |
| `/resume-session` | 恢复会话 |
| `/checkpoint` | 保存验证状态 |
| `/aside` | 旁白笔记 |
| `/loop-start` | 启动循环 |
| `/loop-status` | 循环状态 |
| `/santa-loop` | 圣诞循环（自动监控） |

### 🛠️ 实用工具

| 命令 | 说明 |
|------|------|
| `/cost-report` | 成本报告 |
| `/jira` | Jira 集成 |
| `/marketing-campaign` | 营销活动 |
| `/model-route` | 模型路由 |
| `/setup-pm` | 配置包管理器 |
| `/hookify` | Hookify 配置 |
| `/hookify-list` | Hookify 列表 |
| `/hookify-help` | Hookify 帮助 |
| `/hookify-configure` | Hookify 配置 |

## 常用命令详解

### `/plan` - 规划命令

**最佳实践**：任何复杂功能开发前都应该先 `/plan`

```bash
# 基础用法
/plan 添加用户注册功能

# 指定技术栈
/plan 用 Next.js 实现 SSR 博客系统
```

**输出内容**：
- ✅ 需求重述
- ✅ 风险评估
- ✅ 分阶段计划
- ✅ 时间估算

### `/orch-build-mvp` - 编排 MVP（v2.0.0 新增）

**功能**：通过编排多个智能体快速构建 MVP

```bash
/orch-build-mvp "Real-time chat with React + WebSocket + Node.js"
```

### `/tdd` - 测试驱动开发

**TDD 循环**：
```
🔴 RED    → 写失败的测试
🟢 GREEN  → 写代码让测试通过
🔵 REFACTOR → 重构优化
```

```bash
# 开始 TDD
/tdd --feature="shopping-cart"

# 指定测试框架
/tdd --framework=vitest
```

### `/e2e` - 端到端测试

```bash
# 测试指定 URL
/e2e --url=http://localhost:3000

# 测试特定流程
/e2e 测试购物车结账流程
```

## 命令组合使用

典型的开发工作流：

```bash
# 1. 先规划
/plan 实现评论功能

# 2. 确认后用 TDD 开发
/tdd --feature="comments"

# 3. 代码审查
/code-review

# 4. 端到端测试
/e2e 测试评论发布流程

# 5. 提交代码
/pr
```

v2.0.0 推荐的快速 MVP 工作流：

```bash
# 1. 编排 MVP
/orch-build-mvp "MVP for todo app"

# 2. 添加功能
/orch-add-feature "user authentication"

# 3. 质量门
/quality-gate
```

## 自定义命令

你可以在 `~/.claude/commands/` 目录下创建自定义命令：

```markdown
---
description: 我的自定义命令
---

# My Custom Command

这里写命令的具体行为...
```

---

💡 **提示**：输入 `/` 后按 Tab 键可以看到所有可用命令的自动补全！
