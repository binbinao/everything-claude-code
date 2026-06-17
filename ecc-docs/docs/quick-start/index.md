---
sidebar_position: 1
---

# 🚀 快速开始

5 分钟让 ECC 在你的 Claude Code 中运行起来！

## 📦 安装步骤

### 第一步：添加插件市场

```bash
/plugin marketplace add https://github.com/affaan-m/ECC
```

### 第二步：安装 ECC 插件

```bash
/plugin install ecc@ecc
```

### 第三步：手动安装规则（关键！）

Claude Code 插件系统**不支持**分发 `rules/`，必须手动复制：

```bash
# 克隆仓库
git clone https://github.com/affaan-m/ECC.git
cd ECC

# 用户级规则（推荐：影响所有项目）
mkdir -p ~/.claude/rules/ecc
cp -r rules/common ~/.claude/rules/ecc/

# 选择你的语言栈
cp -r rules/typescript ~/.claude/rules/ecc/   # TypeScript/JS
cp -r rules/python ~/.claude/rules/ecc/       # Python
cp -r rules/golang ~/.claude/rules/ecc/       # Go
cp -r rules/rust ~/.claude/rules/ecc/         # Rust
cp -r rules/vue ~/.claude/rules/ecc/          # Vue
cp -r rules/react ~/.claude/rules/ecc/        # React

# 或项目级（只影响当前项目）
mkdir -p .claude/rules/ecc
cp -r rules/common .claude/rules/ecc/
cp -r rules/typescript .claude/rules/ecc/
```

完整规则列表（21 个语言包）参见 [Rules 规则](../core-concepts/rules)。

## ✅ 验证安装

```bash
# 启动 Claude Code
claude

# 输入以下命令测试
/plan "Test if ECC is working"
```

如果看到 planner 智能体的详细计划输出，说明安装成功！🎉

## 🎯 第一个命令体验

### 1. `/plan` - 制定实现计划

```bash
/plan "我想添加一个用户登录功能，包括注册、登录、密码重置"
```

### 2. v2.0.0 推荐：`/orch-build-mvp` 一键编排

```bash
# 一键构建完整 MVP（推荐）
/orch-build-mvp "用户认证系统 with OAuth2 + JWT"

/orch-build-mvp 内部会：
#   1. planner 制定实施计划
#   2. architect 选型（OAuth2 + JWT + bcrypt）
#   3. tdd-guide 写测试
#   4. code-reviewer 审查
#   5. e2e-runner 端到端验证
```

### 3. `/tdd` - 测试驱动开发

```bash
/tdd --feature="user authentication system"
```

### 4. `/code-review` - 代码审查

```bash
/code-review
```

## 🔧 配置选项

### 包管理器偏好

ECC 自动检测你的包管理器（npm/yarn/pnpm/bun），也可手动设置：

```bash
/setup-pm --set pnpm
/setup-pm --set bun     # v2.0.0 推荐的快速包管理器
```

### 上下文管理

在 `.claude/contexts/` 创建 `.md` 文件切换工作模式：

```bash
# 加载开发上下文
claude --context dev.md

# 加载代码审查上下文
claude --context review.md
```

### MCP 连接器

> **2026-06 审计变更**：默认 MCP 连接器从 6 个缩减为 1 个（`chrome-devtools`）。其他功能由对应的 skills 替代（`github-ops`、`documentation-lookup`、`exa-search` 等）。如需旧连接器，在 `mcp-configs/mcp-servers.json` 显式 opt-in。

## 📚 下一步

- [安装详解](installation) - 详细配置说明（含跨 harness）
- [第一个命令](first-command) - 深入体验 `/plan` 命令
- [核心概念](../core-concepts/) - Agents / Commands / Skills / Hooks / Rules
- [多智能体编排](../advanced/multi-agent) - v2.0.0 `orch-*` 编排器家族
