---
title: "笔记"
draft: false
slug: "notes"
---

此处存放着笔者想要留存，但内容较少，不适合新建一篇博客的内容。

# 配置

## `npm` 镜像设置

[腾讯解君愁](https://mirrors.tencent.com/help/npm.html)。

## `yarn` 安装

[yarn 安装 corepack](https://yarnpkg.com/getting-started/install#install-corepack)

[启动 corepack](https://nodejs.org/api/corepack.html#enabling-the-feature)

[设置 execution policy](https://docs.microsoft.com/zh-cn/powershell/module/microsoft.powershell.security/set-executionpolicy?view=powershell-7.2#example-1-set-an-execution-policy)

## Hugo 设置自定义域名

参见 [Use a Custom Domain](https://gohugo.io/hosting-and-deployment/hosting-on-github/#use-a-custom-domain)。

## Hugo 中嵌入 HTML 的方法

于 `config.yml` 中加入以下配置：

```yml
markup:
  goldmark:
    renderer:
      unsafe: true
```

参考 `Hugo` 文档 [Goldmark](https://gohugo.io/getting-started/configuration-markup#goldmark) 一栏。

> **unsafe**
>
> By default, Goldmark does not render raw HTMLs and potentially dangerous links. If you have lots of inline HTML and/or JavaScript, you may need to turn this on.

## Hugo PaperMod 主题安装、更新方法

参考其教程即可 [Hugo PaperMod](https://github.com/adityatelange/hugo-PaperMod/wiki/Installation)。

## Hugo PaperMod 本地查看静态页面异常

打开 `public/index.html`，查看控制台报错。

> Access to CSS stylesheet at 'file:///PATH/TO/FILE.css' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: http, data, chrome-extension, edge, https, chrome-untrusted.

跨源请求不支持 `file` 协议，所以将：

```html
<link
  crossorigin="anonymous"
  href="/assets/css/FILE.css"
  rel="preload stylesheet"
  as="style"
/>
```

修改为：

```html
<link
  crossorigin="anonymous"
  href="http://DOMAIN.YOUR.SITE/assets/css/FILE.css"
  rel="preload stylesheet"
  as="style"
/>
```

即可。

## Git 配置代理

参见[一文让你了解如何为 Git 设置代理](https://ericclose.github.io/git-proxy-config.html)。

[Set Up Git](https://docs.github.com/en/get-started/quickstart/set-up-git).

## Git 配置凭证管理

在 Windows 上似乎是由自动的 Git 凭证管理器完成，在 Linux/macOS 可以参考 [Git Tools Credential Storage](https://git-scm.com/book/en/v2/Git-Tools-Credential-Storage)

## 我的 Git 配置

```bash
git config --global user.name "xqm32"
git config --global user.email "458173774@qq.com"
git config --global http.https://github.com.proxy http://127.0.0.1:7890
```

## Git-MediaWiki

参见[Installing and configuring Git-Mediawiki](http://members.wolfram.com/meng/pages/computing/installing_and_configuring/installing_and_configuring_git-mediawiki/)。

## Git 修改时间

Powershell 下：

```
$TIME="YYYY-mm-ddTHH:MM:SS"
$env:GIT_COMMITTER_DATE=$TIME
git commit --amend --no-edit --date=$TIME
```

参见[如何通过 Git 钩子实现 commit 自动修改提交的时间？](https://www.zhihu.com/question/517856692/answer/2362990102)

## WinGet

可以使用 WinGet 进行软件包的安装，如：

```bash
winget install --id Git.Git -e --source winget
```

参见[Git Downloads](https://git-scm.com/download/win).

## NVM 配置问题

参见[Permissions (Exit 1, Exit 5, Access Denied, Exit 145)](https://github.com/coreybutler/nvm-windows/wiki/Common-Issues#permissions-exit-1-exit-5-access-denied-exit-145)。

# WSL

## WSL 自启动

仅在 Windows 11 下有效。

参见 [WSL 自启动](https://docs.microsoft.com/zh-cn/windows/wsl/wsl-config#boot-settings)。

## 更换 USTC 镜像

```bash
sudo sed -i 's/archive.ubuntu.com/mirrors.ustc.edu.cn/g' /etc/apt/sources.list
```

## WSL 2 配置代理

若使用 `bash`，则在 `.bashrc` 中添加：

```bash
export windowsHostIP=`cat /etc/resolv.conf|grep nameserver|awk '{print $2}'`
export windowsHostPort="7890"

proxy() {
    export ALL_PROXY="http://$windowsHostIP:$windowsHostPort"
    export all_proxy="http://$windowsHostIP:$windowsHostPort"
    export http_proxy="http://$windowsHostIP:$windowsHostPort"
    export https_proxy="http://$windowsHostIP:$windowsHostPort"
}

unproxy() {
    unset ALL_PROXY
    unset all_prox
    unset http_proxy
    unset https_proxyy
}
```

虽然看起来没有必要，但是只有设置了 `http_proxy` 和 `https_proxy` 才能对 `wget` 生效，笔者感觉十分奇怪。

参考 [WSL2 网络代理设置](https://syz913.github.io/2021/03/20/wsl2/) 和 [Ubuntu「一键」设置代理](https://blog.skk.moe/post/enable-proxy-on-ubuntu/).

## WSL 与加速器产生冲突

**注意**：此方法可能有副作用。

WSL 与加速器的冲突可以参考此文章解决 [关于使用 WSL2 出现“参考的对象类型不支持尝试的操作”的解决方法。](https://zhuanlan.zhihu.com/p/151392411)

## WSL 中 C/C++ 调试报错的解决方案

```bash
mkdir -p /build/报错路径（如 glibc-XXXXXX）
wget http://ftp.gnu.org/gnu/glibc/需要的 glibc 如（glibc-X.XX.tar.gz）
sudo tar xf glibc-X.XX.tar.gz --directory=/build/glibc-XXXXXX/
```

# 软件

## Markdown 编辑器

<del>由于 [Typora](https://typora.io) 收费且收费较贵，不得不寻找其替代品，目前感觉 [MarkText](https://marktext.app/) 比较不错。</del>

[Typora](https://typora.io) 真香 🤣。

## Windows 工具

由于我的键盘的 `ctrl` 键坏了，需要将 `CapsLock` 键映射到 `ctrl` 上，于是发现了这个好用的小工具：[Microsoft PowerToys](https://github.com/microsoft/PowerToys)。

它还有一些其他好用的功能，比如双击 `ctrl` 键可以快速的找到你的鼠标在哪儿。

## 流程图、UML 画图工具

[Draw.io](https://draw.io)。

## Windows 拼音输入法错误修复

参考 [微软拼音输入法](https://answers.microsoft.com/zh-hans/windows/forum/all/微软拼音输/a462b2f3-9db2-4313-9369-f1ff8ec07975)，关闭输入法的 `智能模糊拼音` 和 `模糊拼音` 可以暂时修复。

## iOS15 拼音输入法错误修复

<del>关闭 `滑行输入` **似乎**可以暂时修复。</del>

参考 [这个帖子](https://www.v2ex.com/t/820760)，**似乎**可以暂时修复。

## Aria2c 仅下载种子，不下载文件

运行时加入 `--follow-torrent=false`，参见 [--follow-torrent](https://aria2.github.io/manual/en/html/aria2c.html#cmdoption-follow-torrent) 参数。

# 开发

## GitHub 贡献

添加功能或者修复错误时，应创建新的分支而非从 main/master 直接推送。

> **Contributing to GitHub**
>
> Contributing to Cataclysm: Dark Days Ahead is easy — simply fork the repository here on GitHub, make your changes, and then send us a pull request.
>
> There are a couple of guidelines we suggest sticking to:
>
> Add this repository as an upstream remote.
>
> Keep your master branch clean. This means you can easily pull changes made to this repository into yours.
>
> Create a new branch for each new feature or set of related bug fixes.
>
> **Never merge from your local branches into your master branch. Only update that by pulling from upstream/master.**

## WSL 安装 Rust

Rust 官方给出了安装工具 [安装 Rust](https://www.rust-lang.org/zh-CN/tools/install)。

## Windows 下测量命令执行时间

使用 `Measure-Command`，参见 [How do I measure execution time of a command on the Windows command line?](https://stackoverflow.com/questions/673523/how-do-i-measure-execution-time-of-a-command-on-the-windows-command-line)。

# 游戏

## 无名杀

[无名杀](https://github.com/libccy/noname)的一种少错误的安装方法：

1. 下载https://github.com/libccy/noname/releases/download/SSS/Windows_Yuri_Fix.zip；
2. 下载[最新源代码](https://github.com/libccy/noname/archive/refs/heads/master.zip)；
3. 解压游戏客户端至当前文件夹，应当会出现 `./Windows_Yuri_Fix/noname` 或 `./noname` 文件夹，后面我们以 `./noname` 文件夹为**游戏目录**；
4. 将最新源代码（即资源文件）解压，应当会出现 `./noname-master` 文件夹，将文件夹中的全部内容移动至**游戏目录**下 `./resources/app` 文件夹，即可启动游戏。
5. 下载[「在线更新」拓展](https://mp.weixin.qq.com/s/L-yCzP0JTOajMbRC3kAq_Q)并在游戏中导入，进行更新即可。

<!-- ## 教育网 IPv6 加速 Steam 下载的方法

将下载地区设置为 US - Los Angeles。 -->

# 站点

## 豆瓣强制跳转解决方案

在 [uBlock Origin](https://github.com/gorhill/uBlock) 中加入静态规则如下：

```
https://www.douban.com/j/check_clean_content
```

即可解决。此链接可由调试时发现。
