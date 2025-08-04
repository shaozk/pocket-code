# Pocket Code - Go 后端项目

一个基于 Go 和 Gin 框架构建的现代化后端 API 服务。

## 🚀 特性

- **高性能**: 基于 Gin 框架，提供高性能的 HTTP 服务
- **模块化设计**: 清晰的项目结构，便于维护和扩展
- **RESTful API**: 遵循 REST 设计原则
- **中间件支持**: 内置 CORS、认证等中间件
- **配置管理**: 支持环境变量配置
- **Docker 支持**: 完整的 Docker 和 Docker Compose 配置
- **日志系统**: 集成结构化日志

## 📁 项目结构

```
pocket-code/
├── backend/              # Go 后端服务
│   ├── config/           # 配置管理
│   │   └── config.go
│   ├── internal/         # 内部包
│   │   ├── handlers/     # HTTP 处理器
│   │   │   └── user_handler.go
│   │   ├── middleware/   # 中间件
│   │   │   ├── auth.go
│   │   │   └── cors.go
│   │   └── models/      # 数据模型
│   │       └── user.go
│   ├── main.go          # 主程序入口
│   ├── go.mod           # Go 模块文件
│   ├── go.sum           # 依赖校验文件
│   ├── Makefile         # 构建脚本
│   ├── Dockerfile       # Docker 镜像配置
│   ├── docker-compose.yml # Docker Compose 配置
│   └── env.example      # 环境变量示例
├── frontend/            # 前端项目 (待添加)
├── README.md           # 项目说明
└── LICENSE             # 许可证文件
```

## 🛠️ 技术栈

- **语言**: Go 1.21+
- **Web 框架**: Gin
- **配置管理**: godotenv
- **日志**: logrus
- **数据库**: PostgreSQL (可选)
- **缓存**: Redis (可选)
- **容器化**: Docker & Docker Compose

## 📦 安装和运行

### 前置要求

- Go 1.21 或更高版本
- Git

### 本地开发

1. **克隆项目**
   ```bash
   git clone <repository-url>
   cd pocket-code
   ```

2. **安装依赖**
   ```bash
   cd backend
   make deps
   # 或者
   go mod download
   go mod tidy
   ```

3. **配置环境变量**
   ```bash
   cd backend
   cp env.example .env
   # 编辑 .env 文件，根据需要修改配置
   ```

4. **运行项目**
   ```bash
   cd backend
   # 开发模式
   make dev
   
   # 或者直接运行
   go run .
   ```

### 使用 Docker

1. **构建并运行所有服务**
   ```bash
   cd backend
   docker-compose up --build
   ```

2. **仅运行应用**
   ```bash
   cd backend
   make docker-build
   make docker-run
   ```

## 🔧 构建和部署

### 本地构建

```bash
cd backend
# 构建应用
make build

# 运行测试
make test

# 格式化代码
make fmt

# 代码检查
make vet
```

### 生产部署

```bash
cd backend
# 构建 Linux 版本
make build-linux

# 构建 Docker 镜像
make docker-build
```

## 📡 API 接口

### 基础接口

- `GET /` - 欢迎页面
- `GET /health` - 健康检查

### 用户管理 API

- `GET /api/v1/users` - 获取用户列表
- `GET /api/v1/users/:id` - 获取指定用户
- `POST /api/v1/users` - 创建用户
- `PUT /api/v1/users/:id` - 更新用户
- `DELETE /api/v1/users/:id` - 删除用户

### 示例请求

**创建用户**
```bash
curl -X POST http://localhost:8080/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "张三",
    "email": "zhangsan@example.com",
    "password": "123456"
  }'
```

**获取用户列表**
```bash
curl http://localhost:8080/api/v1/users
```

## ⚙️ 配置说明

### 环境变量

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `PORT` | `8080` | 服务端口 |
| `GIN_MODE` | `debug` | Gin 运行模式 |
| `DB_HOST` | `localhost` | 数据库主机 |
| `DB_PORT` | `5432` | 数据库端口 |
| `DB_NAME` | `pocket_code` | 数据库名称 |
| `JWT_SECRET` | `your-secret-key` | JWT 密钥 |
| `REDIS_HOST` | `localhost` | Redis 主机 |
| `LOG_LEVEL` | `info` | 日志级别 |

## 🧪 测试

```bash
cd backend
# 运行所有测试
make test

# 运行特定测试
go test ./internal/handlers
```

## 📝 开发指南

### 添加新的处理器

1. 在 `backend/internal/handlers/` 目录下创建新的处理器文件
2. 实现相应的处理函数
3. 在 `backend/main.go` 中注册路由

### 添加新的中间件

1. 在 `backend/internal/middleware/` 目录下创建新的中间件文件
2. 实现中间件函数
3. 在 `backend/main.go` 中注册中间件

### 添加新的模型

1. 在 `backend/internal/models/` 目录下创建新的模型文件
2. 定义数据结构和验证规则
3. 在处理器中使用新模型

## 🐛 故障排除

### 常见问题

1. **端口被占用**
   ```bash
   # 查找占用端口的进程
   lsof -i :8080
   # 杀死进程
   kill -9 <PID>
   ```

2. **依赖下载失败**
   ```bash
   # 清理模块缓存
   go clean -modcache
   # 重新下载依赖
   go mod download
   ```

3. **Docker 构建失败**
   ```bash
   # 清理 Docker 缓存
   docker system prune -a
   # 重新构建
   docker-compose build --no-cache
   ```

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 Issue
- 发送邮件
- 创建 Pull Request

---

**注意**: 这是一个示例项目，生产环境使用前请确保：
- 修改默认的 JWT 密钥
- 配置适当的数据库连接
- 设置正确的日志级别
- 启用 HTTPS
- 配置适当的 CORS 策略
