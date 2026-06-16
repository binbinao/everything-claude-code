---
sidebar_position: 3
title: Troubleshooting
description: Common ECC issues and solutions
---

# 🔧 Troubleshooting

Don't panic when you hit issues! This guide helps you quickly locate and resolve common problems with ECC.

## Common Issue Categories

### 🔴 Installation Issues

#### Issue: Rule Files Not Loading

**Symptom**:
```
Warning: Rules directory not found
```

**Solution**:
```bash
# 1. Check if the directory exists
ls -la ~/.codebuddy/rules/

# 2. If it doesn't exist, create it
mkdir -p ~/.codebuddy/rules/

# 3. Copy rule files
cp -r rules/typescript/* ~/.codebuddy/rules/
```

#### Issue: Agent Not Recognized

**Symptom**:
```
Agent 'planner' not found
```

**Solution**:
```bash
# Check the agents directory
ls -la ~/.claude/agents/

# Ensure file permissions are correct
chmod 644 ~/.claude/agents/*.md
```

### 🟡 Configuration Issues

#### Issue: Hooks Not Executing

**Symptom**: Hooks don't trigger after saving a file

**Troubleshooting steps**:
```bash
# 1. Check settings.json format
cat ~/.claude/settings.json | jq .

# 2. Verify hook configuration
grep -A 10 "hooks" ~/.claude/settings.json

# 3. Check file pattern matching
echo "*.ts" | grep "your-file.ts"
```

#### Issue: Theme Toggle Not Working

**Symptom**: Dark/light mode toggle has no effect

**Solution**:
```bash
# Check docusaurus.config.ts
grep -A 5 "colorMode" docusaurus.config.ts

# Ensure configuration is correct
colorMode: {
  defaultMode: 'light',
  disableSwitch: false,  # Should be false
  respectPrefersColorScheme: true,
}
```

### 🔵 Runtime Issues

#### Issue: Build Failure

**Symptom**:
```
Error: Build failed with exit code 1
```

**Solution**:
```bash
# 1. Use the build fix agent
/build-and-fix

# 2. Or troubleshoot manually
npm run build 2>&1 | head -50

# 3. Clear cache and retry
rm -rf node_modules/.cache
npm run build
```

#### Issue: Test Timeout

**Symptom**:
```
Timeout of 30000ms exceeded
```

**Solution**:
```typescript
// Increase timeout for specific tests
test('slow test', async () => {
  // ...
}, { timeout: 60000 })

// Or set globally in config
export default defineConfig({
  test: {
    testTimeout: 60000
  }
})
```

#### Issue: E2E Test Element Not Found

**Symptom**:
```
Error: locator.click: Target closed
```

**Solution**:
```typescript
// 1. Add waiting
await page.waitForSelector('[data-testid="button"]')

// 2. Use more stable selectors
await page.locator('[data-testid="button"]').click()

// 3. Increase timeout
await page.click('[data-testid="button"]', { timeout: 10000 })
```

### ⚫ Performance Issues

#### Issue: Slow Response

**Possible causes**:
1. Context window approaching its limit
2. Hook execution takes too long
3. Network latency

**Solution**:
```bash
# 1. Start a new session
# 2. Simplify hook configuration
# 3. Check network connection
```

## Diagnostic Commands

### Check Environment

```bash
# Node.js version
node --version

# npm version
npm --version

# Project dependencies
npm ls --depth=0
```

### Check Configuration

```bash
# ECC configuration
cat ~/.claude/settings.json

# Project rules
ls -la .codebuddy/rules/

# Agent configuration
ls -la ~/.claude/agents/
```

### Collect Logs

```bash
# Build logs
npm run build 2>&1 | tee build.log

# Test logs
npm test 2>&1 | tee test.log

# Playwright traces
npx playwright test --trace on
```

## Getting Help

### 1. Check Documentation

```bash
# Online documentation
open https://ecc-docs.example.com

# Local documentation
npm run start
```

### 2. Search Known Issues

```bash
# GitHub Issues
open https://github.com/anthropics/ecc/issues

# Use ECC search
/search error keywords
```

### 3. Submit a Bug Report

When submitting a report, please include:
- [ ] Operating system and version
- [ ] Node.js version
- [ ] ECC version
- [ ] Error message (complete)
- [ ] Steps to reproduce
- [ ] Related configuration files

## Quick Fix Reference

| Issue | Quick Fix |
|-------|-----------|
| Rules not loading | `mkdir -p ~/.codebuddy/rules/` |
| Hooks not executing | Check `settings.json` format |
| Build failure | `/build-and-fix` |
| Test timeout | Increase `timeout` configuration |
| E2E failure | Add `waitForSelector` |
| Slow response | Start a new session |

---

💡 **Tip**: When you encounter an issue, first try `/debug issue description` and let ECC help you analyze it!
