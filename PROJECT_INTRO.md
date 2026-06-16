# Everything Claude Code 项目介绍

## 是什么

这是一个 **Claude Code (Claude AI 编程助手) 的配置大礼包**，由 Anthropic 黑客马拉松获奖者整理和维护。

**42K+ ⭐ | 5K+ Fork | 24 贡献者 | 支持 6 种语言**

---

## 核心功能

| 类别 | 数量 | 说明 |
|------|------|------|
| **Agents** | 15+ | 专业子代理：规划、代码审查、TDD引导、安全审查等 |
| **Skills** | 30+ | 工作流定义：编码模式、连续学习、验证循环等 |
| **Commands** | 30+ | 斜杠命令：/plan, /tdd, /e2e, /code-review 等 |
| **Rules** | 8+ | 编码规范：代码风格、Git工作流、测试要求、性能优化等 |
| **Hooks** | 10+ | 自动化：会话持久化、上下文压缩、模式提取等 |

---

## 包含的技术栈

- TypeScript/JavaScript
- Python/Django
- Go
- Java/Spring Boot

---

## 学习资源

- 📘 [Short Guide (入门)](https://x.com/affaanmustafa/status/2012378465664745795) - 先看这个
- 📖 [Long Form Guide (进阶)](https://x.com/affaanmustafa/status/2014040193557471352) - 深入理解

---

## 快速开始

```bash
# 1. 添加插件市场
/plugin marketplace add affaan-m/everything-claude-code

# 2. 安装插件
/plugin install everything-claude-code@everything-claude-code

# 3. 安装规则 (必须)
/plugin install everything-claude-code@everything-claude-code
cp -r rules/common/* ~/.claude/rules/
```

---

## 常用命令

```bash
/plan "添加用户认证"     # 创建实现计划
/tdd                    # TDD 开发流程
/code-review            # 代码审查
/e2e                    # 端到端测试
/learn                  # 从会话中提取模式
/evolve                 # 将本能聚合成技能
```

---

## 特色功能

1. **连续学习 v2** - 从会话中自动学习你的编码习惯
2. **验证循环** - 自动化测试和验证
3. **多代理编排** - PM2 多服务管理
4. **中文支持** - 完整的简体中文和繁体中文翻译

---

## 更多信息

- 官网: https://github.com/affaan-m/everything-claude-code
- 作者: [@affaanmustafa](https://x.com/affaanmustafa)
