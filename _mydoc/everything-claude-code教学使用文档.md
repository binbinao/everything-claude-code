# Everything-Claude-Code 教学使用文档

## 🎯 文档概述

本文档是 **Everything-Claude-Code** 项目的完整教学指南，旨在帮助开发者快速掌握这个功能强大的Claude Code插件库的使用方法。

### ✨ 项目简介

**Everything-Claude-Code** 是一个由Anthropic黑客马拉松获奖者创建的Claude Code配置集合，包含：
- **15+ 专业代理**（Agents）- 处理特定任务的子代理
- **30+ 技能**（Skills）- 工作流定义和领域知识
- **20+ 命令**（Commands）- 快速执行的斜杠命令
- **智能钩子**（Hooks）- 自动化工具事件处理
- **最佳实践规则**（Rules）- 始终遵循的编码指南

## 🚀 快速开始

### 前置要求

- **Claude Code CLI v2.1.0+**（必需）
- Node.js 16+（推荐）
- Git（用于版本控制）

### 安装步骤

#### 方法一：作为插件安装（推荐）

```bash
# 1. 添加市场源
/plugin marketplace add affaan-m/everything-claude-code

# 2. 安装插件
/plugin install everything-claude-code@everything-claude-code
```

#### 方法二：手动安装

```bash
# 1. 克隆仓库
git clone https://github.com/affaan-m/everything-claude-code.git

# 2. 复制代理到配置目录
cp everything-claude-code/agents/*.md ~/.claude/agents/

# 3. 复制规则
cp everything-claude-code/rules/*.md ~/.claude/rules/

# 4. 复制命令
cp everything-claude-code/commands/*.md ~/.claude/commands/

# 5. 复制技能
cp -r everything-claude-code/skills/* ~/.claude/skills/
```

### 验证安装

```bash
# 检查可用命令
/plugin list everything-claude-code@everything-claude-code

# 测试TDD命令
/tdd "创建一个用户注册功能"
```

## 🛠️ 核心功能详解

### 1. 代理系统（Agents）

代理是专门处理特定任务的子AI助手：

| 代理名称 | 功能描述 | 使用场景 |
|---------|---------|---------|
| `planner` | 功能实现规划 | 项目架构设计 |
| `architect` | 系统设计决策 | 技术选型评估 |
| `code-reviewer` | 代码质量审查 | 代码质量检查 |
| `security-reviewer` | 安全漏洞分析 | 安全审计 |
| `tdd-guide` | 测试驱动开发 | TDD实践 |

**使用示例：**
```bash
# 使用规划代理制定项目计划
/plan "开发一个电商平台的后端API"

# 使用安全审查代理检查代码
/security-review "检查用户认证代码的安全性"
```

### 2. 技能系统（Skills）

技能是预定义的工作流和最佳实践：

- **backend-patterns**: 后端架构模式和API设计
- **frontend-patterns**: 前端React/Next.js模式
- **tdd-workflow**: 测试驱动开发流程
- **security-review**: 安全检查清单
- **continuous-learning**: 自动学习模式

**技能结构示例：**
```markdown
---
name: backend-patterns
description: 后端架构模式、API设计、数据库优化
---

# API设计模式
- RESTful API结构
- 仓库模式（Repository Pattern）
- 服务层模式（Service Layer）
- 中间件模式（Middleware）
```

### 3. 命令系统（Commands）

快速执行的斜杠命令：

```bash
# TDD开发流程
/tdd "实现用户登录功能"

# 端到端测试生成
/e2e "用户注册流程测试"

# 代码质量审查
/code-review "检查当前项目的代码质量"

# 构建错误修复
/build-fix "修复TypeScript编译错误"
```

## 📚 实战案例：构建用户管理系统

### 案例目标
创建一个完整的用户管理系统，包含：
- 用户注册/登录
- 权限管理
- 数据验证
- 错误处理

### 第一步：项目规划

```bash
# 使用规划代理制定项目计划
/plan "构建用户管理系统，包含注册、登录、权限管理功能"
```

**预期输出：**
- 项目结构设计
- 技术栈选择（Next.js + Prisma + PostgreSQL）
- API端点规划
- 数据库模式设计

### 第二步：TDD开发用户注册功能

```bash
# 启动TDD工作流
/tdd "实现用户注册API端点"
```

**TDD流程：**
1. **编写失败测试**：定义用户注册的测试用例
2. **最小实现**：实现基本的注册功能
3. **重构优化**：改进代码结构和错误处理
4. **验证覆盖**：确保测试覆盖率达标

### 第三步：后端模式应用

使用 `backend-patterns` 技能优化代码：

```typescript
// 应用仓库模式
interface UserRepository {
  create(userData: CreateUserDto): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
}

// 应用服务层模式
class UserService {
  constructor(private userRepo: UserRepository) {}
  
  async register(userData: CreateUserDto): Promise<User> {
    // 业务逻辑：验证、密码加密、创建用户
  }
}

// 应用错误处理模式
class ApiError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message)
  }
}
```

### 第四步：安全审查

```bash
# 使用安全审查代理
/security-review "检查用户认证系统的安全性"
```

**安全检查点：**
- 密码加密（bcrypt）
- JWT令牌验证
- 输入验证（Zod）
- SQL注入防护
- CSRF保护

### 第五步：端到端测试

```bash
# 生成E2E测试
/e2e "用户注册和登录流程测试"
```

**测试场景：**
- 用户注册成功
- 重复邮箱注册失败
- 用户登录成功
- 无效凭证登录失败

## 🔧 高级功能

### 1. 持续学习系统

**continuous-learning-v2** 技能可以自动从会话中学习模式：

```bash
# 查看已学习的本能
/instinct-status

# 导出学习成果
/instinct-export

# 导入他人经验
/instinct-import instincts.json
```

### 2. 智能钩子系统

钩子自动执行特定操作：

```json
{
  "matcher": "tool == 'Edit' && file_path matches '\\.(ts|tsx)$'",
  "hooks": [{
    "type": "command",
    "command": "检查TypeScript代码质量"
  }]
}
```

### 3. 包管理器检测

自动检测和配置包管理器：

```bash
# 设置首选包管理器
export CLAUDE_PACKAGE_MANAGER=pnpm

# 或使用命令
/setup-pm pnpm
```

## 🐛 常见问题解决

### 问题1：插件安装失败

**症状：** `Error: Plugin installation failed`

**解决方案：**
```bash
# 检查Claude Code版本
claude --version

# 确保版本 >= v2.1.0
# 如版本过低，升级Claude Code
```

### 问题2：命令无法识别

**症状：** `Unknown command: /tdd`

**解决方案：**
```bash
# 验证插件安装状态
/plugin list

# 重新安装规则
cp -r everything-claude-code/rules/* ~/.claude/rules/
```

### 问题3：上下文窗口不足

**症状：** `Context window exceeded`

**解决方案：**
- 禁用不必要的MCP服务器
- 使用 `disabledMcpServers` 配置
- 启用战略压缩（strategic-compact）

## 📈 最佳实践

### 1. 项目配置

在项目根目录创建 `CLAUDE.md`：

```markdown
# 项目概述
用户管理系统 - Next.js + TypeScript + Prisma

## 关键规则
- 代码组织：小文件优于大文件
- 代码风格：不可变性优先
- 测试要求：TDD，80%覆盖率
- 安全规则：无硬编码密钥
```

### 2. 工作流优化

**开发流程：**
1. 使用 `/plan` 制定计划
2. 使用 `/tdd` 进行测试驱动开发
3. 使用 `/code-review` 进行代码审查
4. 使用 `/e2e` 进行端到端测试

### 3. 性能优化

**上下文管理：**
- 保持活跃MCP服务器少于10个
- 启用记忆持久化钩子
- 使用迭代检索模式优化子代理

## 🎓 学习路径建议

### 初学者路径（1-2周）
1. **基础掌握**：安装配置、基本命令使用
2. **技能应用**：backend-patterns、frontend-patterns
3. **实战练习**：完成用户管理系统案例

### 进阶路径（2-4周）
1. **代理精通**：熟练使用各种专业代理
2. **自定义扩展**：创建自定义技能和钩子
3. **团队协作**：分享本能和最佳实践

### 专家路径（1个月+）
1. **系统优化**：性能调优、上下文管理
2. **模式创新**：开发新的工作流模式
3. **社区贡献**：向项目提交改进和扩展

## 🔗 资源链接

- **官方文档**：https://github.com/affaan-m/everything-claude-code
- **简版指南**：The Shorthand Guide（入门必读）
- **详版指南**：The Longform Guide（进阶学习）
- **社区讨论**：GitHub Issues和Discussions

## 💡 小贴士

1. **循序渐进**：不要一次性启用所有功能
2. **实践为主**：通过实际项目学习效果最佳
3. **及时反馈**：遇到问题及时在社区寻求帮助
4. **持续学习**：关注项目更新和新功能

---

**开始你的Everything-Claude-Code之旅吧！** 🚀

记住：最好的学习方式就是动手实践。从简单的项目开始，逐步掌握这个强大工具的全部功能。