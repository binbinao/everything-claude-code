---
sidebar_position: 4
title: 部署指南
description: 将 ECC 学习站点部署到 Vercel 和 GitHub Pages 的完整指南
---

# 部署指南

> **关于本文档**：`ecc-docs/` 是 ECC 的 Docusaurus 3.7 学习站点源码，部署双平台支持：
>
> | 平台 | URL | 触发 |
> |------|-----|------|
> | **Vercel（主）** | https://ecc-docs.vercel.app | push → `deploy.yml` |
> | **GitHub Pages（备）** | https://binbinao.github.io/everything-claude-code/ | push → `deploy-github-pages.yml` |
>
> 详细流程参见 [advanced/deployment-guide](../advanced/deployment-guide)。本文档聚焦于通用 Vercel 部署步骤。

## 🚀 快速部署到 Vercel

### 方式一：一键部署（推荐新手）

点击下方按钮，一键部署到 Vercel：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/binbinao/everything-claude-code/tree/feat/ecc-docs-cn/ecc-docs)

### 方式二：手动部署

#### 1. 安装 Vercel CLI

```bash
npm install -g vercel
```

#### 2. 登录 Vercel

```bash
vercel login
```

#### 3. 部署项目

```bash
cd ecc-docs
vercel
```

首次部署时，Vercel 会询问一些配置问题：
- **Set up and deploy?** Yes
- **Which scope?** 选择你的账户
- **Link to existing project?** No
- **Project name?** ecc-learning-site
- **Directory?** ./
- **Override settings?** No

## ⚙️ CI/CD 配置

### GitHub Actions 工作流

项目已配置好 GitHub Actions，包含两个工作流：

#### CI 工作流 (`ci.yml`)

每次 push 或 PR 时自动运行：
- ✅ 单元测试
- ✅ 构建验证
- ✅ E2E 测试

#### Deploy 工作流 (`deploy.yml`)

push 到 `main` 分支时自动部署：
- ✅ 运行 CI 检查
- ✅ 部署到 Vercel
- ✅ 验证部署

### 配置 GitHub Secrets

在 GitHub 仓库设置中添加以下 Secrets：

| Secret 名称 | 描述 | 如何获取 |
|------------|------|---------|
| `VERCEL_TOKEN` | Vercel API Token | [Vercel Settings](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | Vercel 组织 ID | `.vercel/project.json` |
| `VERCEL_PROJECT_ID` | Vercel 项目 ID | `.vercel/project.json` |

## 🔒 环境变量

### 本地开发

复制 `.env.example` 到 `.env.local`：

```bash
cp .env.example .env.local
```

编辑 `.env.local` 填入你的配置。

### Vercel 环境变量

在 Vercel 项目设置中配置环境变量：

1. 打开 Vercel Dashboard
2. 选择你的项目
3. 进入 Settings → Environment Variables
4. 添加需要的变量

## 📊 部署检查清单

部署前请确认：

- [ ] 所有单元测试通过 (`npm test`)
- [ ] 构建成功 (`npm run build`)
- [ ] E2E 测试通过 (`npm run test:e2e`)
- [ ] 环境变量已配置
- [ ] GitHub Secrets 已设置

## 🌐 自定义域名

### 添加自定义域名

1. 在 Vercel Dashboard 中打开项目
2. 进入 Settings → Domains
3. 添加你的域名
4. 配置 DNS 记录

### DNS 配置示例

| 类型 | 名称 | 值 |
|-----|-----|-----|
| CNAME | www | cname.vercel-dns.com |
| A | @ | 76.76.19.19 |

## 🔧 高级配置

### 自定义构建命令

编辑 `vercel.json`：

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build"
}
```

### 配置重定向

```json
{
  "redirects": [
    {
      "source": "/old-path",
      "destination": "/new-path",
      "permanent": true
    }
  ]
}
```

### 配置安全头

项目已预配置以下安全头：
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

## 📈 监控和分析

### Vercel Analytics

在 Vercel Dashboard 中启用 Analytics：
1. 进入项目设置
2. 选择 Analytics
3. 启用 Web Analytics

### 性能监控

使用 Vercel Speed Insights 监控：
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)

## 🐛 常见问题

### 构建失败

1. 检查 Node.js 版本是否为 20+
2. 确认 `package-lock.json` 已提交
3. 查看构建日志排查错误

### 部署后 404

1. 确认 `outputDirectory` 配置正确
2. 检查 rewrites 规则
3. 清除 Vercel 缓存重新部署

### 环境变量未生效

1. 确认变量名称正确
2. 检查变量作用域（Production/Preview/Development）
3. 重新部署使变量生效

## 📚 相关资源

- [Vercel 官方文档](https://vercel.com/docs)
- [Docusaurus 部署指南](https://docusaurus.io/docs/deployment)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
