---
sidebar_position: 4
title: Deployment Guide
description: A complete guide to deploying the ECC learning site to Vercel
---

# Deployment Guide

This guide will help you deploy the ECC learning site to Vercel and configure CI/CD automation.

## 🚀 Quick Deploy to Vercel

### Option 1: One-Click Deploy (Recommended for beginners)

Click the button below to deploy to Vercel in one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/everything-claude-code/tree/main/ecc-docs)

### Option 2: Manual Deployment

#### 1. Install the Vercel CLI

```bash
npm install -g vercel
```

#### 2. Log in to Vercel

```bash
vercel login
```

#### 3. Deploy the Project

```bash
cd ecc-docs
vercel
```

On first deployment, Vercel will ask some configuration questions:
- **Set up and deploy?** Yes
- **Which scope?** Select your account
- **Link to existing project?** No
- **Project name?** ecc-learning-site
- **Directory?** ./
- **Override settings?** No

## ⚙️ CI/CD Configuration

### GitHub Actions Workflows

The project comes with pre-configured GitHub Actions, including two workflows:

#### CI Workflow (`ci.yml`)

Runs automatically on every push or PR:
- ✅ Unit tests
- ✅ Build verification
- ✅ E2E tests

#### Deploy Workflow (`deploy.yml`)

Automatically deploys when pushed to the `main` branch:
- ✅ Run CI checks
- ✅ Deploy to Vercel
- ✅ Verify deployment

### Configure GitHub Secrets

Add the following Secrets in your GitHub repository settings:

| Secret Name | Description | How to Obtain |
|-------------|-------------|---------------|
| `VERCEL_TOKEN` | Vercel API Token | [Vercel Settings](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | Vercel Organization ID | `.vercel/project.json` |
| `VERCEL_PROJECT_ID` | Vercel Project ID | `.vercel/project.json` |

## 🔒 Environment Variables

### Local Development

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in your configuration.

### Vercel Environment Variables

Configure environment variables in Vercel project settings:

1. Open the Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add the required variables

## 📊 Deployment Checklist

Confirm before deploying:

- [ ] All unit tests pass (`npm test`)
- [ ] Build succeeds (`npm run build`)
- [ ] E2E tests pass (`npm run test:e2e`)
- [ ] Environment variables are configured
- [ ] GitHub Secrets are set up

## 🌐 Custom Domain

### Add a Custom Domain

1. Open the project in the Vercel Dashboard
2. Go to Settings → Domains
3. Add your domain
4. Configure DNS records

### DNS Configuration Example

| Type | Name | Value |
|------|------|-------|
| CNAME | www | cname.vercel-dns.com |
| A | @ | 76.76.19.19 |

## 🔧 Advanced Configuration

### Custom Build Command

Edit `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build"
}
```

### Configure Redirects

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

### Configure Security Headers

The project comes pre-configured with these security headers:
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

## 📈 Monitoring and Analytics

### Vercel Analytics

Enable Analytics in the Vercel Dashboard:
1. Go to project settings
2. Select Analytics
3. Enable Web Analytics

### Performance Monitoring

Monitor with Vercel Speed Insights:
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)

## 🐛 FAQ

### Build Failure

1. Check that the Node.js version is 20+
2. Verify that `package-lock.json` is committed
3. Review build logs for errors

### 404 After Deployment

1. Verify the `outputDirectory` configuration is correct
2. Check rewrite rules
3. Clear Vercel cache and redeploy

### Environment Variables Not Working

1. Verify variable names are correct
2. Check variable scope (Production/Preview/Development)
3. Redeploy for variables to take effect

## 📚 Related Resources

- [Vercel Official Documentation](https://vercel.com/docs)
- [Docusaurus Deployment Guide](https://docusaurus.io/docs/deployment)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
