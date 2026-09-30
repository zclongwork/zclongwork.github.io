# 每日待办官网

「每日待办」Android 应用的静态官网，部署于 GitHub Pages：<https://zclongwork.github.io/>。

## 本地预览

网站不依赖构建工具或第三方包。在仓库根目录启动任意静态文件服务器即可：

```bash
python3 -m http.server 8000
```

然后访问 <http://localhost:8000/>。

## 文件结构

- `index.html`：页面内容、产品模型与 SEO 元数据
- `styles/style.css`：响应式视觉系统与界面模型
- `scripts/index.js`：导航、Widget 演示、流程切换和渐显交互
- `images/favicon.svg`：站点图标

应用源码目前位于私有仓库；公开 APK 后，官网将链接到独立的公开发布渠道。
