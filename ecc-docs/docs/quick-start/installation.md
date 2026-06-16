---
sidebar_position: 2
---

# 📦 详细安装指南

完整了解 ECC 的安装和配置选项。ECC v2.0.0 是 **harness-native** 的 — 一套配置同时支持 Claude Code、Codex、Cursor、OpenCode、Gemini、Zed、GitHub Copilot、CodeBuddy、Trae、Qwen、Kiro 等多个 AI Agent 框架。

## 系统要求

- **Node.js**: >= 20.0
- **Git**: 用于克隆规则和技能文件
- **AI Agent 客户端**: 任选其一 — Claude Code / Codex / Cursor / OpenCode / Gemini CLI / Zed 等

## 安装内容速览

| 组件 | 数量 | 说明 |
|------|------|------|
| 🤖 Agents | 67 | 规划师、架构师、审查员、语言专属代理等 |
| ⚡ Commands | 92 | `/plan`、`/tdd`、`/code-review`、`/orch-*` 等斜杠命令 |
| 📚 Skills | 271 | 跨编码、研究、安全、企业运维的技能库 |
| 🎣 Hooks | 47 个脚本 / 7 事件 | 自动化 Bash / Edit / Session 事件 |
| 📏 Rules | 21 个语言包 | TypeScript/Python/Go/Rust/Vue/React 等 |

## 推荐安装：通过插件市场（Claude Code）

```bash
# 1. 添加 ECC 市场
/plugin marketplace add https://github.com/affaan-m/ECC

# 2. 安装插件
/plugin install ecc@ecc
```

或直接在 `~/.claude/settings.json` 中启用：

```json
{
  "extraKnownMarketplaces": {
    "ecc": {
      "source": {
        "source": "github",
        "repo": "affaan-m/ECC"
      }
    }
  },
  "enabledPlugins": {
    "ecc@ecc": true
  }
}
```

> **升级到 v2.0.0**：现有用户执行 `/plugin update ecc@ecc`

## ⚠️ Rules 必须手动安装

Claude Code 插件系统**不支持**通过插件分发 `rules/` 目录（[上游限制](https://code.claude.com/docs/en/plugins-reference)）。你需要手动克隆并安装：

### 选项 A：用户级规则（适用于所有项目）

```bash
git clone https://github.com/affaan-m/ECC.git
cd ECC

mkdir -p ~/.claude/rules/ecc

# 通用规则（必装）
cp -r rules/common ~/.claude/rules/ecc/

# 选择你的语言/框架栈
cp -r rules/typescript ~/.claude/rules/ecc/   # TS/JS
cp -r rules/python ~/.claude/rules/ecc/       # Python
cp -r rules/golang ~/.claude/rules/ecc/       # Go
cp -r rules/rust ~/.claude/rules/ecc/         # Rust
cp -r rules/vue ~/.claude/rules/ecc/          # Vue
cp -r rules/react ~/.claude/rules/ecc/        # React
cp -r rules/swift ~/.claude/rules/ecc/        # Swift
cp -r rules/kotlin ~/.claude/rules/ecc/       # Kotlin
cp -r rules/csharp ~/.claude/rules/ecc/       # C#
cp -r rules/fsharp ~/.claude/rules/ecc/       # F#
cp -r rules/cpp ~/.claude/rules/ecc/          # C++
cp -r rules/arkts ~/.claude/rules/ecc/        # ArkTS
cp -r rules/dart ~/.claude/rules/ecc/         # Dart
cp -r rules/php ~/.claude/rules/ecc/          # PHP
cp -r rules/perl ~/.claude/rules/ecc/         # Perl
cp -r rules/ruby ~/.claude/rules/ecc/         # Ruby
cp -r rules/nuxt ~/.claude/rules/ecc/         # Nuxt
cp -r rules/angular ~/.claude/rules/ecc/      # Angular
cp -r rules/web ~/.claude/rules/ecc/          # Web 通用
```

### 选项 B：项目级规则（仅当前项目生效）

```bash
mkdir -p .claude/rules/ecc
cp -r rules/common .claude/rules/ecc/
cp -r rules/typescript .claude/rules/ecc/     # 替换为你用的语言
```

## 跨框架安装

ECC v2.0.0 的设计目标是 **一套配置多框架共享**。每个 harness 都有对应的目录：

| Harness | 配置目录 | 安装方式 |
|---------|----------|----------|
| **Claude Code** | `.claude-plugin/`, `.claude/` | `/plugin install ecc@ecc` |
| **Codex** | `.codex/`, `.codex-plugin/` | 复制 `.codex-plugin/` 到 Codex 配置目录 |
| **OpenCode** | `.opencode/` | 复制 `.opencode/` 到项目根 |
| **Cursor** | `.cursor/` | 复制 `.cursor/` 到项目根 |
| **Gemini** | `.gemini/` | 复制 `.gemini/` 到项目根 |
| **Zed** | `.zed/settings.json` | 复制 settings.json |
| **GitHub Copilot** | `.github/copilot-instructions.md` | 复制到 `.github/` |

所有 harness 通过 `agent.yaml` 共享 skill 目录、命令目录、hook 配置 — 真正的单源真相（single source of truth）。

## 🔧 高级配置

### 包管理器设置

ECC 按以下优先级检测包管理器：

1. 环境变量 `CLAUDE_PACKAGE_MANAGER`
2. `.claude/package-manager.json`
3. `package.json` 的 `packageManager` 字段
4. 锁文件检测（bun.lock / pnpm-lock.yaml / yarn.lock / package-lock.json）
5. 全局配置
6. 回退到首个可用

手动设置：

```bash
# 查看当前检测的包管理器
/setup-pm --detect

# 设置为 pnpm
/setup-pm --set pnpm

# 设置为 bun（v2.0.0 推荐的快速包管理器）
/setup-pm --set bun
```

### MCP 服务器配置

> **重要变更（2026-06 审计）**：ECC 默认 MCP 连接器从 6 个（github、context7、exa、memory、playwright、sequential-thinking）缩减为 **1 个**（`chrome-devtools`）。其他功能由对应的 skills 包装 CLI/REST（`github-ops`、`documentation-lookup`、`exa-search`、e2e skills）或 harness 原生特性（memory、extended thinking、web search）覆盖。如需启用旧的连接器，可在 `mcp-configs/mcp-servers.json` 中显式配置。

### Contexts（场景化人设）

Contexts 让 AI 在不同场景下使用不同的人设。在 `.claude/contexts/` 目录下创建 `.md` 文件：

**dev.md**:
```markdown
你是一个专注于功能开发的工程师。
- 优先使用 TDD 方法
- 关注代码质量和测试覆盖率
- 遵循项目的编码规范
```

**review.md**:
```markdown
你是一个严格的代码审查员。
- 检查安全漏洞
- 验证代码风格一致性
- 确保测试覆盖率达到 80%
```

使用方式：

```bash
# 启动时加载特定上下文
claude --context dev.md

# 会话中切换上下文
/context review.md
```

## 🛠️ 故障排查

### 问题：命令不可用

**症状**：输入 `/plan` 提示命令不存在

**解决方案**：
1. 确认插件已安装：`/plugin list`
2. 重启 AI 客户端
3. 检查 `agent.yaml` 中是否列出了对应命令目录

### 问题：规则不生效

**症状**：AI 没有遵循规则中的规范

**解决方案**：
1. 检查规则文件路径：`~/.claude/rules/ecc/<lang>/*.md`
2. 确认规则文件格式正确（YAML frontmatter + Markdown）
3. 重启 AI 会话

### 问题：跨框架同步异常

**症状**：在 Codex 中看到了 skill，但在 Claude Code 中看不到

**解决方案**：
1. 检查 `.claude-plugin/plugin.json` 的 `skills` / `commands` 字段
2. 重新运行 `/plugin update ecc@ecc`
3. 检查 `agent.yaml` 与各 harness 目录是否一致

## ✅ 验证安装

```bash
# 1. 检查插件列表（Claude Code）
/plugin list
# 应该看到 ecc@ecc

# 2. 检查规则文件
ls ~/.claude/rules/ecc/
# 应该看到 common/, typescript/, 等

# 3. 测试命令
# 在 Claude Code 中输入：
/plan "test"
# 应该看到 planner 智能体的输出
```

## 🎉 恭喜！

你已经完成 ECC 的完整安装！现在可以开始探索：

- [第一个命令](first-command) - 体验 `/plan` 的强大功能
- [核心概念](../core-concepts/) - 深入理解 Agents/Commands/Skills/Hooks/Rules
