---
title: "macOS 配置"
date: 2023-07-16T17:58:40+08:00
tags: ["macOS"]
categories: ["技术分享"]
draft: false
---

# macOS 配置

## 安装方式优先级

图形界面软件：App Store > 官网 > 其他方式

命令行软件：官网推荐的安装方式 > Homebrew > 其他方式（如果需要额外配置环境变量，应当优先考虑 Homebrew）

## 图形界面软件列表

### 通过 App Store 安装

- [QQ](https://apps.apple.com/cn/app/qq/id451108668?mt=12)
- [微信](https://apps.apple.com/cn/app/%E5%BE%AE%E4%BF%A1/id836500024?mt=12)
- [WPS Office](https://apps.apple.com/cn/app/wps-office/id1443749478?mt=12)
- [MarginNote 3](https://apps.apple.com/cn/app/marginnote-3/id1423522373?mt=12)

### 通过官网安装

- [Typora](https://typora.io)
- [Visual Studio Code](https://code.visualstudio.com)
- [START](https://start.qq.com)
- [IINA](https://iina.io)
- [Logi Options+](https://www.logitech.com/zh-cn/software/logi-options-plus.html)

### 通过 GitHub 安装

- [ClashX Pro](https://install.appcenter.ms/users/clashx/apps/clashx-pro/distribution_groups/public)（优先）

## 命令行界面软件列表

### 通过 Homebrew 安装

- [Git](https://git-scm.com/download/mac)

- [Pyenv](https://github.com/pyenv/pyenv)

- [n](https://github.com/tj/n)（使用 n 主要是因为 nvm 不再支持 Homebrew 安装，[不过似乎 nvm 更稳定一些](https://www.sobyte.net/post/2022-04/node-mvn-n/)）

  [各种 node 的安装方法](https://nodejs.org/en/download/package-manager#nvs)

- [Hugo](https://gohugo.io/installation/macos/#package-managers)

- [Neofetch](https://github.com/dylanaraps/neofetch)

- [Go](https://go.dev)

- [Zig](https://github.com/ziglang/zig/wiki/Install-Zig-from-a-Package-Manager)

### 通过官网安装

- [Homebrew](https://brew.sh)（优先）
- [Rust](https://www.rust-lang.org)
- [sdkman](https://sdkman.io)

### 通过其他方式安装

## 其他软件列表

### 命令行软件列表

出于稳定性考虑，暂时不考虑使用以下两个软件版本管理器

- [rtx](https://github.com/jdxcode/rtx)
- [asdf](https://github.com/asdf-vm/asdf)
