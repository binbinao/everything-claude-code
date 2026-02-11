---
sidebar_position: 2
---

# 📦 详细安装指南

完整了解 ECC 的安装和配置选项。

## 系统要求

- **Node.js**: >= 20.0
- **CodeBuddy**: 最新版本
- **Git**: 用于克隆规则文件

## 完整安装流程

### 1. 安装 CodeBuddy

如果你还没有安装 CodeBuddy：

```bash
# macOS (Homebrew)
brew install codebuddy

# 其他平台请参考官方文档
```

### 2. 添加 ECC 市场

```bash
codebuddy plugin marketplace add https://github.com/affaan-m/everything-claude-code
```

这会将 ECC 的插件源添加到你的 CodeBuddy 配置中。

### 3. 安装 ECC 插件

```bash
codebuddy plugin install everything-claude-code@everything-claude-code
```

**包含内容**：
- 13+ 智能体 (Agents)
- 31+ 斜杠命令 (Commands)
- 28+ 技能库 (Skills)
- 20+ 自动化钩子 (Hooks)

### 4. 安装规则（关键步骤）

**⚠️ 重要**：ECC 插件不能自动分发规则文件，必须手动安装！

#### 创建规则目录

```bash
mkdir -p .codebuddy/rules
```

#### 复制通用规则

```bash
cp -r /path/to/everything-claude-code/rules/common/* .codebuddy/rules/
```

通用规则包含：
- `agents.md` - 智能体委派规范
- `coding-style.md` - 编码风格指南
- `git-workflow.md` - Git 工作流
- `testing.md` - 测试规范（TDD、80%覆盖率）
- `performance.md` - 性能优化
- `patterns.md` - 设计模式
- `hooks.md` - 钩子架构
- `security.md` - 安全规范

#### 根据技术栈添加语言规则

**TypeScript 项目**：
```bash
cp -r /path/to/everything-claude-code/rules/typescript/* .codebuddy/rules/
```

**Python 项目**：
```bash
cp -r /path/to/everything-claude-code/rules/python/* .codebuddy/rules/
```

**Go 项目**：
```bash
cp -r /path/to/everything-claude-code/rules/golang/* .codebuddy/rules/
```

## 🔧 高级配置

### 包管理器设置

ECC 使用优先级顺序检测包管理器：

1. 环境变量 `CLAUDE_PACKAGE_MANAGER`
2. `.claude/package-manager.json`
3. `package.json` 的 `packageManager` 字段
4. 锁文件检测
5. 全局配置
6. 回退到首个可用

#### 手动设置偏好

```bash
# 查看当前检测的包管理器
/setup-pm --detect

# 设置为 pnpm
/setup-pm --set pnpm

# 设置为 yarn
/setup-pm --set yarn

# 设置为 npm
/setup-pm --set npm
```

### 上下文配置

Contexts 让你在不同场景下使用不同的 "人设"：

#### 创建自定义上下文

在 `.codebuddy/contexts/` 目录下创建 `.md` 文件：

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

#### 使用上下文

```bash
# 启动时加载特定上下文
codebuddy --context dev.md

# 会话中切换上下文
/context dev.md
```

## 🛠️ 故障排查

### 问题：命令不可用

**症状**：输入 `/plan` 提示命令不存在

**解决方案**：
1. 确认插件已安装：`codebuddy plugin list`
2. 重启 CodeBuddy
3. 检查规则是否正确复制到 `.codebuddy/rules/`

### 问题：规则不生效

**症状**：AI 没有遵循规则中的规范

**解决方案**：
1. 检查规则文件路径：`.codebuddy/rules/*.md`
2. 确认规则文件格式正确
3. 重启 CodeBuddy 会话

### 问题：包管理器检测错误

**症状**：使用了错误的包管理器

**解决方案**：
```bash
# 手动设置
/setup-pm --set <你的偏好>

# 或者创建 .claude/package-manager.json
{
  "packageManager": "pnpm"
}
```

## ✅ 验证安装

运行以下检查清单：

```bash
# 1. 检查插件列表
codebuddy plugin list
# 应该看到 everything-claude-code

# 2. 检查规则文件
ls .codebuddy/rules/
# 应该看到 agents.md, coding-style.md 等

# 3. 测试命令
codebuddy
# 然后输入: /plan "test"
# 应该看到 planner 智能体的输出
```

## 🎉 恭喜！

你已经完成 ECC 的完整安装！现在可以开始探索：

- [第一个命令](first-command) - 体验 /plan 的强大功能
- [核心概念](../core-concepts/) - 深入理解 Agents/Commands/Skills
