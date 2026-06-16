---
sidebar_position: 3
title: Go Project Guide
description: Developing Go projects with ECC
---

# 🐹 Go Project Guide

This guide covers how to make the most of ECC in Go projects.

## Quick Setup

### 1. Install the Go Rule Pack

```bash
# Copy Go rules to the CodeBuddy config directory
cp -r rules/golang/* ~/.codebuddy/rules/
```

### 2. Recommended Project Structure

```
your-project/
├── .codebuddy/
│   └── rules/          # Project-specific rules
├── cmd/
│   └── app/
│       └── main.go     # Entry point
├── internal/
│   ├── handlers/       # HTTP handlers
│   ├── services/       # Business logic
│   └── repository/     # Data access
├── pkg/
│   └── utils/          # Public utilities
├── go.mod
└── go.sum
```

## Recommended Workflow

### New Feature Development

```bash
# 1. Plan
/plan Implement REST API endpoints

# 2. TDD development
/tdd --feature="user-api"

# 3. Code review
/code-review internal/

# 4. Build check
/build-and-fix
```

### Microservice Development

```bash
# 1. Architecture design
/architect Design an order service

# 2. Interface definition
/plan Define gRPC interfaces

# 3. Implementation
/tdd --feature="order-service"
```

## Hook Configuration

### Recommended Go Hooks

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

## Best Practices

### Error Handling

```go
// ✅ Use errors.Is and errors.As
func ProcessFile(path string) error {
    data, err := os.ReadFile(path)
    if err != nil {
        if errors.Is(err, os.ErrNotExist) {
            return fmt.Errorf("config file not found: %w", err)
        }
        return fmt.Errorf("failed to read file: %w", err)
    }
    // Process data...
    return nil
}
```

### Interface Design

```go
// ✅ Small interfaces, high cohesion
type Reader interface {
    Read(p []byte) (n int, err error)
}

type Writer interface {
    Write(p []byte) (n int, err error)
}

// Compose interfaces
type ReadWriter interface {
    Reader
    Writer
}
```

### Concurrency Patterns

```go
// ✅ Use context for lifecycle control
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

### Dependency Injection

```go
// ✅ Use constructor injection
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

## Testing Framework

### Table-Driven Tests

```go
func TestAdd(t *testing.T) {
    tests := []struct {
        name     string
        a, b     int
        expected int
    }{
        {"positive numbers", 1, 2, 3},
        {"negative numbers", -1, -2, -3},
        {"zero values", 0, 0, 0},
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

## Common Commands

| Scenario | Command |
|----------|---------|
| Start a new feature | `/plan Feature description` |
| TDD development | `/tdd --feature="name"` |
| Code review | `/code-review` |
| Build check | `/build-and-fix` |
| Performance profiling | `/perf --profile` |

---

💡 **Tip**: For Go projects, we recommend golangci-lint for code linting and table-driven tests for writing tests!
