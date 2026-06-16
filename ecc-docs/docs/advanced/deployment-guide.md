---
sidebar_position: 5
title: 部署指南
description: ecc-docs 部署到 Vercel 和 GitHub Pages 的完整指南
---

# 🚀 ecc-docs 部署指南

> ecc-docs 是一个基于 **Docusaurus 3.7** 的交互式文档站点。本指南说明如何将其部署到 **Vercel** 和 **GitHub Pages**。

## 📍 当前部署地址

| 平台 | URL | 触发方式 |
|------|-----|----------|
| **Vercel（主）** | https://ecc-docs.vercel.app | Push 到 main → `deploy.yml` |
| **GitHub Pages（备）** | https://binbinao.github.io/everything-claude-code/ | Push 到 main → `deploy-github-pages.yml` |

## 🏗️ 架构概览

```
ecc-docs/  (Docusaurus 3.7)
├── docusaurus.config.ts    # 动态配置（Vercel / GitHub Pages）
├── vercel.json              # Vercel 配置
├── package.json             # 依赖与脚本
└── .github/workflows/
    ├── ci.yml                 # CI 检查（测试 + 构建 + E2E）
    ├── deploy.yml             # 部署到 Vercel
    └── deploy-github-pages.yml # 部署到 GitHub Pages
```

## ⚙️ 环境变量

Docusaurus 根据环境变量动态切换配置：

| 环境变量 | 值 | 作用 |
|---------|-----|------|
| `DEPLOY_TARGET` | `github` | 切换到 GitHub Pages 模式（baseUrl = `/everything-claude-code/`） |
| `VERCEL_URL` | 自动设置 | Vercel 自动注入的部署 URL |
| 未设置 | — | 默认 Vercel 模式（baseUrl = `/`） |

**配置位置**: [docusaurus.config.ts](https://github.com/binbinao/everything-claude-code/blob/main/ecc-docs/docusaurus.config.ts) 第 8-16 行

```ts
const isGitHubPages = process.env.DEPLOY_TARGET === 'github'
const url = isGitHubPages ? 'https://binbinao.github.io' : ...
const baseUrl = isGitHubPages ? '/everything-claude-code/' : '/'
```

## 🟢 部署到 Vercel

### 前置条件

1. **Vercel 账号** — https://vercel.com/signup
2. **GitHub 集成** — 授权 Vercel 访问你的 GitHub
3. **Secrets 配置**：
   - `VERCEL_TOKEN` — Vercel 个人令牌
   - `VERCEL_ORG_ID` — Vercel 组织 ID
   - `VERCEL_PROJECT_ID` — Vercel 项目 ID

### 配置步骤

#### 1️⃣ 在 Vercel 创建项目

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 进入 ecc-docs 目录
cd ecc-docs

# 链接到现有项目（首次部署时创建）
vercel link
```

#### 2️⃣ 设置 GitHub Secrets

进入 **GitHub 仓库 → Settings → Secrets and variables → Actions**，添加：

| Secret | 说明 | 获取方式 |
|--------|------|----------|
| `VERCEL_TOKEN` | Vercel API Token | Vercel → Account Settings → Tokens → Create |
| `VERCEL_ORG_ID` | 组织 ID | `vercel link` 后查看 `.vercel/project.json` |
| `VERCEL_PROJECT_ID` | 项目 ID | `vercel link` 后查看 `.vercel/project.json` |

#### 3️⃣ 配置 Vercel 项目设置

在 Vercel 项目设置中：

- **Root Directory**: `ecc-docs`
- **Build Command**: `npm run build`（默认）
- **Output Directory**: `build`（默认）
- **Install Command**: `npm install`（默认）
- **Framework Preset**: Docusaurus

#### 4️⃣ 自动部署

每次推送到 `main` 分支，`.github/workflows/deploy.yml` 会自动：

1. 运行 CI 检查（测试 + 构建 + E2E）
2. 构建项目
3. 部署到 Vercel
4. 健康检查
5. 通知成功

### 手动部署

```bash
cd ecc-docs
vercel --prod
```

## 🐙 部署到 GitHub Pages

### 前置条件

1. **GitHub 仓库** — `binbinao/everything-claude-code`
2. **GitHub Pages 启用** — 仓库 Settings → Pages → Source: GitHub Actions

### 配置步骤

#### 1️⃣ 启用 GitHub Pages

进入 **GitHub 仓库 → Settings → Pages**：

- **Source**: `GitHub Actions`（推荐）或 `Deploy from a branch`
- **Custom domain**: （可选）如 `docs.ecc.tools`

#### 2️⃣ 推送触发部署

`.github/workflows/deploy-github-pages.yml` 会在以下情况自动触发：

```yaml
on:
  push:
    branches: [main]
    paths:
      - 'ecc-docs/**'
      - '.github/workflows/deploy-github-pages.yml'
  workflow_dispatch:  # 手动触发
```

#### 3️⃣ 部署流程

1. 检出代码
2. 安装 Node.js 20
3. `npm ci` 安装依赖
4. `DEPLOY_TARGET=github npm run build` 构建
5. 上传构建产物为 Pages artifact
6. 部署到 GitHub Pages

#### 4️⃣ 访问地址

```
https://binbinao.github.io/everything-claude-code/
```

### 手动触发部署

进入 **GitHub → Actions → Deploy to GitHub Pages → Run workflow**。

## 🔄 两边部署的差异

| 维度 | Vercel | GitHub Pages |
|------|--------|--------------|
| **URL 根路径** | `/` | `/everything-claude-code/` |
| **触发文件** | `deploy.yml` | `deploy-github-pages.yml` |
| **构建命令** | `vercel build` | `npm run build` |
| **环境变量** | `VERCEL_URL` | `DEPLOY_TARGET=github` |
| **部署凭证** | Vercel Secrets | 内置 GITHUB_TOKEN |
| **自定义域名** | ✅ 容易 | ✅ 可配置 |
| **预览部署** | ✅ 自动 PR 预览 | ❌ 仅 production |
| **回滚** | ✅ Vercel 控制台 | ⚠️ 需重新部署 |

## 🧪 本地测试构建

### Vercel 模式

```bash
cd ecc-docs
npm install
npm run build
npm run serve  # http://localhost:3000
```

### GitHub Pages 模式

```bash
cd ecc-docs
DEPLOY_TARGET=github npm run build
npx serve build -l 3000  # 测试 baseUrl
```

## 🔧 故障排查

### 问题 1：404 找不到资源

**症状**：页面加载但 CSS/JS 404

**原因**：baseUrl 配置错误

**解决**：检查 `docusaurus.config.ts` 中 `isGitHubPages` 判断：

```ts
const isGitHubPages = process.env.DEPLOY_TARGET === 'github'
```

### 问题 2：Vercel 部署失败

**症状**：GitHub Actions 报错 `VERCEL_TOKEN is not defined`

**解决**：

1. 确认 GitHub Secrets 已配置
2. 检查 `vercel.json` 在 `ecc-docs/` 目录下
3. 检查 Vercel CLI 版本：`npm i -g vercel@latest`

### 问题 3：GitHub Pages 部署失败

**症状**：Workflow 报 `403 Forbidden`

**解决**：

1. 仓库 Settings → Actions → General → Workflow permissions
2. 选择 "Read and write permissions"
3. 勾选 "Allow GitHub Actions to create and approve pull requests"

### 问题 4：构建失败 — MDX 错误

**症状**：`Unexpected character '/' (U+002F) before local name`

**原因**：MDX 把 `<https://example.com>` 当作 JSX 标签

**解决**：使用 markdown 链接语法：

```markdown
<!-- ❌ 错误 -->
<https://example.com>

<!-- ✅ 正确 -->
[example.com](https://example.com)
```

## 📚 相关资源

- **Docusaurus 部署文档**：https://docusaurus.io/docs/deployment
- **Vercel 文档**：https://vercel.com/docs
- **GitHub Pages 文档**：https://docs.github.com/en/pages
- **GitHub Actions 文档**：https://docs.github.com/en/actions

## 🎯 推荐的部署策略

1. **主部署用 Vercel** — 性能更好、预览部署
2. **备用镜像用 GitHub Pages** — 防止 Vercel 故障
3. **两边同时推送** — 提升可用性
4. **监控两个地址** — 设置健康检查

---

**🎉 部署成功！你的 ECC 文档站点已上线！**