---
sidebar_position: 3
title: Go 项目指南
description: 使用 ECC 进行 Go 项目开发
---

# 🐹 Go 项目指南

本指南介绍如何在 Go 项目中充分利用 ECC。

## 快速配置

### 1. 安装 Go 规则包

```bash
# 复制 Go 规则到 CodeBuddy 配置目录
cp -r rules/golang/* ~/.claude/rules/ecc/
```

### 2. 项目结构建议

```
your-project/
├── .claude/
│   └── rules/          # 项目特定规则
├── cmd/
│   └── app/
│       └── main.go     # 入口点
├── internal/
│   ├── handlers/       # HTTP 处理器
│   ├── services/       # 业务逻辑
│   └── repository/     # 数据访问
├── pkg/
│   └── utils/          # 公共工具
├── go.mod
└── go.sum
```

## 推荐工作流

### 新功能开发（v2.0.0 推荐）

```bash
# 一键完成 MVP（Go 微服务 / REST API）
/orch-build-mvp "user API with PostgreSQL + Redis cache"

# 或添加独立端点
/orch-add-feature "user-registration-endpoint"
/orch-add-feature "user-profile-endpoint"
/orch-add-feature "auth-middleware"
```

### 手动分步（学习 / 简单功能）

```bash
# 1. 规划
/plan 实现 REST API 端点

# 2. TDD 开发
/tdd --feature="user-api"

# 3. 代码审查
/code-review internal/

# 4. 构建检查
/build-fix
```

### 微服务开发

```bash
# 1. 架构设计
/plan --architect 设计订单服务

# 2. 接口定义
/plan 定义 gRPC 接口

# 3. 实现（用 orchestrator 自动协调）
/orch-build-mvp "order-service with gRPC + PostgreSQL"

# 或分步
/tdd --feature="order-service"
/tdd --feature="payment-integration"
```

## 钩子配置

### 推荐的 Go 钩子

```json
{
  "hooks": {
    "postToolUse": [
      {
        "name": "gofmt",
        "trigger": "*.go",
        "command": "gofmt -w"
      },
      {
        "name": "golint",
        "trigger": "*.go",
        "command": "golangci-lint run"
      },
      {
        "name": "go-build",
        "trigger": "*.go",
        "command": "go build ./..."
      }
    ]
  }
}
```

## 最佳实践

### 错误处理

```go
// ✅ 使用 errors.Is 和 errors.As
func ProcessFile(path string) error {
    data, err := os.ReadFile(path)
    if err != nil {
        if errors.Is(err, os.ErrNotExist) {
            return fmt.Errorf("配置文件不存在: %w", err)
        }
        return fmt.Errorf("读取文件失败: %w", err)
    }
    // 处理数据...
    return nil
}
```

### 接口设计

```go
// ✅ 小接口，高内聚
type Reader interface {
    Read(p []byte) (n int, err error)
}

type Writer interface {
    Write(p []byte) (n int, err error)
}

// 组合接口
type ReadWriter interface {
    Reader
    Writer
}
```

### 并发模式

```go
// ✅ 使用 context 控制生命周期
func Worker(ctx context.Context, jobs <-chan Job) {
    for {
        select {
        case <-ctx.Done():
            return
        case job := <-jobs:
            process(job)
        }
    }
}
```

### 依赖注入

```go
// ✅ 使用构造函数注入依赖
type UserService struct {
    repo UserRepository
    log  *slog.Logger
}

func NewUserService(repo UserRepository, log *slog.Logger) *UserService {
    return &UserService{
        repo: repo,
        log:  log,
    }
}
```

## 测试框架

### 表驱动测试

```go
func TestAdd(t *testing.T) {
    tests := []struct {
        name     string
        a, b     int
        expected int
    }{
        {"正数相加", 1, 2, 3},
        {"负数相加", -1, -2, -3},
        {"零值", 0, 0, 0},
    }
    
    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            result := Add(tt.a, tt.b)
            if result != tt.expected {
                t.Errorf("got %d, want %d", result, tt.expected)
            }
        })
    }
}
```

## 常用命令

| 场景 | 命令 |
|------|------|
| 开始新功能 | `/plan 功能描述` |
| TDD 开发 | `/tdd --feature="名称"` |
| 代码审查 | `/code-review` |
| 构建检查 | `/build-fix` |
| 性能分析 | `/orch-refine-code --profile` |

---

💡 **提示**：Go 项目推荐使用 golangci-lint 进行代码检查，使用 table-driven tests 编写测试！
