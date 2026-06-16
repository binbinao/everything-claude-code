---
sidebar_position: 3
title: 故障排查
description: ECC 常见问题及解决方案
---

# 🔧 故障排查

遇到问题不要慌！本指南帮你快速定位和解决 ECC 使用中的常见问题。

## 常见问题分类

### 🔴 安装问题

#### 问题：规则文件无法加载

**症状**：
```
Warning: Rules directory not found
```

**解决方案**：
```bash
# 1. 检查目录是否存在
ls -la ~/.claude/rules/ecc/

# 2. 如果不存在，创建目录
mkdir -p ~/.claude/rules/ecc/

# 3. 复制规则文件
cp -r rules/typescript/* ~/.claude/rules/ecc/
```

#### 问题：智能体无法识别

**症状**：
```
Agent 'planner' not found
```

**解决方案**：
```bash
# 检查智能体目录
ls -la ~/.claude/agents/

# 确保文件权限正确
chmod 644 ~/.claude/agents/*.md
```

### 🟡 配置问题

#### 问题：钩子不执行

**症状**：保存文件后钩子没有触发

**排查步骤**：
```bash
# 1. 检查 settings.json 格式
cat ~/.claude/settings.json | jq .

# 2. 验证钩子配置
grep -A 10 "hooks" ~/.claude/settings.json

# 3. 检查文件模式匹配
echo "*.ts" | grep "your-file.ts"
```

#### 问题：主题切换不工作

**症状**：深色/浅色模式切换无效

**解决方案**：
```bash
# 检查 docusaurus.config.ts
grep -A 5 "colorMode" docusaurus.config.ts

# 确保配置正确
colorMode: {
  defaultMode: 'light',
  disableSwitch: false,  # 应为 false
  respectPrefersColorScheme: true,
}
```

### 🔵 运行时问题

#### 问题：构建失败

**症状**：
```
Error: Build failed with exit code 1
```

**解决方案**：
```bash
# 1. 使用构建修复智能体
/build-fix

# 2. 或手动排查
npm run build 2>&1 | head -50

# 3. 清除缓存重试
rm -rf node_modules/.cache
npm run build
```

#### 问题：测试超时

**症状**：
```
Timeout of 30000ms exceeded
```

**解决方案**：
```typescript
// 增加超时时间
test('slow test', async () => {
  // ...
}, { timeout: 60000 })

// 或在配置中全局设置
export default defineConfig({
  test: {
    testTimeout: 60000
  }
})
```

#### 问题：E2E 测试元素未找到

**症状**：
```
Error: locator.click: Target closed
```

**解决方案**：
```typescript
// 1. 添加等待
await page.waitForSelector('[data-testid="button"]')

// 2. 使用更稳定的选择器
await page.locator('[data-testid="button"]').click()

// 3. 增加超时
await page.click('[data-testid="button"]', { timeout: 10000 })
```

### ⚫ 性能问题

#### 问题：响应缓慢

**可能原因**：
1. 上下文窗口接近上限
2. 钩子执行耗时
3. 网络延迟

**解决方案**：
```bash
# 1. 开始新会话
# 2. 简化钩子配置
# 3. 检查网络连接
```

## 诊断命令

### 检查环境

```bash
# Node.js 版本
node --version

# npm 版本
npm --version

# 项目依赖
npm ls --depth=0
```

### 检查配置

```bash
# ECC 配置
cat ~/.claude/settings.json

# 项目规则
ls -la .claude/rules/ecc/

# 智能体配置
ls -la ~/.claude/agents/
```

### 日志收集

```bash
# 构建日志
npm run build 2>&1 | tee build.log

# 测试日志
npm test 2>&1 | tee test.log

# Playwright 跟踪
npx playwright test --trace on
```

## 获取帮助

### 1. 查看文档

```bash
# 在线文档
open https://ecc-docs.example.com

# 本地文档
npm run start
```

### 2. 搜索已知问题

```bash
# GitHub Issues
open https://github.com/anthropics/ecc/issues

# 使用 ECC 搜索
/search 错误关键词
```

### 3. 提交 Bug 报告

提交报告时请包含：
- [ ] 操作系统和版本
- [ ] Node.js 版本
- [ ] ECC 版本
- [ ] 错误信息（完整）
- [ ] 复现步骤
- [ ] 相关配置文件

## 快速修复清单

| 问题 | 快速修复 |
|------|----------|
| 规则不加载 | `mkdir -p ~/.claude/rules/ecc/` |
| 钩子不执行 | `/hookify-list` 检查注册状态 |
| 构建失败 | `/build-fix` |
| 测试超时 | 增加 `timeout` 配置 |
| E2E 失败 | 添加 `waitForSelector` |
| 响应缓慢 | `/context-budget --check` 查看上下文用量 |
| Orchestration 卡住 | `/orch-fix-defect "继续上次的任务"` |
| Hook 误拦截 | `/hookify-configure disable <hook-id>` |

## v2.0.0 新增调试工具

```bash
# 列出所有已注册 hook
/hookify-list

# 查看 hook 帮助
/hookify-help

# 干跑模式：看 hook 决策但不执行
git commit --dry-run

# 上下文压缩前手动保存
/checkpoint

# 查看会话历史
/sessions

# 重新调度卡住的编排
/orch-fix-defect "继续上次的 MVP 构建"

# 框架配置审计
/harness-audit

# 健康检查：plugin 缓存
/plugin health
```

---

💡 **提示**：遇到问题时，先尝试 `/silent-failure-hunter 问题描述`，让 ECC 帮你分析！如果是跨框架问题，参考 [Hermes Operator 章节](hermes-operator)。
