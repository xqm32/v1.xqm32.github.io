---
title: "使用 WSL 和 VS Code 配置 C/C++ 开发环境"
date: 2021-09-13T19:03:23+08:00
tags: ["教程", "WSL", "VS Code"]
categories: ["技术分享"]
draft: false
---

本教程基于 [在 Windows 10 上安装 WSL](https://docs.microsoft.com/zh-cn/windows/wsl/install-win10) 和 [开始使用 WSL VS Code](https://docs.microsoft.com/zh-cn/windows/wsl/tutorials/wsl-vscode) 编写，笔者不保证内容的准确性。如有任何疑问，请参考微软有关 WSL 的官方文档。

## 启用 WSL（适用于 Linux 的 Windows 子系统）

以**管理员**身份打开 Powershell（可以右击 Windows 徽标键，并选择该项）并运行如下命令：

```powershell
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
```

如果想要更新到 WSL 2 请转到 [更新至 WSL 2](#更新至-wsl-2) 。若希望直接使用 **WSL 1** 请直接 **重新启动** 并转到 [安装并配置 Linux 发行版](#安装并配置-linux-发行版)。

## 更新至 WSL 2

**注意**：若要更新至 WSL 2，请确保 Windows 10 已经达到以下运行要求：

- 对于 x64 系统：**版本 1903** 或更高版本，采用 **内部版本 18362** 或更高版本。
- 对于 ARM64 系统：**版本 2004** 或更高版本，采用 **内部版本 19041** 或更高版本。
- 低于 18362 的版本不支持 WSL 2。 使用 [Windows Update 助手](https://www.microsoft.com/software-download/windows10) 更新 Windows 版本。

### 启用虚拟机功能

以**管理员**身份打开 Powershell 并运行如下命令：

```powershell
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

**重新启动** 计算机，以完成 WSL 安装并更新到 WSL 2。

### WSL 2 的后续步骤

请参考 [后续步骤](https://docs.microsoft.com/zh-cn/windows/wsl/install-win10#step-4---download-the-linux-kernel-update-package) 来完成，后转 [安装并配置 Linux 发行版](#安装并配置-linux-发行版)。

## 安装并配置 Linux 发行版

打开 **Microsoft Store**，安装一个 Linux 发行版，并打开此发行版，后按找提示进行操作即可。

## 更改 WSL 的镜像源

使用默认的源下载软件是较为缓慢的，因而我们需要更换更快速的镜像。在国内，我们常用的是 [清华大学](https://www.tsinghua.edu.cn/) 和 [中国科学技术大学](https://www.ustc.edu.cn/) 的镜像。请确认 WSL 的发行版，根据需求选择要使用的镜像：

1. [清华大学开源软件镜像站](https://mirrors.tuna.tsinghua.edu.cn/)
2. [USTC Open Source Software Mirror](https://mirrors.ustc.edu.cn/)

## 在 WSL 上安装 C/C++ 的编译器

以 Ubuntu 为例，使用如下命令安装：

```bash
sudo apt-get install gcc g++
```

**注意**：在安装之前，可能需要进行包的更新，可使用如下命令更新：

```bash
sudo apt-get update
sudo apt-get upgrade
```

对于其他 Linux 发行版，请自行在网络上搜索安装与更新的命令，这里不再赘述。

## 将 WSL 与 VS Code 一并使用

以下内容参考 [开始使用 WSL VS Code](https://docs.microsoft.com/zh-cn/windows/wsl/tutorials/wsl-vscode)，笔者不确保内容的准确性。如有疑问请参考原文。

### 安装并配置 VS Code

访问 [VS Code 安装页](https://code.visualstudio.com/download) 选择适合的安装程序。

打开 VS Code，点击拓展并搜索 「WSL」，安装 WSL 远程拓展包，即可完成操作。在中文环境下，我们还可以安装 VS Code 推荐的中文语言包，以方便阅读。

对于 C/C++，我们可以在拓展中搜索 C++，以安装其有关拓展（包含了语法高亮、调试等功能）。

更多的 WSL 与 VS Code 共同使用的小技巧的注意事项，请参考 [开始使用 WSL VS Code](https://docs.microsoft.com/zh-cn/windows/wsl/tutorials/wsl-vscode)