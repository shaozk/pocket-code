# Go 参数
GOCMD=go
GOBUILD=$(GOCMD) build
GOCLEAN=$(GOCMD) clean
GOTEST=$(GOCMD) test
GOGET=$(GOCMD) get
GOMOD=$(GOCMD) mod

# 二进制文件名
BINARY_NAME=pocket-code
BINARY_UNIX=$(BINARY_NAME)_unix

# 默认目标
all: test build

# 构建应用
build:
	$(GOBUILD) -o $(BINARY_NAME) -v

# 测试
test:
	$(GOTEST) -v ./...

# 清理
clean:
	$(GOCLEAN)
	rm -f $(BINARY_NAME)
	rm -f $(BINARY_UNIX)

# 运行
run:
	$(GOBUILD) -o $(BINARY_NAME) -v
	./$(BINARY_NAME)

# 开发模式运行
dev:
	$(GOCMD) run .

# 安装依赖
deps:
	$(GOMOD) download
	$(GOMOD) tidy

# 格式化代码
fmt:
	$(GOCMD) fmt ./...

# 代码检查
vet:
	$(GOCMD) vet ./...

# 构建Linux版本
build-linux:
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 $(GOBUILD) -o $(BINARY_UNIX) -v

# 构建Docker镜像
docker-build:
	docker build -t $(BINARY_NAME) .

# 运行Docker容器
docker-run:
	docker run -p 8080:8080 $(BINARY_NAME)

# 帮助
help:
	@echo "可用的命令:"
	@echo "  build        - 构建应用"
	@echo "  test         - 运行测试"
	@echo "  clean        - 清理构建文件"
	@echo "  run          - 构建并运行应用"
	@echo "  dev          - 开发模式运行"
	@echo "  deps         - 安装依赖"
	@echo "  fmt          - 格式化代码"
	@echo "  vet          - 代码检查"
	@echo "  build-linux  - 构建Linux版本"
	@echo "  docker-build - 构建Docker镜像"
	@echo "  docker-run   - 运行Docker容器"
	@echo "  help         - 显示帮助信息" 