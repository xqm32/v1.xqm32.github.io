---
title: "WSL - VS Code 开发流配置"
date: 2021-11-28T19:15:16+08:00
tags: []
categories: []
draft: false
---

此前笔者已经写过一篇配置 `WSL - VS Code` 开发流配置相关的文章，然而微软给出了[更加方便地配置方法](https://docs.microsoft.com/zh-cn/windows/wsl/install)，所以这里也给出配置的优化。

# 安装 WSL

由于微软的优化，现在我们只需要在 `Powershell` 中输入：

```powershell
wsl --install
```

即可完成 Windows Subsystem for Linux 的安装，此命令会附加安装一个 `Ubuntu` 发行版，因而亦不需要在 Microsoft Store 中再次下载。

# 更换 WSL 的镜像源

国内访问 `Ubuntu` 的默认软件源速度较慢，因而我们需要更换一个镜像源以加快软件源的访问速度。这里以 [USTC](https://mirrors.ustc.edu.cn/help/ubuntu.html) 的镜像源为例，只需在 `WSL` 终端中输入：

```bash
sudo sed -i 's/archive.ubuntu.com/mirrors.ustc.edu.cn/g' /etc/apt/sources.list
```

即可完成换源。

# 更新软件包

在 `WSL` 终端中输入：

```bash
sudo apt update
sudo apt upgrade
```

即可更新。

# 其他

余下的步骤可以参考笔者[之前的文章](/posts/wsl-vscode-for-c-cpp/#在-wsl-上安装-cc-的编译器)。