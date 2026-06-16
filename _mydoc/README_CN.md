# Everything Claude Code - 中文版

[![Stars](https://img.shields.io/github/stars/affaan-m/everything-claude-code?style=flat)](https://github.com/affaan-m/everything-claude-code/stargazers)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
![Shell](https://img.shields.io/badge/-Shell-4EAA25?logo=gnu-bash&logoColor=white)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white)
![Markdown](https://img.shields.io/badge/-Markdown-000000?logo=markdown&logoColor=white)

**Anthropic黑客马拉松获奖者的Claude Code配置完整集合**

经过10+个月密集日常使用构建真实产品的生产就绪代理、技能、钩子、命令、规则和MCP配置。

---

## 指南

本仓库仅包含原始代码。指南解释所有内容。

<table>
<tr>
<td width="50%">
<a href="https://x.com/affaanmustafa/status/2012378465664745795">
<img src="https://github.com/user-attachments/assets/1a471488-59cc-425b-8345-5245c7efbcef" alt="Everything Claude Code简版指南" />
</a>
</td>
<td width="50%">
<a href="https://x.com/affaanmustafa/status/2014040193557471352">
<img src="https://github.com/user-attachments/assets/c9ca43bc-b149-427f-b551-af6840c368f0" alt="Everything Claude Code详细指南" />
</a>
</td>
</tr>
<tr>
<td align="center"><b>简版指南</b><br/>设置、基础、哲学。<b>先读这个。</b></td>
<td align="center"><b>详细指南</b><br/>令牌优化、内存持久化、评估、并行化。</td>
</tr>
</table>

| 主题 | 你将学习的内容 |
|-------|-------------------|
| 令牌优化 | 模型选择、系统提示精简、后台进程 |
| 内存持久化 | 自动跨会话保存/加载上下文的钩子 |
| 持续学习 | 从会话中自动提取模式到可重用技能 |
| 验证循环 | 检查点vs连续评估、评分器类型、pass@k指标 |
| 并行化 | Git工作树、级联方法、何时扩展实例 |
| 子代理编排 | 上下文问题、迭代检索模式 |

---

## 跨平台支持

此插件现在完全支持**Windows、macOS和Linux**。所有钩子和脚本已用Node.js重写以获得最大兼容性。

### 包管理器检测

插件自动检测你首选的包管理器（npm、pnpm、yarn或bun），优先级如下：

1. **环境变量**：`CLAUDE_PACKAGE_MANAGER`
2. **项目配置**：`.claude/package-manager.json`
3. **package.json**：`packageManager`字段
4. **锁文件**：从package-lock.json、yarn.lock、pnpm-lock.yaml或bun.lockb检测
5. **全局配置**：`~/.claude/package-manager.json`
6. **回退**：第一个可用的包管理器

设置首选包管理器：

```bash
# 通过环境变量
export CLAUDE_PACKAGE_MANAGER=pnpm

# 通过全局配置
node scripts/setup-package-manager.js --global pnpm

# 通过项目配置
node scripts/setup-package-manager.js --project bun

# 检测当前设置
node scripts/setup-package-manager.js --detect
```

或在Claude Code中使用`/setup-pm`命令。

---

## 项目内容

此仓库是一个**Claude Code插件** - 直接安装或手动复制组件。

```
everything-claude-code/
|-- .claude-plugin/   # 插件和市场清单
|   |-- plugin.json         # 插件元数据和组件路径
|   |-- marketplace.json    # /plugin marketplace add的市场目录
|
|-- agents/           # 用于委派的专业化子代理
|   |-- planner.md           # 功能实现规划
|   |-- architect.md         # 系统设计决策
|   |-- tdd-guide.md         # 测试驱动开发
|   |-- code-reviewer.md     # 质量和安全审查
|   |-- security-reviewer.md # 漏洞分析
|   |-- build-error-resolver.md
|   |-- e2e-runner.md        # Playwright端到端测试
|   |-- refactor-cleaner.md  # 死代码清理
|   |-- doc-updater.md       # 文档同步
|
|-- skills/           # 工作流定义和领域知识
|   |-- coding-standards/           # 语言最佳实践
|   |-- backend-patterns/           # API、数据库、缓存模式
|   |-- frontend-patterns/          # React、Next.js模式
|   |-- continuous-learning/        # 从会话中自动提取模式（详细指南）
|   |-- continuous-learning-v2/     # 基于直觉的学习与置信度评分
|   |-- iterative-retrieval/        # 子代理的渐进式上下文优化
|   |-- strategic-compact/          # 手动压缩建议（详细指南）
|   |-- tdd-workflow/               # TDD方法论
|   |-- security-review/            # 安全检查清单
|   |-- eval-harness/               # 验证循环评估（详细指南）
|   |-- verification-loop/          # 连续验证（详细指南）
|
|-- commands/         # 快速执行的斜杠命令
|   |-- tdd.md              # /tdd - 测试驱动开发
|   |-- plan.md             # /plan - 实现规划
|   |-- e2e.md              # /e2e - 端到端测试生成
|   |-- code-review.md      # /code-review - 质量审查
|   |-- build-fix.md        # /build-fix - 修复构建错误
|   |-- refactor-clean.md   # /refactor-clean - 死代码移除
|   |-- learn.md            # /learn - 会话中提取模式（详细指南）
|   |-- checkpoint.md       # /checkpoint - 保存验证状态（详细指南）
|   |-- verify.md           # /verify - 运行验证循环（详细指南）
|   |-- setup-pm.md         # /setup-pm - 配置包管理器（新）
|
|-- rules/            # 始终遵循的指南（复制到~/.claude/rules/）
|   |-- security.md         # 强制性安全检查
|   |-- coding-style.md     # 不可变性、文件组织
|   |-- testing.md          # TDD、80%覆盖率要求
|   |-- git-workflow.md     # 提交格式、PR流程
|   |-- agents.md           # 何时委派给子代理
|   |-- performance.md      # 模型选择、上下文管理
|
|-- hooks/            # 基于触发的自动化
|   |-- hooks.json                # 所有钩子配置（PreToolUse、PostToolUse、Stop等）
|   |-- memory-persistence/       # 会话生命周期钩子（详细指南）
|   |-- strategic-compact/        # 压缩建议（详细指南）
|
|-- scripts/          # 跨平台Node.js脚本（新）
|   |-- lib/                     # 共享工具
|   |   |-- utils.js             # 跨平台文件/路径/系统工具
|   |   |-- package-manager.js   # 包管理器检测和选择
|   |-- hooks/                   # 钩子实现
|   |   |-- session-start.js     # 会话开始时加载上下文
|   |   |-- session-end.js       # 会话结束时保存状态
|   |   |-- pre-compact.js       # 预压缩状态保存
|   |   |-- suggest-compact.js   # 战略性压缩建议
|   |   |-- evaluate-session.js  # 从会话中提取模式
|   |   |-- setup-package-manager.js # 交互式PM设置
|
|-- tests/            # 测试套件（新）
|   |-- lib/                     # 库测试
|   |-- hooks/                   # 钩子测试
|   |-- run-all.js               # 运行所有测试
|
|-- contexts/         # 动态系统提示注入上下文（详细指南）
|   |-- dev.md              # 开发模式上下文
|   |-- review.md           # 代码审查模式上下文
|   |-- research.md         # 研究/探索模式上下文
|
|-- examples/         # 示例配置和会话
|   |-- CLAUDE.md           # 示例项目级配置
|   |-- user-CLAUDE.md      # 示例用户级配置
|
|-- mcp-configs/      # MCP服务器配置
|   |-- mcp-servers.json    # GitHub、Supabase、Vercel、Railway等
|
|-- marketplace.json  # 自托管市场配置（用于/plugin marketplace add）
```

---

## 生态系统工具

### ecc.tools - 技能创建器

从你的仓库自动生成Claude Code技能。

[安装GitHub应用](https://github.com/apps/skill-creator) | [ecc.tools](https://ecc.tools)

分析你的仓库并创建：
- **SKILL.md文件** - 即用型Claude Code技能
- **直觉集合** - 用于continuous-learning-v2
- **模式提取** - 从你的提交历史中学习

```bash
# 安装GitHub应用后，技能出现在：
~/.claude/skills/generated/
```

与`continuous-learning-v2`技能无缝协作以获得继承直觉。

---

## 安装

### 选项1：作为插件安装（推荐）

使用此仓库的最简单方式 - 作为Claude Code插件安装：

```bash
# 添加此仓库作为市场
/plugin marketplace add affaan-m/everything-claude-code

# 安装插件
/plugin install everything-claude-code@everything-claude-code
```

或直接添加到你的`~/.claude/settings.json`：

```json
{
  "extraKnownMarketplaces": {
    "everything-claude-code": {
      "source": {
        "source": "github",
        "repo": "affaan-m/everything-claude-code"
      }
    }
  },
  "enabledPlugins": {
    "everything-claude-code@everything-claude-code": true
  }
}
```

这让你立即访问所有命令、代理、技能和钩子。

---

### 选项2：手动安装

如果你更喜欢手动控制安装内容：

```bash
# 克隆仓库
git clone https://github.com/affaan-m/everything-claude-code.git

# 复制代理到你的Claude配置
cp everything-claude-code/agents/*.md ~/.claude/agents/

# 复制规则
cp everything-claude-code/rules/*.md ~/.claude/rules/

# 复制命令
cp everything-claude-code/commands/*.md ~/.claude/commands/

# 复制技能
cp -r everything-claude-code/skills/* ~/.claude/skills/
```

#### 添加钩子到settings.json

从`hooks/hooks.json`复制钩子到你的`~/.claude/settings.json`。

#### 配置MCPs

从`mcp-configs/mcp-servers.json`复制所需的MCP服务器到你的`~/.claude.json`。

**重要：** 用你实际的API密钥替换`YOUR_*_HERE`占位符。

---

## 核心概念

### 代理

子代理处理有限范围的委派任务。示例：

```markdown
---
name: code-reviewer
description: 审查代码质量、安全性和可维护性
tools: ["Read", "Grep", "Glob", "Bash"]
model: opus
---

你是一名资深代码审查员...
```

### 技能

技能是由命令或代理调用的工作流定义：

```markdown
# TDD工作流

1. 首先定义接口
2. 编写失败的测试（RED）
3. 实现最小代码（GREEN）
4. 重构（IMPROVE）
5. 验证80%+覆盖率
```

### 钩子

钩子在工具事件上触发。示例 - 警告console.log：

```json
{
  "matcher": "tool == \"Edit\" && tool_input.file_path matches \"\\\\.(ts|tsx|js|jsx)$\"",
  "hooks": [{
    "type": "command",
    "command": "#!/bin/bash\ngrep -n 'console\\.log' \"$file_path\" && echo '[Hook] Remove console.log' >&2"
  }]
}
```

### 规则

规则是始终遵循的指南。保持模块化：

```
~/.claude/rules/
  security.md      # 无硬编码密钥
  coding-style.md  # 不可变性、文件限制
  testing.md       # TDD、覆盖率要求
```

---

## 运行测试

插件包含全面的测试套件：

```bash
# 运行所有测试
node tests/run-all.js

# 运行单个测试文件
node tests/lib/utils.test.js
node tests/lib/package-manager.test.js
node tests/hooks/hooks.test.js
```

---

## 贡献

**欢迎并鼓励贡献。**

此仓库旨在成为社区资源。如果你有：
- 有用的代理或技能
- 巧妙的钩子
- 更好的MCP配置
- 改进的规则

请贡献！参见[CONTRIBUTING.md](CONTRIBUTING.md)获取指南。

### 贡献想法

- 语言特定技能（Python、Go、Rust模式）
- 框架特定配置（Django、Rails、Laravel）
- DevOps代理（Kubernetes、Terraform、AWS）
- 测试策略（不同框架）
- 领域特定知识（ML、数据工程、移动端）

---

## 背景

我从实验性推出以来一直在使用Claude Code。在2025年9月的Anthropic x Forum Ventures黑客马拉松中，与[@DRodriguezFX](https://x.com/DRodriguezFX)一起使用Claude Code构建[zenith.chat](https://zenith.chat)获胜。

这些配置经过多个生产应用程序的实战测试。

---

## 重要说明

### 上下文窗口管理

**关键：** 不要一次性启用所有MCP。启用过多工具时，你的200k上下文窗口可能缩小到70k。

经验法则：
- 配置20-30个MCP
- 每个项目保持启用少于10个
- 活动工具少于80个

在项目配置中使用`disabledMcpServers`禁用未使用的MCP。

### 自定义

这些配置适用于我的工作流。你应该：
1. 从引起共鸣的内容开始
2. 为你的技术栈修改
3. 移除你不使用的内容
4. 添加你自己的模式

---

## Star历史

[![Star History Chart](https://api.star-history.com/svg?repos=affaan-m/everything-claude-code&type=Date)](https://star-history.com/#affaan-m/everything-claude-code&Date)

---

## 链接

- **简版指南（从此开始）：** [Everything Claude Code简版指南](https://x.com/affaanmustafa/status/2012378465664745795)
- **详细指南（高级）：** [Everything Claude Code详细指南](https://x.com/affaanmustafa/status/2014040193557471352)
- **关注：** [@affaanmustafa](https://x.com/affaanmustafa)
- **zenith.chat：** [zenith.chat](https://zenith.chat)

---

## 许可证

MIT - 自由使用，按需修改，如果可以请贡献回来。

---

**如果对你有帮助，请给此仓库加星。阅读两个指南。构建伟大的东西。**