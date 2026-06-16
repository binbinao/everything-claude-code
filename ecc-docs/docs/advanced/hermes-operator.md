---
sidebar_position: 4
title: Hermes Operator 跨框架操作员
description: ECC v2.0.0 新增 — Hermes 跨 AI 框架操作员
---

# 🎯 Hermes Operator — 跨框架操作员

> **v2.0.0 新特性**：Hermes 是 ECC 引入的**跨 AI 框架操作员**，提供统一控制层。

## 什么是 Hermes？

Hermes 是 v2.0.0 引入的 **operator shell（操作员外壳）**，而 ECC 是它背后可复用的系统。

Hermes 提供：
- 💬 **统一聊天前端** — Telegram / CLI / TUI
- ⏰ **Cron 调度** — 自动化工作流
- 🧠 **Workspace 内存** — 跨会话状态
- 🌐 **分发渠道** — 跨平台输出

```
Telegram / CLI / TUI
        ↓
      Hermes  ⬅️ 操作员
        ↓
 ECC skills + hooks + MCPs + generated workflow packs
        ↓
 Google Drive / GitHub / browser automation / research APIs / media tools / finance tools
```

## 核心组件

### 1️⃣ ecc.session.v1 — 框架中立会话适配器

跨所有支持的 AI 框架统一的会话接口：

| 框架 | 会话适配器 |
|------|----------|
| Claude Code | ✅ |
| Codex | ✅ |
| OpenCode | ✅ |
| dmux | ✅ |

**好处**：
- 一次配置，到处运行
- 跨框架会话状态一致
- 统一的会话生命周期管理

### 2️⃣ ecc.mcp.v1 — MCP 服务器清单

**单一视图**管理所有 MCP 服务器：

```yaml
# ecc.mcp.v1 配置示例
mcp_servers:
  - name: github
    framework: [claude-code, codex, opencode]
    config: ...
  - name: supabase
    framework: [claude-code, codex]
    config: ...
```

**特性**：
- ✅ 跨框架统一视图
- ✅ 碎片化和漂移检测
- ✅ 密钥脱敏
- ✅ 标准化配置

### 3️⃣ Worktree-lifecycle service

并行 worktree 管理：

- **确定性冲突预测** — 在冲突发生前预测
- **安全 GC** — 自动垃圾回收
- **跨框架一致** — Claude Code / Codex / OpenCode 共用

## 公共工作区结构

```
~/.hermes/
├── config.yaml            # 模型路由 + MCP 注册 + 插件加载
├── skills/
│   └── ecc-imports/      # ECC 技能（Hermes 原生使用）
├── plugins/              # 桥接插件
├── cron/
│   └── jobs.json         # 定时任务
└── workspace/            # 工作区（业务、运营、健康、内容）
```

## 推荐能力栈

### 🎯 核心

- **Hermes** — 聊天、Cron、编排、工作区状态
- **ECC** — 技能、规则、提示、跨框架约定
- **GitHub + Context7 + Exa + Firecrawl + Playwright** — 基础 MCP 层

### 📝 内容

- **FFmpeg** — 本地编辑和组装
- **Remotion** — 可编程剪辑
- **fal.ai** — 图像/视频生成
- **ElevenLabs** — 语音和音频
- **CapCut / VectCutAPI** — 社交媒体润色

### 🏢 业务运营

- **Google Drive** — 文档、表格、幻灯片、研究
- **Stripe** — 收入和支付
- **GitHub** — 工程执行
- **Telegram / iMessage** — 紧急通知和审批

## 跨 AI 框架工作流

### 场景 1：研究 → 实现

```
1. Hermes 接收任务
2. 调度 Codex 进行代码探索
3. 调用 Claude Code 进行 TDD 实现
4. OpenCode 进行代码审查
5. 汇总结果到 workspace
```

### 场景 2：内容创作 → 发布

```
1. Hermes 接收主题
2. 用 Claude Code 进行研究（deep-research 技能）
3. 调用 Codex 生成内容草稿
4. 通过 Playwright 预览
5. 调度 GitHub PR 进行审核
```

### 场景 3：多服务部署

```
1. Hermes 触发部署任务
2. Claude Code 处理前端构建
3. Codex 处理后端 API
4. 协调 deploy 到 Vercel / Railway
5. 通知结果到 Telegram
```

## Cron 调度示例

```json
// ~/.hermes/cron/jobs.json
{
  "jobs": [
    {
      "name": "daily-standup",
      "schedule": "0 9 * * 1-5",
      "prompt": "Generate daily standup report",
      "channel": "telegram"
    },
    {
      "name": "code-quality-check",
      "schedule": "0 18 * * *",
      "prompt": "Run /code-review on recent commits",
      "channel": "github"
    }
  ]
}
```

## 桥接插件

Hermes 通过插件机制扩展：

```yaml
# ~/.hermes/config.yaml
plugins:
  - hooks
  - reminders
  - workflow-tools
```

## 迁移到 Hermes

如果从旧 ECC 配置迁移：

```bash
# 1. 审计现状
ecc migrate audit --source ~/.hermes

# 2. 制定迁移计划
ecc migrate plan

# 3. 生成迁移脚手架
ecc migrate scaffold

# 4. 导入技能
ecc migrate import-skills --output-dir migration-artifacts/skills

# 5. 导入工具
ecc migrate import-tools --output-dir migration-artifacts/tools

# 6. 导入桥接插件
ecc migrate import-plugins --output-dir migration-artifacts/plugins

# 7. 预览定时任务
ecc migrate import-schedules --dry-run

# 8. 导入工作区内存
ecc migrate import-memory
```

## 推荐的启动顺序

0. **审计现状** — 看看哪些已经映射到 ECC2
0.5. **制定迁移计划** — 生成可审查的迁移工件
1. **安装 ECC** — 验证基线：`node tests/run-all.js`
2. **安装 Hermes** — 指向 ECC 导入的技能
3. **注册 MCP** — 注册你每天使用的服务器
4. **认证渠道** — 先 Google Drive，再 GitHub，再分发渠道
5. **小规模 Cron** — 健康检查、内容问责、收件箱分类、收入监控
6. **扩展到复杂工作流** — 健康、关系图、外发

## Hermes 与传统 ECC 的区别

| 维度 | 传统 ECC | Hermes Operator |
|------|---------|----------------|
| 定位 | 配置集合 | 操作员系统 |
| 跨框架 | ❌ Claude Code | ✅ 7+ 框架 |
| Cron 调度 | 手动 | ✅ 内置 |
| 工作区内存 | ❌ | ✅ |
| 分发渠道 | 手动 | ✅ Telegram/iMessage |
| 业务运营工具 | 基础 | ✅ 完整 |
| 适用人群 | 开发者 | 操作员/团队 |

## 安全注意事项

**保持本地的认证**：

- Google OAuth token（Drive / Docs / Sheets / Slides）
- X / LinkedIn / 外发凭证
- Stripe keys
- 浏览器自动化凭证
- CRM / 项目系统凭证（Linear / Apollo）
- Apple Health 导出/导入路径

## 资源链接

- **Hermes Setup 完整指南**：[GitHub](https://github.com/affaan-m/ECC/blob/main/docs/HERMES-SETUP.md)
- **跨框架架构**：[GitHub](https://github.com/affaan-m/ECC/blob/main/docs/architecture/cross-harness.md)
- **ECC 2.0 Release Notes**：[GitHub](https://github.com/affaan-m/ECC/blob/main/docs/releases/2.0.0/release-notes.md)
- **Discord 社区**：[discord.gg/36yGMHGFbR](https://discord.gg/36yGMHGFbR)

---

**🎯 Hermes Operator — 让 AI 框架成为统一的工具集，而非孤岛！**