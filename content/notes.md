---
title: "笔记"
draft: false
---

# 《编程通解》

<font color=pink>可爱的莱子酱</font>写的[《编程通解》](https://redcontritio.github.io/tags/%E7%BC%96%E7%A8%8B%E9%80%9A%E8%A7%A3-%E7%BC%96%E7%A8%8B%E6%80%9D%E6%83%B3-%E5%B0%8F%E8%AF%B4/)

# Hugo 中嵌入 HTML 的方法

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

# 无名杀

[无名杀](https://github.com/libccy/noname)的一种少错误的安装方法：

1. 下载[游戏客户端](https://github.com/libccy/noname/releases/download/SSS/Windows_Yuri_Fix.zip)；
2. 下载[最新源代码](https://github.com/libccy/noname/archive/refs/heads/master.zip)；
3. 解压游戏客户端至当前文件夹，应当会出现 `./Windows_Yuri_Fix/noname` 或 `./noname` 文件夹，后面我们以 `./noname` 文件夹为**游戏目录**；
4. 将最新源代码（即资源文件）解压，应当会出现 `./noname-master` 文件夹，将文件夹中的全部内容移动至**游戏目录**下 `./resources/app` 文件夹，即可启动游戏。
5. 下载[「在线更新」拓展](https://mp.weixin.qq.com/s/L-yCzP0JTOajMbRC3kAq_Q)并在游戏中导入，进行更新即可。
