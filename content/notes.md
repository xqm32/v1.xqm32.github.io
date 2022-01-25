---
title: "笔记"
draft: false
---

此处存放着笔者想要留存，但内容较少，不适合新建一篇博客的内容。

# 配置

## `npm` 镜像设置

[腾讯解君愁](https://mirrors.tencent.com/help/npm.html)。

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

## 我的 Git 配置

```bash
git config --global user.name "xqm32"
git config --global user.email "458173774@qq.com"
git config --global http.https://github.com.proxy http://127.0.0.1:10809
```

# WSL

## WSL 2 配置代理

若使用 `bash`，则在 `.bashrc` 中添加：

```bash
export windowsHostIP=`cat /etc/resolv.conf|grep nameserver|awk '{print $2}'`

proxy() {
    export ALL_PROXY="http://$windowsHostIP:端口"
    export all_proxy="http://$windowsHostIP:端口"
    export http_proxy="http://$windowsHostIP:10809"
    export https_proxy="http://$windowsHostIP:10809"
}

unproxy() {
    unset ALL_PROXY
    unset all_prox
    unset http_proxy
    unset https_proxyy
}
```

虽然看起来没有必要，但是只有设置了 `http_proxy` 和 `https_proxy` 才能对 `wget` 生效，笔者感觉十分奇怪。

参考 [WSL2 网络代理设置](https://syz913.github.io/2021/03/20/wsl2/) 和 [Ubuntu「一键」设置代理](https://blog.skk.moe/post/enable-proxy-on-ubuntu/)。

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

由于 [Typora](https://typora.io) 收费且收费较贵，不得不寻找其替代品，目前感觉 [MarkText](https://marktext.app/) 比较不错。

## Windows 工具

由于我的键盘的 `ctrl` 键坏了，需要将 `CapsLock` 键映射到 `ctrl` 上，于是发现了这个好用的小工具：[Microsoft PowerToys](https://github.com/microsoft/PowerToys)。

它还有一些其他好用的功能，比如双击 `ctrl` 键可以快速的找到你的鼠标在哪儿。

## 流程图、UML 画图工具

[Draw.io](https://draw.io)。

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

# 其他

## 《编程通解》

可爱的<font color=pink>莱子酱</font>写的[《编程通解》](https://redcontritio.github.io/tags/%E7%BC%96%E7%A8%8B%E9%80%9A%E8%A7%A3-%E7%BC%96%E7%A8%8B%E6%80%9D%E6%83%B3-%E5%B0%8F%E8%AF%B4/)。（咕咕咕）

## 备份

前往[备份](/backup)页面以查看。

<!--
# 记录
2022.1.5 今天水了一个 commit，开心。
2022.1.6 今天又水了一个 commit，但是作业很多，不开心。
2022.1.7 今天只能水 commit, Sad.
2022.1.8 今天作业太多，只能水 commit.
2022.1.11 Water.
2022.1.12 Water + 寄。
2022.1.13 Water + 寄 + 感恩 String 老师。
2022.1.14 今天没有水，但是 GitHub 上没有 commit 记录，很奇怪。
2022.1.15 还是很奇怪，CellDetection 这个 repo 没有记录。
2022.1.16 复习！复习！复习！
2022.1.17 复习！复习！复习！
2022.1.18 考完大物啦~
2022.1.19 复习概率。
2022.1.21 到家了。
2022.1.22 Water.
2022.1.24 Water.
-->
