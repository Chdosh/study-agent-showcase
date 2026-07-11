# Web Showcase Project Rules

## 项目目标

本项目是现有 Electron 学习 Agent 的独立 Web 展示版。

原项目路径：

D:\work\study_plugin

新项目路径：

D:\work\study-agent-showcase

在线版用于项目介绍、模拟 Demo、技术架构和桌面版展示，不是真实 SaaS。

## 强制约束

- 原项目只读，不得修改任何文件
- 所有新代码只能写入新项目目录
- 不复制 .env、API Key、SQLite 数据库、日志和真实用户数据
- 不接入真实大模型
- 不建立后端、登录、云数据库和多人系统
- 不引入 Electron、IPC、Node 文件系统代码
- 在线 Demo 使用 Mock 数据和 localStorage
- 使用 Vite、React、TypeScript、React Router、原生 CSS
- 不引入 Tailwind、大型 UI 库、状态管理框架和动画框架
- 每轮只完成当前明确任务，不提前扩展范围
- 修改后必须执行 npm run lint 和 npm run build
- 不自动上传 GitHub，不操作 Cloudflare 和域名
- 不修改全局 Git 配置

## 开发原则

- 优先简单直接的实现
- 不建立无必要的抽象层
- 不进行范围外重构
- 不为了美化破坏已经可用的页面
- 单个任务完成后更新 docs/HANDOFF.md
- 每个阶段通过后单独 Git 提交
