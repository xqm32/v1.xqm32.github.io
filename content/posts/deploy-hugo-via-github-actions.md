---
title: "使用 Github Actions 自动化部署 Hugo 博客"
date: 2021-09-04T15:47:24+08:00
tags: ["教程", "Hugo", "Github Actions"]
categories: ["技术分享"]
draft: false
---

## 使用 Github Actions 自动化部署 Hugo 博客

笔者一直想有个属于自己的博客，通过在网上不断搜索，笔者发现使用 Hugo 部署至 Github Pages 上是一个不错的选择。但是，这样的部署也有一个缺陷：需要手动生成部署文件，再上传至 Github，这是十分麻烦的。因此笔者又在网上搜索文档、文章，后来了解到，可以使用 Github Actions 进行自动化部署，我们只需要将网站源码推送至 Github 便可以自动化地生成博客网站。不过，虽然在操作上是方便了许多，但如何配置这样的自动化部署似乎依旧是一个复杂的问题。于是笔者继续在网上搜索文档和文章，但大部分都没有给出较为「官方」的解决方案，也很少有参考资料可供加深了解，故而笔者转向寻求 [Hugo 文档](https://gohugo.io/documentation/) 的帮助，最终做到了使用 Github Actions 自动化部署 Hugo 博客。

### 准备工作

首先，我们需要创建可以用于部署 Hugo 博客的 Github 仓库，具体的操作可以参考 [GitHub Pages 文档](https://docs.github.com/en/pages) 。

其次，我们需要在电脑上安装 Git 和 Hugo（**注意：在 Linux，特别是 Ubuntu 上，请不要使用默认的包管理器安装 Hugo，此法安装的 Hugo 版本有时过低，会造成大量错误**），请参考 [此文档](https://gohugo.io/getting-started/installing/) 进行安装。

之后，我们将使用 Hugo 在本地创建网站，名称建议使用 `username.github.io`（其中 `username` 是你的 Github ID），具体的方法请参照 [此文档](https://gohugo.io/getting-started/quick-start/)。

### Github Actions

在完成**准备工作**后，我们需要在本地创建网站的文件夹中建立 `.github/workflows/gh-pages.yml` 文件，在其中填入（此代码参考 Hugo 文档中 [Host on GitHub](https://gohugo.io/hosting-and-deployment/hosting-on-github/#build-hugo-with-github-action) 一项）：

```yaml
name: github pages

on:
  push:
    branches:
      - main  # Set a branch to deploy
  pull_request:

jobs:
  deploy:
    runs-on: ubuntu-20.04
    steps:
      - uses: actions/checkout@v2
        with:
          submodules: true  # Fetch Hugo themes (true OR recursive)
          fetch-depth: 0    # Fetch all history for .GitInfo and .Lastmod

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: 'latest'
          # extended: true

      - name: Build
        run: hugo --minify

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        if: github.ref == 'refs/heads/main'
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

之后推送至 Github，并将仓库中 `Settings - Pages - Source - Branch` 的设置从 `main` 修改至 `gh-pages` 并点击 `Save` 按钮，即可完成 Github Actions 部署工作。