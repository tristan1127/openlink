# 🚀 OpenLink (Research Fork)

> **声明**：本项目是基于 [afumu/openlink](https://github.com/afumu/openlink) 的个人研究与改进版本。
> **定位**：学习底层 Agent 工作原理的实验性项目，**非生产用途，请勿滥用。**

[](https://www.google.com/search?q=LICENSE)
[](https://golang.org)
[](https://github.com/afumu/openlink)

`OpenLink` 通过浏览器扩展模拟用户操作，赋予网页版 AI（Gemini, ChatGPT, Claude 等）**访问本地文件系统**和**执行命令**的能力。

-----

## 📖 项目背景与初衷

本项目主要用于作者研究浏览器扩展与本地服务通信、以及网页版 AI 对工具调用的响应机制。

  * **继承与改进**：本项目 Fork 自 [afumu/openlink](https://github.com/afumu/openlink)，并在其基础上针对代码结构和特定场景下的工具调用进行了探索性修改。
  * **局限性说明**：目前网页版 AI 对工具调用的支持参差不齐，稳定性和准确性受模型策略影响较大。本项目不适合作为稳定的 API 替代方案。

-----

## 🛠️ 工作原理

```mermaid
graph LR
  A[AI 网页端] -- 输出 <tool> 指令 --> B[浏览器扩展]
  B -- 拦截并转发 --> C[本地 Go 服务]
  C -- 执行指令 --> D[系统/文件]
  D -- 结果返回 --> C
  C -- 返回结果 --> B
  B -- 填入对话框 --> A
```

-----

## ⚡ 快速安装

### 1\. 安装本地服务

在终端执行以下命令：

#### 🍏 macOS / 🐧 Linux

```bash
curl -fsSL https://raw.githubusercontent.com/Tristan1127/openlink/main/install.sh | sh
```

#### 🪟 Windows (PowerShell)

```powershell
irm https://raw.githubusercontent.com/Tristan1127/openlink/main/install.ps1 | iex
```

> **运行服务**：安装后输入 `openlink` 启动。服务默认监听 `http://127.0.0.1:39527`。

-----

### 2\. 安装浏览器扩展

目前需手动加载扩展程序：

| 浏览器 | 安装步骤 |
| :--- | :--- |
| **Chrome** | 下载 `extension.zip` 并解压 -\> 访问 `chrome://extensions/` -\> 开启 **开发者模式** -\> **加载已解压的扩展程序** |
| **Firefox** | 下载源码进入 `extension` 目录 -\> 运行 `npm run build:firefox` -\> 访问 `about:debugging` -\> **临时载入附加组件** |

-----

### 3\. 连接与激活

1.  **配置**：点击浏览器工具栏 OpenLink 图标，粘贴终端生成的 **认证 URL** 并保存。
2.  **初始化**：访问支持的 AI 平台，点击页面右下角的 **🔗 初始化** 按钮。

-----

## 🤖 支持平台

| 平台 | 状态 | 备注 |
| :--- | :--- | :--- |
| **Google AI Studio** | ✅ **推荐** | **支持系统提示词**，不占对话上下文，最稳定 |
| **ChatGPT / Claude** | ✅ 支持 | 模拟用户对话注入工具说明 |
| **DeepSeek / Grok** | ✅ 支持 | 基础适配 |
| **通义千问 / 豆包** | ✅ 支持 | 国内模型适配 |

-----

## 🧰 可用工具集

### 核心能力

  * `exec_cmd`: 执行 Shell 命令（受限）
  * `read_file` / `write_file`: 文件读写（支持分页/追加）
  * `list_dir` / `glob` / `grep`: 文件检索与内容搜索
  * `edit`: 精确字符串替换
  * `web_fetch`: 获取指定网页内容

### 交互快捷方式

  * **`/` 触发**：弹出当前项目所有 **Skills** 列表。
  * **`@` 触发**：弹出工作目录的 **文件路径** 补全。

-----

## 🛡️ 安全机制

  * **沙箱路径**：操作仅限于指定的工作目录。
  * **命令拦截**：屏蔽 `rm -rf`、`sudo` 等危险指令。
  * **超时控制**：默认 60 秒执行超时。

-----

## 🙏 致谢

本项目在开发过程中参考并致敬以下优秀开源项目：

1.  **[afumu/openlink](https://github.com/afumu/openlink) (原项目作者，核心逻辑来源)**
2.  [opencode](https://github.com/anomalyco/opencode)
3.  [MCP-SuperAssistant](https://github.com/srbhptl39/MCP-SuperAssistant)
4.  [learn-claude-code](https://github.com/shareAI-lab/learn-claude-code)

-----

## 📄 免责声明

本项目仅供学习研究，严禁用于商业用途。**使用本项目产生的一切风险由使用者自行承担。**
