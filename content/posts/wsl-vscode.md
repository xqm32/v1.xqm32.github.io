---
title: "WSL - VS Code 开发流配置"
date: 2021-11-28T19:15:16+08:00
tags: []
categories: []
draft: true
---

此前笔者已经写过一篇配置 `WSL - VS Code` 开发流配置相关的文章，然而微软给出了[更加方便地配置方法](https://docs.microsoft.com/zh-cn/windows/wsl/install)，所以这里也给出配置的优化。

# 安装 WSL

由于微软的优化，现在我们只需要在 `Powershell` 中输入：

```powershell
wsl --install
```

即可完成 Windows Subsystem for Linux 的安装，此命令会附加安装一个 `Ubuntu` 发行版，因而亦不需要在 Microsoft Store 中再次下载。


