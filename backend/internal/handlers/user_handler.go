package handlers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"pocket-code/backend/internal/models"
)

// UserHandler 用户处理器
type UserHandler struct {
	// 这里可以注入服务层
}

// NewUserHandler 创建用户处理器
func NewUserHandler() *UserHandler {
	return &UserHandler{}
}

// GetUsers 获取用户列表
func (h *UserHandler) GetUsers(c *gin.Context) {
	// 这里应该调用服务层获取数据
	// 目前返回模拟数据
	users := []models.UserResponse{
		{
			ID:        1,
			Name:      "张三",
			Email:     "zhangsan@example.com",
			Avatar:    "",
			Status:    1,
		},
		{
			ID:        2,
			Name:      "李四",
			Email:     "lisi@example.com",
			Avatar:    "",
			Status:    1,
		},
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "获取用户列表成功",
		"data":    users,
		"total":   len(users),
	})
}

// GetUserByID 根据ID获取用户
func (h *UserHandler) GetUserByID(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "无效的用户ID",
		})
		return
	}

	// 这里应该调用服务层获取数据
	// 目前返回模拟数据
	user := models.UserResponse{
		ID:      uint(id),
		Name:    "用户" + idStr,
		Email:   "user" + idStr + "@example.com",
		Avatar:  "",
		Status:  1,
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "获取用户信息成功",
		"data":    user,
	})
}

// CreateUser 创建用户
func (h *UserHandler) CreateUser(c *gin.Context) {
	var req models.UserCreateRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "无效的请求数据: " + err.Error(),
		})
		return
	}

	// 这里应该调用服务层创建用户
	// 目前返回模拟数据
	user := models.UserResponse{
		ID:     1,
		Name:   req.Name,
		Email:  req.Email,
		Avatar: req.Avatar,
		Status: 1,
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "用户创建成功",
		"data":    user,
	})
}

// UpdateUser 更新用户
func (h *UserHandler) UpdateUser(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "无效的用户ID",
		})
		return
	}

	var req models.UserUpdateRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "无效的请求数据: " + err.Error(),
		})
		return
	}

	// 这里应该调用服务层更新用户
	// 目前返回模拟数据
	user := models.UserResponse{
		ID:     uint(id),
		Name:   req.Name,
		Email:  req.Email,
		Avatar: req.Avatar,
		Status: 1,
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "用户更新成功",
		"data":    user,
	})
}

// DeleteUser 删除用户
func (h *UserHandler) DeleteUser(c *gin.Context) {
	idStr := c.Param("id")
	_, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "无效的用户ID",
		})
		return
	}

	// 这里应该调用服务层删除用户

	c.JSON(http.StatusOK, gin.H{
		"message": "用户删除成功",
		"id":      idStr,
	})
} 